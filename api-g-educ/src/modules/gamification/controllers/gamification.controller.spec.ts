import { Test, TestingModule } from '@nestjs/testing';
import {
  ActivitiesController,
  MeGamificationController,
} from './gamification.controller';
import { GamificationService } from '../services/gamification.service';

describe('GamificationController', () => {
  let meController: MeGamificationController;
  let activitiesController: ActivitiesController;

  const gamificationServiceMock = {
    getStreak: jest.fn(),
    getActivityCalendar: jest.fn(),
    recordActivityForUser: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        MeGamificationController,
        ActivitiesController,
      ],
      providers: [
        {
          provide: GamificationService,
          useValue: gamificationServiceMock,
        },
      ],
    }).compile();

    meController = module.get<MeGamificationController>(
      MeGamificationController,
    );

    activitiesController = module.get<ActivitiesController>(
      ActivitiesController,
    );
  });

  it('should define MeGamificationController', () => {
    expect(meController).toBeDefined();
  });

  it('should define ActivitiesController', () => {
    expect(activitiesController).toBeDefined();
  });
});