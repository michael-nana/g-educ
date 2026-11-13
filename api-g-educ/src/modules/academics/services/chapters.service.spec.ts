import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { TeacherScopeService } from './teacher-scope.service';
import { ChaptersService } from './chapters.service';

describe('ChaptersService', () => {
  let service: ChaptersService;
  const prisma = {
    chapter: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChaptersService,
        { provide: PrismaService, useValue: prisma },
        { provide: AuditService, useValue: {} },
        { provide: TeacherScopeService, useValue: {} },
      ],
    }).compile();

    service = module.get<ChaptersService>(ChaptersService);
  });

  it('lists chapters with class and subject names for the admin page', async () => {
    const chapters = [
      {
        id: 'chapter-1',
        title: 'Les fractions',
        classSubject: {
          class: { label: 'Sixième', code: '6E' },
          subject: { name: 'Mathématiques' },
        },
      },
    ];
    prisma.chapter.findMany.mockResolvedValue(chapters);

    await expect(service.findAll()).resolves.toBe(chapters);
    expect(prisma.chapter.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        select: expect.objectContaining({
          classSubject: {
            select: {
              class: {
                select: { code: true, label: true },
              },
              subject: {
                select: { name: true },
              },
            },
          },
        }),
      }),
    );
  });
});
