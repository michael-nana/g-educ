import * as PrismaEnums from '../../generated/prisma/enums';
import {
  ActivityType,
  ClassLevel,
  ClassSeries,
  ContentStatus,
  Role,
  SchoolCycle,
  UserStatus,
} from './shared-enums';

const valuesOf = (value: object) => Object.values(value).sort();

describe('Shared enums', () => {
  it('matches the generated Prisma enums', () => {
    expect(valuesOf(Role)).toEqual(valuesOf(PrismaEnums.Role));
    expect(valuesOf(UserStatus)).toEqual(valuesOf(PrismaEnums.UserStatus));
    expect(valuesOf(ClassLevel)).toEqual(valuesOf(PrismaEnums.ClassLevel));
    expect(valuesOf(ClassSeries)).toEqual(valuesOf(PrismaEnums.ClassSeries));
    expect(valuesOf(SchoolCycle)).toEqual(valuesOf(PrismaEnums.SchoolCycle));
    expect(valuesOf(ContentStatus)).toEqual(valuesOf(PrismaEnums.ContentStatus));
    expect(valuesOf(ActivityType)).toEqual(valuesOf(PrismaEnums.ActivityType));
  });
});
