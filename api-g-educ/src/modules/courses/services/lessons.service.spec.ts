import { Test, TestingModule } from '@nestjs/testing';
import { LessonsService } from './lessons.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { TeacherScopeService } from '../../academics/services/teacher-scope.service';
import { GamificationService } from '../../gamification/services/gamification.service';
import { UploadService } from '../../../common/upload/upload.service';

describe('LessonsService', () => {
  let service: LessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonsService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: AuditService,
          useValue: {
            log: jest.fn(),
          },
        },
        {
          provide: TeacherScopeService,
          useValue: {
            assertCanManage: jest.fn(),
          },
        },
        {
          provide: GamificationService,
          useValue: {
            recordActivity: jest.fn(),
          },
        },
        {
          provide: UploadService,
          useValue: {
            uploadFile: jest.fn(),
            deleteFile: jest.fn(),
            createSignedDownloadUrl: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LessonsService>(LessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});