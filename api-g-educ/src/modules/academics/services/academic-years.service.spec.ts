import { Test, TestingModule } from '@nestjs/testing';

import { AcademicYearsService } from './academic-years.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';

describe('AcademicYearsService', () => {
  let service: AcademicYearsService;

  const prismaMock = {
    academicYear: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      updateMany: jest.fn(),
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const auditServiceMock = {
    log: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AcademicYearsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: AuditService,
          useValue: auditServiceMock,
        },
      ],
    }).compile();

    service = module.get<AcademicYearsService>(AcademicYearsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('lists academic years with the newest start date first', async () => {
    const years = [{ id: 'year-1', label: '2026-2027' }];
    prismaMock.academicYear.findMany.mockResolvedValue(years);

    await expect(service.findAll()).resolves.toBe(years);
    expect(prismaMock.academicYear.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { startDate: 'desc' },
      }),
    );
  });
});