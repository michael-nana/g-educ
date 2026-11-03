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
exports.SubjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let SubjectsService = class SubjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateSlug(name) {
        return name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    handlePrismaError(error) {
        if (error &&
            typeof error === 'object' &&
            'code' in error) {
            const code = error.code;
            if (code === 'P2002') {
                throw new common_1.ConflictException('Une matière avec ce nom ou ce slug existe déjà.');
            }
            if (code === 'P2025') {
                throw new common_1.NotFoundException('Matière introuvable.');
            }
        }
        throw error;
    }
    async create(dto) {
        const name = dto.name.trim();
        if (!name) {
            throw new common_1.BadRequestException('Le nom de la matière est obligatoire.');
        }
        const slug = this.generateSlug(name);
        if (!slug) {
            throw new common_1.BadRequestException('Impossible de générer un slug valide à partir du nom.');
        }
        try {
            return await this.prisma.subject.create({
                data: {
                    name,
                    slug,
                },
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    isActive: true,
                    createdAt: true,
                },
            });
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    async update(id, dto) {
        if (dto.name === undefined && dto.isActive === undefined) {
            throw new common_1.BadRequestException('Au moins un champ doit être fourni pour modifier la matière.');
        }
        const data = {};
        if (dto.name !== undefined) {
            const name = dto.name.trim();
            if (!name) {
                throw new common_1.BadRequestException('Le nom de la matière est obligatoire.');
            }
            const slug = this.generateSlug(name);
            if (!slug) {
                throw new common_1.BadRequestException('Impossible de générer un slug valide à partir du nom.');
            }
            data.name = name;
            data.slug = slug;
        }
        if (dto.isActive !== undefined) {
            data.isActive = dto.isActive;
        }
        try {
            return await this.prisma.subject.update({
                where: { id },
                data,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    isActive: true,
                    createdAt: true,
                },
            });
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
};
exports.SubjectsService = SubjectsService;
exports.SubjectsService = SubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubjectsService);
//# sourceMappingURL=subjects.service.js.map