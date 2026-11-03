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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const prisma_service_1 = require("../../../prisma/prisma.service");
const cls_context_service_1 = require("../../../common/cls/cls-context.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    prisma;
    clsContext;
    constructor(configService, prisma, clsContext) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_ACCESS_SECRET'),
        });
        this.prisma = prisma;
        this.clsContext = clsContext;
    }
    async validate(payload) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            },
            select: {
                id: true,
                role: true,
                status: true,
                canPublish: true,
                anonymizedAt: true,
                studentProfile: {
                    select: {
                        classId: true,
                    },
                },
            },
        });
        if (!user || user.status !== 'ACTIF' || user.anonymizedAt) {
            throw new common_1.UnauthorizedException('Compte invalide ou désactivé');
        }
        if (user.role !== payload.role) {
            throw new common_1.UnauthorizedException('Session invalide');
        }
        const classId = user.studentProfile?.classId ?? null;
        this.clsContext.setUserContext({
            userId: user.id,
            role: user.role,
            classId,
            status: user.status,
            canPublish: user.canPublish,
        });
        return {
            id: user.id,
            role: user.role,
            status: user.status,
            canPublish: user.canPublish,
            classId,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService,
        cls_context_service_1.ClsContextService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map