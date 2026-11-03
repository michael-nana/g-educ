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
exports.TeacherScopeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let TeacherScopeService = class TeacherScopeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertCanManage(user, classSubjectId) {
        const classSubject = await this.prisma.classSubject.findUnique({
            where: { id: classSubjectId },
            select: {
                id: true,
                classId: true,
                subjectId: true,
            },
        });
        if (!classSubject) {
            throw new common_1.NotFoundException('Matière de classe introuvable');
        }
        if (user.role === 'ADMINISTRATEUR') {
            return classSubject;
        }
        if (user.role !== 'ENSEIGNANT') {
            throw new common_1.ForbiddenException('Vous ne pouvez pas gérer cette matière');
        }
        const assignment = await this.prisma.teacherAssignment.findFirst({
            where: {
                userId: user.id,
                classSubjectId,
            },
            select: { id: true },
        });
        if (!assignment) {
            throw new common_1.ForbiddenException('Vous n êtes pas affecté à cette matière');
        }
        return classSubject;
    }
};
exports.TeacherScopeService = TeacherScopeService;
exports.TeacherScopeService = TeacherScopeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeacherScopeService);
//# sourceMappingURL=teacher-scope.service.js.map