import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  const prismaMock = {
    user: { count: jest.fn() },
    class: { count: jest.fn() },
    lesson: { count: jest.fn() },
    userStreak: { aggregate: jest.fn() },
    lessonProgress: { count: jest.fn() },
    attempt: { count: jest.fn() },
    contribution: { count: jest.fn() },
    report: { count: jest.fn() },
    classChangeRequest: { count: jest.fn() },
    event: { findMany: jest.fn() },
    $queryRaw: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    prismaMock.user.count.mockResolvedValueOnce(12).mockResolvedValueOnce(4);
    prismaMock.class.count.mockResolvedValue(6);
    prismaMock.lesson.count.mockResolvedValue(18);
    prismaMock.userStreak.aggregate.mockResolvedValue({
      _sum: { currentStreak: 35 },
    });
    prismaMock.lessonProgress.count.mockResolvedValue(8);
    prismaMock.attempt.count.mockResolvedValueOnce(3).mockResolvedValueOnce(2);
    prismaMock.contribution.count.mockResolvedValue(4);
    prismaMock.report.count.mockResolvedValue(1);
    prismaMock.classChangeRequest.count.mockResolvedValue(2);
    prismaMock.$queryRaw
      .mockResolvedValueOnce([
        { date: new Date().toISOString().slice(0, 10), activeStudents: 7 },
      ])
      .mockResolvedValueOnce([
        {
          code: '6E',
          label: '6e',
          totalStudents: 10,
          activeStudents: 7,
          activityRate: 70,
        },
      ]);
    prismaMock.event.findMany.mockResolvedValue([]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get(DashboardService);
  });

  it('returns dashboard totals, today metrics and activity for the selected period', async () => {
    const result = await service.getStats({ period: 30 });

    expect(result.periodDays).toBe(30);
    expect(result.totals).toEqual({
      students: 12,
      teachers: 4,
      classes: 6,
      publishedLessons: 18,
      activeStreakDays: 35,
    });
    expect(result.today).toEqual({
      activeStudents: 7,
      lessonsCompleted: 8,
      exercisesSubmitted: 3,
      quizzesSubmitted: 2,
    });
    expect(result.pending).toEqual({
      contributions: 4,
      reports: 1,
      classChanges: 2,
    });
    expect(result.topClasses[0].code).toBe('6E');
    expect(result.upcomingEvents).toEqual([]);
    expect(prismaMock.user.count).toHaveBeenCalledTimes(2);
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(2);
  });

  it('defaults the activity period to 14 days', async () => {
    const result = await service.getStats({});

    expect(result.periodDays).toBe(14);
  });
});
