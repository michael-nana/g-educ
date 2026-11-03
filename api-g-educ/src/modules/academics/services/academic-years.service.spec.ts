import { Test, TestingModule } from '@nestjs/testing';

import { AcademicYearsService } from './academic-years.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';

describe('AcademicYearsService', () => {
  let service: AcademicYearsService;

  const prismaMock = {
    academicYear: {
      findFirst: jest.fn(),
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
});