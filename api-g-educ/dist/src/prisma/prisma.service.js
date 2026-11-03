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
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../generated/prisma/client");
const nestjs_cls_1 = require("nestjs-cls");
const common_2 = require("@nestjs/common");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    scopedClient;
    constructor(config, cls) {
        const adapter = new adapter_pg_1.PrismaPg({
            connectionString: config.getOrThrow('DATABASE_URL'),
        });
        super({ adapter });
        const classScopedModels = [
            'ClassSubject',
            'Chapter',
            'Lesson',
            'Assessment',
            'Event',
            'Contribution',
            'ForumThread',
            'ForumAnswer',
        ];
        this.scopedClient = this.$extends({
            query: {
                $allModels: {
                    async $allOperations({ model, operation, args, query }) {
                        if (!classScopedModels.includes(model)) {
                            return query(args);
                        }
                        if (cls.get('role') !== 'ELEVE') {
                            return query(args);
                        }
                        const classId = cls.get('classId');
                        if (!classId) {
                            throw new common_2.ForbiddenException('Student class is missing from context');
                        }
                        const operationArgs = args;
                        if (operation === 'create' || operation === 'createMany') {
                            if (operation === 'create') {
                                operationArgs.data = {
                                    ...operationArgs.data,
                                    classId,
                                };
                            }
                            else if (Array.isArray(operationArgs.data)) {
                                operationArgs.data = operationArgs.data.map((item) => ({ ...item, classId }));
                            }
                            else if (operationArgs.data) {
                                operationArgs.data = {
                                    ...operationArgs.data,
                                    classId,
                                };
                            }
                            return query(args);
                        }
                        if (operationArgs.where) {
                            operationArgs.where = { ...operationArgs.where, classId };
                        }
                        else {
                            operationArgs.where = { classId };
                        }
                        return query(args);
                    },
                },
            },
        });
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, nestjs_cls_1.ClsService])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map