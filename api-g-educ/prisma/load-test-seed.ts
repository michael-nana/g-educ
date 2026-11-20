import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  AssessmentKind,
  ContentStatus,
  ExerciseFormat,
  LessonType,
  PrismaClient,
  Role,
  UserStatus,
} from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is required');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
const chaptersPerSubject = Math.max(1, Math.min(50, Number(process.env.LOAD_TEST_CHAPTERS ?? 8)));
const lessonsPerChapter = Math.max(1, Math.min(100, Number(process.env.LOAD_TEST_LESSONS_PER_CHAPTER ?? 20)));
const testPhone = process.env.LOAD_TEST_PHONE ?? '+22670000001';
const testPassword = process.env.LOAD_TEST_PASSWORD ?? 'LoadTest-Local-2026!';
const testDisplayName = process.env.LOAD_TEST_DISPLAY_NAME ?? 'Eleve Charge Local';
const fixturePrefix = 'LT-';

async function main() {
  const [admin, schoolClass, academicYear, subjects] = await Promise.all([
    prisma.user.findUnique({ where: { phone: process.env.ADMIN_PHONE ?? '+22670000000' } }),
    prisma.class.findUnique({ where: { code: '2C' } }),
    prisma.academicYear.findUnique({ where: { label: '2026-2027' } }),
    prisma.subject.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } }),
  ]);
  if (!admin || !schoolClass || !academicYear || !subjects.length) {
    throw new Error('Exécute le seed de base avant le seed de charge.');
  }

  const passwordHash = await bcrypt.hash(testPassword, 12);
  const student = await prisma.user.upsert({
    where: { phone: testPhone },
    update: { passwordHash, role: Role.ELEVE, status: UserStatus.ACTIF, phoneVerifiedAt: new Date(), anonymizedAt: null },
    create: { phone: testPhone, passwordHash, role: Role.ELEVE, status: UserStatus.ACTIF, phoneVerifiedAt: new Date() },
  });
  const profile = await prisma.studentProfile.upsert({
    where: { userId: student.id },
    update: { displayName: testDisplayName, schoolName: 'Établissement de test', classId: schoolClass.id, academicYearId: academicYear.id },
    create: { userId: student.id, displayName: testDisplayName, schoolName: 'Établissement de test', classId: schoolClass.id, academicYearId: academicYear.id },
  });
  await prisma.classEnrollment.upsert({
    where: { studentProfileId_academicYearId: { studentProfileId: profile.id, academicYearId: academicYear.id } },
    update: { classId: schoolClass.id },
    create: { studentProfileId: profile.id, academicYearId: academicYear.id, classId: schoolClass.id },
  });
  await prisma.userStreak.upsert({ where: { userId: student.id }, update: {}, create: { userId: student.id } });

  let createdChapters = 0;
  let createdLessons = 0;
  let createdAssessments = 0;
  for (const [subjectIndex, subject] of subjects.entries()) {
    const classSubject = await prisma.classSubject.upsert({
      where: { classId_subjectId: { classId: schoolClass.id, subjectId: subject.id } },
      update: {},
      create: { classId: schoolClass.id, subjectId: subject.id, coefficient: 1, position: subjectIndex + 1 },
    });
    const firstChapterTitle = `${fixturePrefix}${subject.slug}-CH-001`;
    if (await prisma.chapter.findFirst({ where: { classSubjectId: classSubject.id, title: firstChapterTitle }, select: { id: true } })) continue;

    const chapterIds: string[] = [];
    const now = new Date();
    for (let chapterIndex = 1; chapterIndex <= chaptersPerSubject; chapterIndex += 1) {
      const chapter = await prisma.chapter.create({
        data: {
          classSubjectId: classSubject.id,
          classId: schoolClass.id,
          title: `${fixturePrefix}${subject.slug}-CH-${String(chapterIndex).padStart(3, '0')}`,
          description: 'Chapitre de données synthétiques réservé au test local de charge.',
          position: chapterIndex,
          status: ContentStatus.PUBLIE,
          createdById: admin.id,
          publishedAt: now,
        },
      });
      chapterIds.push(chapter.id);
      createdChapters += 1;
    }

    const lessonRows = chapterIds.flatMap((chapterId, chapterIndex) =>
      Array.from({ length: lessonsPerChapter }, (_, lessonIndex) => ({
        chapterId,
        classId: schoolClass.id,
        title: `${fixturePrefix}${subject.slug} leçon ${chapterIndex + 1}.${lessonIndex + 1}`,
        type: LessonType.TEXTE,
        contentMarkdown: `# Leçon de test\n\nDonnées synthétiques utilisées pour mesurer les lectures concurrentes de l’API.\n\n${'Contenu de cours de test. '.repeat(20)}`,
        position: lessonIndex + 1,
        status: ContentStatus.PUBLIE,
        createdById: admin.id,
        publishedById: admin.id,
        publishedAt: now,
      })),
    );
    await prisma.lesson.createMany({ data: lessonRows });
    createdLessons += lessonRows.length;

    await prisma.assessment.createMany({
      data: chapterIds.map((chapterId, chapterIndex) => ({
        chapterId,
        classId: schoolClass.id,
        kind: AssessmentKind.QUIZ,
        exerciseFormat: ExerciseFormat.TEXTE,
        title: `${fixturePrefix}${subject.slug} quiz ${chapterIndex + 1}`,
        instructions: 'Évaluation de données synthétiques pour test local.',
        position: 1,
        status: ContentStatus.PUBLIE,
        createdById: admin.id,
        publishedById: admin.id,
        publishedAt: now,
      })),
    });
    createdAssessments += chapterIds.length;

    const lessons = await prisma.lesson.findMany({
      where: { chapterId: { in: chapterIds } },
      select: { id: true },
      orderBy: [{ chapterId: 'asc' }, { position: 'asc' }],
    });
    await prisma.lessonProgress.createMany({
      data: lessons.filter((_, index) => index % 2 === 0).map((lesson, index) => {
        const completed = index % 4 === 0;
        return {
          userId: student.id,
          lessonId: lesson.id,
          progressPercent: completed ? 100 : 35,
          completedAt: completed ? now : null,
        };
      }),
    });
  }

  console.log(`Compte élève de test prêt : ${testPhone}`);
  console.log(`Contenu synthétique ajouté : ${createdChapters} chapitres, ${createdLessons} leçons, ${createdAssessments} évaluations.`);
  console.log('Ce seed est prévu uniquement pour la base Docker isolée de charge.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
