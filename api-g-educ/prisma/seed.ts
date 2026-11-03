import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  ClassLevel,
  ClassSeries,
  PrismaClient,
  Role,
  SchoolCycle,
  UserStatus,
} from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required to run the seed');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const classes = [
  { code: '6E', label: '6e', cycle: SchoolCycle.COLLEGE, level: ClassLevel.SIXIEME, series: null, position: 1 },
  { code: '5E', label: '5e', cycle: SchoolCycle.COLLEGE, level: ClassLevel.CINQUIEME, series: null, position: 2 },
  { code: '4E', label: '4e', cycle: SchoolCycle.COLLEGE, level: ClassLevel.QUATRIEME, series: null, position: 3 },
  { code: '3E', label: '3e', cycle: SchoolCycle.COLLEGE, level: ClassLevel.TROISIEME, series: null, position: 4 },
  { code: '2A', label: '2nde A', cycle: SchoolCycle.LYCEE, level: ClassLevel.SECONDE, series: ClassSeries.A, position: 5 },
  { code: '2C', label: '2nde C', cycle: SchoolCycle.LYCEE, level: ClassLevel.SECONDE, series: ClassSeries.C, position: 6 },
  { code: '2D', label: '2nde D', cycle: SchoolCycle.LYCEE, level: ClassLevel.SECONDE, series: ClassSeries.D, position: 7 },
  { code: '1A', label: '1ère A', cycle: SchoolCycle.LYCEE, level: ClassLevel.PREMIERE, series: ClassSeries.A, position: 8 },
  { code: '1C', label: '1ère C', cycle: SchoolCycle.LYCEE, level: ClassLevel.PREMIERE, series: ClassSeries.C, position: 9 },
  { code: '1D', label: '1ère D', cycle: SchoolCycle.LYCEE, level: ClassLevel.PREMIERE, series: ClassSeries.D, position: 10 },
  { code: 'TA', label: 'Tle A', cycle: SchoolCycle.LYCEE, level: ClassLevel.TERMINALE, series: ClassSeries.A, position: 11 },
  { code: 'TC', label: 'Tle C', cycle: SchoolCycle.LYCEE, level: ClassLevel.TERMINALE, series: ClassSeries.C, position: 12 },
  { code: 'TD', label: 'Tle D', cycle: SchoolCycle.LYCEE, level: ClassLevel.TERMINALE, series: ClassSeries.D, position: 13 },
] as const;

async function main(): Promise<void> {
  for (const item of classes) {
    await prisma.class.upsert({
      where: { code: item.code },
      update: {
        label: item.label,
        cycle: item.cycle,
        level: item.level,
        series: item.series,
        position: item.position,
      },
      create: item,
    });
  }

  await prisma.academicYear.upsert({
    where: { label: '2026-2027' },
    update: { isCurrent: true },
    create: {
      label: '2026-2027',
      startDate: new Date('2026-09-01T00:00:00.000Z'),
      endDate: new Date('2027-07-31T00:00:00.000Z'),
      isCurrent: true,
    },
  });
  await prisma.academicYear.updateMany({
    where: { label: { not: '2026-2027' }, isCurrent: true },
    data: { isCurrent: false },
  });

  const subjects = [
    ['Mathématiques', 'mathematiques'],
    ['Français', 'francais'],
    ['Anglais', 'anglais'],
    ['Histoire-Géographie', 'histoire-geographie'],
    ['Physique-Chimie', 'physique-chimie'],
    ['SVT', 'svt'],
  ] as const;
  for (const [name, slug] of subjects) {
    await prisma.subject.upsert({
      where: { name },
      update: { slug, isActive: true },
      create: { name, slug, isActive: true },
    });
  }

  const adminPhone = process.env.ADMIN_PHONE;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPhone || !adminPassword) {
    throw new Error('ADMIN_PHONE and ADMIN_PASSWORD are required to run the seed');
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { phone: adminPhone },
    update: {
      passwordHash,
      role: Role.ADMINISTRATEUR,
      status: UserStatus.ACTIF,
      canPublish: true,
      mustChangePassword: true,
    },
    create: {
      phone: adminPhone,
      passwordHash,
      role: Role.ADMINISTRATEUR,
      status: UserStatus.ACTIF,
      canPublish: true,
      mustChangePassword: true,
      phoneVerifiedAt: new Date(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
