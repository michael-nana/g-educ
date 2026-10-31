import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.PrismaClientConstructorArgs<Options>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = Prisma.PrismaClientOptions['omit'], in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get academicYear(): Prisma.AcademicYearDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get class(): Prisma.ClassDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get subject(): Prisma.SubjectDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get classSubject(): Prisma.ClassSubjectDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get teacherAssignment(): Prisma.TeacherAssignmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get studentProfile(): Prisma.StudentProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get classEnrollment(): Prisma.ClassEnrollmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get classChangeRequest(): Prisma.ClassChangeRequestDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get otpCode(): Prisma.OtpCodeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get chapter(): Prisma.ChapterDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get lesson(): Prisma.LessonDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get lessonAsset(): Prisma.LessonAssetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get lessonFavorite(): Prisma.LessonFavoriteDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get lessonProgress(): Prisma.LessonProgressDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get assessment(): Prisma.AssessmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get question(): Prisma.QuestionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get questionOption(): Prisma.QuestionOptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get attempt(): Prisma.AttemptDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get attemptAnswer(): Prisma.AttemptAnswerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get attemptAnswerOption(): Prisma.AttemptAnswerOptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get studySession(): Prisma.StudySessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get event(): Prisma.EventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get eventReminder(): Prisma.EventReminderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notificationPreference(): Prisma.NotificationPreferenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get deviceToken(): Prisma.DeviceTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get userStreak(): Prisma.UserStreakDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get contribution(): Prisma.ContributionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get contributionRating(): Prisma.ContributionRatingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get forumThread(): Prisma.ForumThreadDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get forumAnswer(): Prisma.ForumAnswerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get answerLike(): Prisma.AnswerLikeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get report(): Prisma.ReportDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get sanction(): Prisma.SanctionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get auditLog(): Prisma.AuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
