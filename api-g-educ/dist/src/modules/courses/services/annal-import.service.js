"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnalImportService = void 0;
const common_1 = require("@nestjs/common");
const pdf_mjs_1 = require("pdfjs-dist/legacy/build/pdf.mjs");
const file_type_1 = require("file-type");
const client_1 = require("../../../generated/prisma/client");
const prisma_service_1 = require("../../../prisma/prisma.service");
const lessons_service_1 = require("./lessons.service");
const assessments_service_1 = require("../../assessments/services/assessments.service");
const annal_parser_1 = require("./annal-parser");
const MAX_PDF_SIZE = 20 * 1024 * 1024;
const MAX_PDF_PAGES = 300;
const PDF_EXTRACTION_TIMEOUT_MS = 60_000;
function normalizeText(value) {
    return value.replace(/\u0000/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}
let AnnalImportService = class AnnalImportService {
    prisma;
    lessonsService;
    assessmentsService;
    constructor(prisma, lessonsService, assessmentsService) {
        this.prisma = prisma;
        this.lessonsService = lessonsService;
        this.assessmentsService = assessmentsService;
    }
    async extractPages(buffer) {
        const loadingTask = (0, pdf_mjs_1.getDocument)({ data: new Uint8Array(buffer), useSystemFonts: true });
        let timeoutId;
        let timedOut = false;
        try {
            const extraction = (async () => {
                const document = await loadingTask.promise;
                if (document.numPages > MAX_PDF_PAGES) {
                    throw new common_1.BadRequestException(`Le PDF dépasse la limite de ${MAX_PDF_PAGES} pages pour cet import.`);
                }
                const pages = [];
                for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
                    const page = await document.getPage(pageNumber);
                    const content = await page.getTextContent();
                    let previousY;
                    const text = content.items
                        .filter((item) => 'str' in item)
                        .map((item) => {
                        if (!('str' in item))
                            return '';
                        const y = item.transform[5];
                        const separator = previousY === undefined ? '' : Math.abs(y - previousY) > 2 ? '\n' : ' ';
                        previousY = y;
                        return `${separator}${item.str}`;
                    })
                        .join('');
                    pages.push({ page: pageNumber, text: normalizeText(text) });
                }
                return pages;
            })();
            const timeout = new Promise((_resolve, reject) => {
                timeoutId = setTimeout(() => {
                    timedOut = true;
                    void loadingTask.destroy().catch(() => undefined);
                    reject(new common_1.BadRequestException('L’analyse du PDF dépasse 60 secondes. Essayez un fichier plus court ou moins complexe.'));
                }, PDF_EXTRACTION_TIMEOUT_MS);
            });
            return await Promise.race([extraction, timeout]);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException)
                throw error;
            throw new common_1.BadRequestException('Le PDF est illisible ou endommagé.');
        }
        finally {
            if (timeoutId)
                clearTimeout(timeoutId);
            if (!timedOut)
                await loadingTask.destroy().catch(() => undefined);
        }
    }
    async importPdf(user, chapterId, file) {
        if (!file?.buffer?.length)
            throw new common_1.BadRequestException('Sélectionnez un fichier PDF.');
        if (file.size > MAX_PDF_SIZE)
            throw new common_1.BadRequestException('Le PDF ne doit pas dépasser 20 Mo.');
        const fileType = await (0, file_type_1.fileTypeFromBuffer)(file.buffer);
        if (fileType?.mime !== 'application/pdf') {
            throw new common_1.BadRequestException('Le fichier sélectionné n’est pas un PDF valide.');
        }
        const chapter = await this.prisma.chapter.findUnique({
            where: { id: chapterId },
            include: { classSubject: { include: { subject: true, class: true } }, lessons: { select: { position: true } }, assessments: { select: { position: true, kind: true } } },
        });
        if (!chapter || chapter.status === 'ARCHIVE')
            throw new common_1.BadRequestException('Chapitre introuvable ou archivé.');
        const pages = await this.extractPages(file.buffer);
        const text = pages.map((page) => `\n[Page ${page.page}]\n${page.text}`).join('\n').trim();
        const hasReadableText = text.replace(/\[Page \d+\]/g, '').trim().length >= 30;
        const filename = file.originalname.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim();
        const parsed = hasReadableText ? (0, annal_parser_1.parseAnnalText)(text) : { lessons: [], exercises: [], questions: [] };
        const exercises = parsed.exercises;
        const questions = parsed.questions;
        const lessonTitle = filename.slice(0, 250) || `Annale ${chapter.classSubject.subject.name}`;
        const existingEmptyDraft = await this.prisma.lesson.findFirst({
            where: {
                chapterId,
                title: lessonTitle,
                type: client_1.LessonType.PDF,
                status: 'BROUILLON',
                createdById: user.id,
                assets: { none: {} },
            },
            select: { id: true, title: true },
        });
        const lesson = existingEmptyDraft ?? await this.lessonsService.create(user, chapterId, {
            title: lessonTitle,
            type: client_1.LessonType.PDF,
            position: chapter.lessons.reduce((max, item) => Math.max(max, item.position), -1) + 1,
        });
        const createdAssessmentIds = [];
        const createdLessonIds = existingEmptyDraft ? [] : [lesson.id];
        try {
            await this.lessonsService.uploadPdfAsset(user, lesson.id, file);
            const extractedLessons = [];
            for (const [index, section] of parsed.lessons.entries()) {
                const extractedLesson = await this.lessonsService.create(user, chapterId, {
                    title: section.title.slice(0, 250),
                    type: client_1.LessonType.TEXTE,
                    contentMarkdown: section.text,
                    position: chapter.lessons.reduce((max, item) => Math.max(max, item.position), -1) + index + 2,
                });
                createdLessonIds.push(extractedLesson.id);
                extractedLessons.push({ id: extractedLesson.id, title: extractedLesson.title });
            }
            const createdAssessments = [];
            for (const [index, exercise] of exercises.entries()) {
                const assessment = await this.assessmentsService.create(user, chapterId, {
                    title: exercise.title.slice(0, 250),
                    instructions: `${exercise.text}\n\nSource : annale « ${filename} » — vérifiez le contenu et complétez les questions dans le back-office.`,
                    position: chapter.assessments.filter((item) => item.kind === 'EXERCICE').length + index,
                }, 'EXERCICE');
                createdAssessmentIds.push(assessment.id);
                createdAssessments.push({ id: assessment.id, title: assessment.title, kind: assessment.kind });
            }
            const quizTitle = `Quiz — ${filename}`.slice(0, 250);
            const quiz = await this.assessmentsService.create(user, chapterId, {
                title: quizTitle,
                instructions: questions.length
                    ? `L’import a repéré ${questions.length} question(s) à choix dans le PDF. Vérifiez les questions et sélectionnez la bonne réponse pour chacune avant d’enregistrer.`
                    : `Brouillon à compléter à partir de l’annale « ${filename} ». Aucun QCM explicite n’a pu être détecté automatiquement.`,
                position: chapter.assessments.filter((item) => item.kind === 'QUIZ').length,
            }, 'QUIZ');
            createdAssessmentIds.push(quiz.id);
            if (questions.length) {
                await this.prisma.$transaction(questions.map((question, index) => this.prisma.question.create({
                    data: {
                        assessmentId: quiz.id,
                        type: 'QCM_UNIQUE',
                        statement: question.statement,
                        position: index,
                        options: { create: question.options.map((label, optionIndex) => ({ label, isCorrect: false, position: optionIndex })) },
                    },
                })));
            }
            return {
                lesson,
                extractedLessons,
                assessments: [...createdAssessments, quiz],
                pages: pages.length,
                extractedCharacters: text.length,
                detectedExercises: exercises.length,
                detectedLessons: parsed.lessons.length,
                detectedChoiceQuestions: questions.length,
                warning: hasReadableText
                    ? 'Les réponses justes ne sont jamais devinées. Vérifiez les brouillons et complétez-les avant publication.'
                    : 'Le PDF est conservé comme leçon, mais il ne contient pas de texte sélectionnable. Sans OCR, les pages scannées et leurs images doivent être lues manuellement pour compléter les brouillons.',
            };
        }
        catch (error) {
            if (createdAssessmentIds.length) {
                await this.prisma.assessment.deleteMany({ where: { id: { in: createdAssessmentIds } } }).catch(() => undefined);
            }
            for (const lessonId of createdLessonIds) {
                const details = await this.lessonsService.findOne(user, lessonId).catch(() => null);
                for (const asset of details?.assets ?? []) {
                    await this.lessonsService.deleteAsset(user, lessonId, asset.id).catch(() => undefined);
                }
                await this.prisma.lesson.delete({ where: { id: lessonId } }).catch(() => undefined);
            }
            throw error;
        }
    }
};
exports.AnnalImportService = AnnalImportService;
exports.AnnalImportService = AnnalImportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        lessons_service_1.LessonsService,
        assessments_service_1.AssessmentsService])
], AnnalImportService);
//# sourceMappingURL=annal-import.service.js.map