"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("../../../generated/prisma/client");
const prisma_service_1 = require("../../../prisma/prisma.service");
const audit_service_1 = require("../../audit/services/audit.service");
const app_constants_1 = require("../../../common/config/app.constants");
let StaffService = class StaffService {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async create(dto) {
        if (dto.role !== client_1.Role.ENSEIGNANT &&
            dto.role !== client_1.Role.MODERATEUR) {
            throw new common_1.BadRequestException('Seuls les rôles ENSEIGNANT et MODERATEUR peuvent être créés ici.');
        }
        if (dto.role === client_1.Role.MODERATEUR && dto.classSubjectIds?.length) {
            throw new common_1.BadRequestException('Un modérateur ne peut pas recevoir d’affectations pédagogiques.');
        }
        if (dto.role === client_1.Role.ENSEIGNANT && !dto.classSubjectIds?.length) {
            throw new common_1.BadRequestException('Un enseignant doit avoir au moins une matière affectée.');
        }
        const existing = await this.prisma.user.findUnique({
            where: { phone: dto.phone },
            select: { id: true },
        });
        if (existing) {
            throw new common_1.BadRequestException('Un compte utilise déjà ce numéro de téléphone.');
        }
        const classSubjectIds = dto.classSubjectIds ?? [];
        if (classSubjectIds.length) {
            const subjects = await this.prisma.classSubject.findMany({
                where: { id: { in: classSubjectIds } },
                select: { id: true },
            });
            if (subjects.length !== classSubjectIds.length) {
                throw new common_1.BadRequestException('Une ou plusieurs matières de classe sont introuvables.');
            }
        }
        const temporaryPassword = (0, crypto_1.randomBytes)(12).toString('base64url');
        const passwordHash = await bcrypt.hash(temporaryPassword, app_constants_1.APP_CONFIG.password.bcryptRounds);
        const account = await this.prisma.$transaction(async (tx) => {
            const created = await tx.user.create({
                data: {
                    phone: dto.phone,
                    passwordHash,
                    role: dto.role,
                    status: 'ACTIF',
                    canPublish: dto.role === client_1.Role.ENSEIGNANT
                        ? (dto.canPublish ?? false)
                        : false,
                    mustChangePassword: true,
                },
                select: {
                    id: true,
                    phone: true,
                    role: true,
                    status: true,
                    canPublish: true,
                    mustChangePassword: true,
                    createdAt: true,
                },
            });
            if (dto.role === client_1.Role.ENSEIGNANT && classSubjectIds.length) {
                await tx.teacherAssignment.createMany({
                    data: classSubjectIds.map((classSubjectId) => ({
                        userId: created.id,
                        classSubjectId,
                    })),
                });
            }
            await this.audit.log({
                action: 'STAFF_CREATED',
                entityType: 'User',
                entityId: created.id,
                after: {
                    phone: created.phone,
                    role: created.role,
                    canPublish: created.canPublish,
                    classSubjectIds,
                },
            }, tx);
            return created;
        });
        return {
            user: account,
            temporaryPassword,
            message: 'Personnel créé. Communiquez le mot de passe temporaire à son titulaire.',
        };
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], StaffService);
//# sourceMappingURL=staff.service.js.map