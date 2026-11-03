import { Test, TestingModule } from '@nestjs/testing';

import { AcademicYearsController } from './academic-years.controller';
import { AcademicYearsService } from '../services/academic-years.service';

describe('AcademicYearsController', () => {
  let controller: AcademicYearsController;

  const academicYearsServiceMock = {
    findCurrent: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicYearsController],
      providers: [
        {
          provide: AcademicYearsService,
          useValue: academicYearsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AcademicYearsController>(
      AcademicYearsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});