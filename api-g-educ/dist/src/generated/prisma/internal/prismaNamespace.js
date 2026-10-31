"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionScalarFieldEnum = exports.UserStreakScalarFieldEnum = exports.ActivityLogScalarFieldEnum = exports.DeviceTokenScalarFieldEnum = exports.NotificationPreferenceScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.EventReminderScalarFieldEnum = exports.EventScalarFieldEnum = exports.StudySessionScalarFieldEnum = exports.AttemptAnswerOptionScalarFieldEnum = exports.AttemptAnswerScalarFieldEnum = exports.AttemptScalarFieldEnum = exports.QuestionOptionScalarFieldEnum = exports.QuestionScalarFieldEnum = exports.AssessmentScalarFieldEnum = exports.LessonProgressScalarFieldEnum = exports.LessonFavoriteScalarFieldEnum = exports.LessonAssetScalarFieldEnum = exports.LessonScalarFieldEnum = exports.ChapterScalarFieldEnum = exports.RefreshTokenScalarFieldEnum = exports.OtpCodeScalarFieldEnum = exports.ClassChangeRequestScalarFieldEnum = exports.ClassEnrollmentScalarFieldEnum = exports.StudentProfileScalarFieldEnum = exports.UserScalarFieldEnum = exports.TeacherAssignmentScalarFieldEnum = exports.ClassSubjectScalarFieldEnum = exports.SubjectScalarFieldEnum = exports.ClassScalarFieldEnum = exports.AcademicYearScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.AuditLogScalarFieldEnum = exports.SanctionScalarFieldEnum = exports.ReportScalarFieldEnum = exports.AnswerLikeScalarFieldEnum = exports.ForumAnswerScalarFieldEnum = exports.ForumThreadScalarFieldEnum = exports.ContributionRatingScalarFieldEnum = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.10.1",
    engine: "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    AcademicYear: 'AcademicYear',
    Class: 'Class',
    Subject: 'Subject',
    ClassSubject: 'ClassSubject',
    TeacherAssignment: 'TeacherAssignment',
    User: 'User',
    StudentProfile: 'StudentProfile',
    ClassEnrollment: 'ClassEnrollment',
    ClassChangeRequest: 'ClassChangeRequest',
    OtpCode: 'OtpCode',
    RefreshToken: 'RefreshToken',
    Chapter: 'Chapter',
    Lesson: 'Lesson',
    LessonAsset: 'LessonAsset',
    LessonFavorite: 'LessonFavorite',
    LessonProgress: 'LessonProgress',
    Assessment: 'Assessment',
    Question: 'Question',
    QuestionOption: 'QuestionOption',
    Attempt: 'Attempt',
    AttemptAnswer: 'AttemptAnswer',
    AttemptAnswerOption: 'AttemptAnswerOption',
    StudySession: 'StudySession',
    Event: 'Event',
    EventReminder: 'EventReminder',
    Notification: 'Notification',
    NotificationPreference: 'NotificationPreference',
    DeviceToken: 'DeviceToken',
    ActivityLog: 'ActivityLog',
    UserStreak: 'UserStreak',
    Contribution: 'Contribution',
    ContributionRating: 'ContributionRating',
    ForumThread: 'ForumThread',
    ForumAnswer: 'ForumAnswer',
    AnswerLike: 'AnswerLike',
    Report: 'Report',
    Sanction: 'Sanction',
    AuditLog: 'AuditLog'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.AcademicYearScalarFieldEnum = {
    id: 'id',
    label: 'label',
    startDate: 'startDate',
    endDate: 'endDate',
    isCurrent: 'isCurrent',
    createdAt: 'createdAt'
};
exports.ClassScalarFieldEnum = {
    id: 'id',
    code: 'code',
    label: 'label',
    cycle: 'cycle',
    level: 'level',
    series: 'series',
    position: 'position'
};
exports.SubjectScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    isActive: 'isActive',
    createdAt: 'createdAt'
};
exports.ClassSubjectScalarFieldEnum = {
    id: 'id',
    classId: 'classId',
    subjectId: 'subjectId',
    coefficient: 'coefficient',
    position: 'position',
    createdAt: 'createdAt'
};
exports.TeacherAssignmentScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    classSubjectId: 'classSubjectId',
    createdAt: 'createdAt'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    phone: 'phone',
    passwordHash: 'passwordHash',
    role: 'role',
    status: 'status',
    canPublish: 'canPublish',
    mustChangePassword: 'mustChangePassword',
    phoneVerifiedAt: 'phoneVerifiedAt',
    failedLoginCount: 'failedLoginCount',
    lockedUntil: 'lockedUntil',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    anonymizedAt: 'anonymizedAt'
};
exports.StudentProfileScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    displayName: 'displayName',
    schoolName: 'schoolName',
    classId: 'classId',
    academicYearId: 'academicYearId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ClassEnrollmentScalarFieldEnum = {
    id: 'id',
    studentProfileId: 'studentProfileId',
    academicYearId: 'academicYearId',
    classId: 'classId',
    createdAt: 'createdAt'
};
exports.ClassChangeRequestScalarFieldEnum = {
    id: 'id',
    studentProfileId: 'studentProfileId',
    academicYearId: 'academicYearId',
    fromClassId: 'fromClassId',
    toClassId: 'toClassId',
    status: 'status',
    reviewedById: 'reviewedById',
    reviewedAt: 'reviewedAt',
    note: 'note',
    createdAt: 'createdAt'
};
exports.OtpCodeScalarFieldEnum = {
    id: 'id',
    phone: 'phone',
    purpose: 'purpose',
    codeHash: 'codeHash',
    expiresAt: 'expiresAt',
    attempts: 'attempts',
    consumedAt: 'consumedAt',
    createdAt: 'createdAt'
};
exports.RefreshTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    deviceId: 'deviceId',
    deviceName: 'deviceName',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    replacedById: 'replacedById',
    lastUsedAt: 'lastUsedAt',
    createdAt: 'createdAt'
};
exports.ChapterScalarFieldEnum = {
    id: 'id',
    classSubjectId: 'classSubjectId',
    classId: 'classId',
    title: 'title',
    description: 'description',
    position: 'position',
    status: 'status',
    version: 'version',
    createdById: 'createdById',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.LessonScalarFieldEnum = {
    id: 'id',
    chapterId: 'chapterId',
    classId: 'classId',
    title: 'title',
    type: 'type',
    contentMarkdown: 'contentMarkdown',
    durationSeconds: 'durationSeconds',
    position: 'position',
    status: 'status',
    version: 'version',
    createdById: 'createdById',
    publishedById: 'publishedById',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.LessonAssetScalarFieldEnum = {
    id: 'id',
    lessonId: 'lessonId',
    kind: 'kind',
    quality: 'quality',
    storageKey: 'storageKey',
    mimeType: 'mimeType',
    sizeBytes: 'sizeBytes',
    durationSeconds: 'durationSeconds',
    processingStatus: 'processingStatus',
    createdAt: 'createdAt'
};
exports.LessonFavoriteScalarFieldEnum = {
    userId: 'userId',
    lessonId: 'lessonId',
    createdAt: 'createdAt'
};
exports.LessonProgressScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    lessonId: 'lessonId',
    progressPercent: 'progressPercent',
    lastPositionSeconds: 'lastPositionSeconds',
    completedAt: 'completedAt',
    updatedAt: 'updatedAt'
};
exports.AssessmentScalarFieldEnum = {
    id: 'id',
    chapterId: 'chapterId',
    classId: 'classId',
    kind: 'kind',
    title: 'title',
    instructions: 'instructions',
    durationSeconds: 'durationSeconds',
    passingPercent: 'passingPercent',
    position: 'position',
    status: 'status',
    version: 'version',
    createdById: 'createdById',
    publishedById: 'publishedById',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.QuestionScalarFieldEnum = {
    id: 'id',
    assessmentId: 'assessmentId',
    type: 'type',
    statement: 'statement',
    explanation: 'explanation',
    imageKey: 'imageKey',
    points: 'points',
    position: 'position'
};
exports.QuestionOptionScalarFieldEnum = {
    id: 'id',
    questionId: 'questionId',
    label: 'label',
    isCorrect: 'isCorrect',
    position: 'position'
};
exports.AttemptScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    assessmentId: 'assessmentId',
    assessmentVersion: 'assessmentVersion',
    clientId: 'clientId',
    status: 'status',
    startedAt: 'startedAt',
    submittedAt: 'submittedAt',
    score: 'score',
    maxScore: 'maxScore',
    durationSeconds: 'durationSeconds',
    createdAt: 'createdAt'
};
exports.AttemptAnswerScalarFieldEnum = {
    id: 'id',
    attemptId: 'attemptId',
    questionId: 'questionId',
    isCorrect: 'isCorrect',
    pointsAwarded: 'pointsAwarded',
    answeredAt: 'answeredAt'
};
exports.AttemptAnswerOptionScalarFieldEnum = {
    attemptAnswerId: 'attemptAnswerId',
    optionId: 'optionId'
};
exports.StudySessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    clientId: 'clientId',
    title: 'title',
    subjectId: 'subjectId',
    startsAt: 'startsAt',
    endsAt: 'endsAt',
    recurrence: 'recurrence',
    recurrenceEndsOn: 'recurrenceEndsOn',
    reminderMinutesBefore: 'reminderMinutesBefore',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.EventScalarFieldEnum = {
    id: 'id',
    classId: 'classId',
    type: 'type',
    title: 'title',
    description: 'description',
    subjectId: 'subjectId',
    startsAt: 'startsAt',
    endsAt: 'endsAt',
    status: 'status',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.EventReminderScalarFieldEnum = {
    id: 'id',
    eventId: 'eventId',
    remindAt: 'remindAt',
    status: 'status',
    attempts: 'attempts',
    sentAt: 'sentAt',
    createdAt: 'createdAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    body: 'body',
    data: 'data',
    sentAt: 'sentAt',
    readAt: 'readAt',
    createdAt: 'createdAt'
};
exports.NotificationPreferenceScalarFieldEnum = {
    userId: 'userId',
    eventsEnabled: 'eventsEnabled',
    streakReminder: 'streakReminder',
    streakReminderTime: 'streakReminderTime',
    forumEnabled: 'forumEnabled',
    updatedAt: 'updatedAt'
};
exports.DeviceTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    platform: 'platform',
    appVersion: 'appVersion',
    lastSeenAt: 'lastSeenAt',
    createdAt: 'createdAt'
};
exports.ActivityLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    clientId: 'clientId',
    type: 'type',
    activityDate: 'activityDate',
    occurredAt: 'occurredAt',
    refType: 'refType',
    refId: 'refId',
    createdAt: 'createdAt'
};
exports.UserStreakScalarFieldEnum = {
    userId: 'userId',
    currentStreak: 'currentStreak',
    longestStreak: 'longestStreak',
    lastActiveDate: 'lastActiveDate',
    updatedAt: 'updatedAt'
};
exports.ContributionScalarFieldEnum = {
    id: 'id',
    classId: 'classId',
    classSubjectId: 'classSubjectId',
    authorId: 'authorId',
    title: 'title',
    description: 'description',
    status: 'status',
    fileKey: 'fileKey',
    fileMimeType: 'fileMimeType',
    fileSizeBytes: 'fileSizeBytes',
    rejectionReason: 'rejectionReason',
    reviewedById: 'reviewedById',
    reviewedAt: 'reviewedAt',
    ratingAvg: 'ratingAvg',
    ratingCount: 'ratingCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ContributionRatingScalarFieldEnum = {
    id: 'id',
    contributionId: 'contributionId',
    raterId: 'raterId',
    score: 'score',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ForumThreadScalarFieldEnum = {
    id: 'id',
    classId: 'classId',
    classSubjectId: 'classSubjectId',
    authorId: 'authorId',
    title: 'title',
    body: 'body',
    status: 'status',
    answersCount: 'answersCount',
    lastActivityAt: 'lastActivityAt',
    hiddenAt: 'hiddenAt',
    hiddenReason: 'hiddenReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ForumAnswerScalarFieldEnum = {
    id: 'id',
    threadId: 'threadId',
    classId: 'classId',
    authorId: 'authorId',
    body: 'body',
    status: 'status',
    likesCount: 'likesCount',
    hiddenAt: 'hiddenAt',
    hiddenReason: 'hiddenReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AnswerLikeScalarFieldEnum = {
    answerId: 'answerId',
    userId: 'userId',
    createdAt: 'createdAt'
};
exports.ReportScalarFieldEnum = {
    id: 'id',
    reporterId: 'reporterId',
    threadId: 'threadId',
    answerId: 'answerId',
    contributionId: 'contributionId',
    reason: 'reason',
    details: 'details',
    status: 'status',
    handledById: 'handledById',
    handledAt: 'handledAt',
    decisionNote: 'decisionNote',
    createdAt: 'createdAt'
};
exports.SanctionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    reason: 'reason',
    startsAt: 'startsAt',
    endsAt: 'endsAt',
    issuedById: 'issuedById',
    reportId: 'reportId',
    revokedAt: 'revokedAt',
    revokedById: 'revokedById',
    createdAt: 'createdAt'
};
exports.AuditLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    role: 'role',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    before: 'before',
    after: 'after',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map