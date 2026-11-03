import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { ClsService } from 'nestjs-cls';
import { ForbiddenException } from '@nestjs/common';
import type { ClsStore } from '../common/cls/cls-store.interface';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  readonly scopedClient;

  constructor(config: ConfigService, cls: ClsService<ClsStore>) {
    const adapter = new PrismaPg({
      connectionString: config.getOrThrow<string>('DATABASE_URL'),
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
              throw new ForbiddenException('Student class is missing from context');
            }

            const operationArgs = args as {
              data?: Record<string, unknown> | Array<Record<string, unknown>>;
              where?: Record<string, unknown>;
            };

            if (operation === 'create' || operation === 'createMany') {
              if (operation === 'create') {
                operationArgs.data = {
                  ...(operationArgs.data as Record<string, unknown> | undefined),
                  classId,
                };
              } else if (Array.isArray(operationArgs.data)) {
                operationArgs.data = operationArgs.data.map((item) => ({ ...item, classId }));
              } else if (operationArgs.data) {
                operationArgs.data = {
                  ...(operationArgs.data as Record<string, unknown>),
                  classId,
                };
              }
              return query(args);
            }

            if (operationArgs.where) {
              operationArgs.where = { ...operationArgs.where, classId };
            } else {
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
}