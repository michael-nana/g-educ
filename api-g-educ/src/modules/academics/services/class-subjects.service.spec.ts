import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../../prisma/prisma.service';
import { ClassSubjectsService } from './class-subjects.service';

describe('ClassSubjectsService', () => {
  let service: ClassSubjectsService;
  const prisma = {
    class: {
      findUnique: jest.fn(),
    },
    classSubject: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassSubjectsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ClassSubjectsService>(ClassSubjectsService);
  });

  it('returns the subjects assigned to an existing class', async () => {
    const assignments = [{ id: 'assignment-1', subjectId: 'subject-1' }];
    prisma.class.findUnique.mockResolvedValue({ id: 'class-1' });
    prisma.classSubject.findMany.mockResolvedValue(assignments);

    await expect(service.findAll('class-1')).resolves.toBe(assignments);
    expect(prisma.classSubject.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { classId: 'class-1' },
        orderBy: { position: 'asc' },
      }),
    );
  });

  it('returns all class-subject assignments in one query', async () => {
    const assignments = [{ id: 'assignment-1', classId: 'class-1' }];
    prisma.classSubject.findMany.mockResolvedValue(assignments);

    await expect(service.findAllAssignments()).resolves.toBe(assignments);
    expect(prisma.classSubject.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: [
          { class: { position: 'asc' } },
          { position: 'asc' },
        ],
      }),
    );
  });

  it('returns not found when the class does not exist', async () => {
    prisma.class.findUnique.mockResolvedValue(null);

    await expect(service.findAll('missing-class')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(prisma.classSubject.findMany).not.toHaveBeenCalled();
  });
});
