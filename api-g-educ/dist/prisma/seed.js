"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../src/generated/prisma/client");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is required to run the seed');
}
const prisma = new client_1.PrismaClient({
    adapter: new adapter_pg_1.PrismaPg({ connectionString }),
});
const classes = [
    { code: '6E', label: '6e', cycle: client_1.SchoolCycle.COLLEGE, level: client_1.ClassLevel.SIXIEME, series: null, position: 1 },
    { code: '5E', label: '5e', cycle: client_1.SchoolCycle.COLLEGE, level: client_1.ClassLevel.CINQUIEME, series: null, position: 2 },
    { code: '4E', label: '4e', cycle: client_1.SchoolCycle.COLLEGE, level: client_1.ClassLevel.QUATRIEME, series: null, position: 3 },
    { code: '3E', label: '3e', cycle: client_1.SchoolCycle.COLLEGE, level: client_1.ClassLevel.TROISIEME, series: null, position: 4 },
    { code: '2A', label: '2nde A', cycle: client_1.SchoolCycle.LYCEE, level: client_1.ClassLevel.SECONDE, series: client_1.ClassSeries.A, position: 5 },
    { code: '2C', label: '2nde C', cycle: client_1.SchoolCycle.LYCEE, level: client_1.ClassLevel.SECONDE, series: client_1.ClassSeries.C, position: 6 },
    { code: '2D', label: '2nde D', cycle: client_1.SchoolCycle.LYCEE, level: client_1.ClassLevel.SECONDE, series: client_1.ClassSeries.D, position: 7 },
    { code: '1A', label: '1ère A', cycle: client_1.SchoolCycle.LYCEE, level: client_1.ClassLevel.PREMIERE, series: client_1.ClassSeries.A, position: 8 },
    { code: '1C', label: '1ère C', cycle: client_1.SchoolCycle.LYCEE, level: client_1.ClassLevel.PREMIERE, series: client_1.ClassSeries.C, position: 9 },
    { code: '1D', label: '1ère D', cycle: client_1.SchoolCycle.LYCEE, level: client_1.ClassLevel.PREMIERE, series: client_1.ClassSeries.D, position: 10 },
    { code: 'TA', label: 'Tle A', cycle: client_1.SchoolCycle.LYCEE, level: client_1.ClassLevel.TERMINALE, series: client_1.ClassSeries.A, position: 11 },
    { code: 'TC', label: 'Tle C', cycle: client_1.SchoolCycle.LYCEE, level: client_1.ClassLevel.TERMINALE, series: client_1.ClassSeries.C, position: 12 },
    { code: 'TD', label: 'Tle D', cycle: client_1.SchoolCycle.LYCEE, level: client_1.ClassLevel.TERMINALE, series: client_1.ClassSeries.D, position: 13 },
];
async function main() {
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
    ];
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
    const passwordHash = await bcrypt_1.default.hash(adminPassword, 12);
    await prisma.user.upsert({
        where: { phone: adminPhone },
        update: {
            passwordHash,
            role: client_1.Role.ADMINISTRATEUR,
            status: client_1.UserStatus.ACTIF,
            canPublish: true,
            mustChangePassword: true,
        },
        create: {
            phone: adminPhone,
            passwordHash,
            role: client_1.Role.ADMINISTRATEUR,
            status: client_1.UserStatus.ACTIF,
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
//# sourceMappingURL=seed.js.map