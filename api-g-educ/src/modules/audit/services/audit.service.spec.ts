import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { randomUUID } from 'crypto';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClsModule, ClsService } from 'nestjs-cls';

import { PrismaModule } from '../../../prisma/prisma.module';
import { ContextClsModule } from '../../../common/cls/cls.module';
import { AuditModule } from '../audit.module';import { AuditService } from '../services/audit.service';
import { PrismaService } from '../../../prisma/prisma.service';

import type { ClsStore } from '../../../common/cls/cls-store.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClsModule.forRoot({
      global: true,
    }),
    PrismaModule,
    ContextClsModule,
    AuditModule,
  ],
})
class AuditTestModule {}
describe('AuditService - Tests d’intégration', () => {
  let app: Awaited<ReturnType<typeof NestFactory.createApplicationContext>>;
  let auditService: AuditService;
  let prisma: PrismaService;
  let cls: ClsService<ClsStore>;
  let adminId: string;

  const ipAddress = '127.0.0.1';

  beforeAll(async () => {
app = await NestFactory.createApplicationContext(AuditTestModule);
    auditService = app.get(AuditService);
    prisma = app.get(PrismaService);
    cls = app.get(ClsService);

    const admin = await prisma.user.findFirst({
      where: {
        role: 'ADMINISTRATEUR',
        status: 'ACTIF',
      },
      select: {
        id: true,
      },
    });

    if (!admin) {
      throw new Error('Aucun administrateur actif trouvé pour les tests.');
    }

    adminId = admin.id;
  });

afterAll(async () => {
  if (app) {
    await app.close();
  }
});

  it('TEST 1 - crée un journal sans transaction', async () => {
    const entityId = randomUUID();

    const result = await cls.runWith(
      {
        userId: adminId,
        role: 'ADMINISTRATEUR',
        ipAddress,
      },
      () =>
        auditService.log({
          action: 'AUDIT_TEST_CREATED',
          entityType: 'AUDIT_TEST',
          entityId,
          after: {
            name: 'Test sans transaction',
          },
        }),
    );

    expect(result.userId).toBe(adminId);
    expect(result.role).toBe('ADMINISTRATEUR');
    expect(result.ipAddress).toBe(ipAddress);
    expect(result.entityId).toBe(entityId);
  });

  it('TEST 2 - crée un journal dans une transaction validée', async () => {
    const entityId = randomUUID();

    await prisma.$transaction(async (tx) => {
      await cls.runWith(
        {
          userId: adminId,
          role: 'ADMINISTRATEUR',
          ipAddress,
        },
        () =>
          auditService.log(
            {
              action: 'AUDIT_TEST_TRANSACTION_COMMITTED',
              entityType: 'AUDIT_TEST',
              entityId,
            },
            tx,
          ),
      );
    });

    const count = await prisma.auditLog.count({
      where: { entityId },
    });

    expect(count).toBe(1);
  });

  it('TEST 3 - annule le journal si la transaction échoue', async () => {
    const entityId = randomUUID();

    await expect(
      prisma.$transaction(async (tx) => {
        await cls.runWith(
          {
            userId: adminId,
            role: 'ADMINISTRATEUR',
            ipAddress,
          },
          () =>
            auditService.log(
              {
                action: 'AUDIT_TEST_TRANSACTION_ROLLBACK',
                entityType: 'AUDIT_TEST',
                entityId,
              },
              tx,
            ),
        );

        throw new Error('ROLLBACK_AUDIT_TEST');
      }),
    ).rejects.toThrow('ROLLBACK_AUDIT_TEST');

    const count = await prisma.auditLog.count({
      where: { entityId },
    });

    expect(count).toBe(0);
  });

  it('TEST 4 - accepte une action système sans utilisateur', async () => {
    const entityId = randomUUID();

    const result = await cls.runWith(
      {
        ipAddress,
      },
      () =>
        auditService.log({
          action: 'AUDIT_SYSTEM_TEST',
          entityType: 'SYSTEM_TEST',
          entityId,
        }),
    );

    expect(result.userId).toBeNull();
    expect(result.role).toBeNull();
    expect(result.entityId).toBe(entityId);
  });

  it('TEST 5 - retourne des identifiants JSON compatibles', async () => {
    const entityId = randomUUID();

    await cls.runWith(
      {
        userId: adminId,
        role: 'ADMINISTRATEUR',
        ipAddress,
      },
      () =>
        auditService.log({
          action: 'AUDIT_TEST_JSON',
          entityType: 'AUDIT_TEST',
          entityId,
        }),
    );

const result = await auditService.findAll({
  entityId,
  page: 1,
  limit: 20,
});

    expect(result.data.length).toBe(1);
    expect(typeof result.data[0].id).toBe('string');

    expect(() => JSON.stringify(result)).not.toThrow();
  });
});
