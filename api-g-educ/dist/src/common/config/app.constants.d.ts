export declare const APP_CONFIG: {
    readonly otp: {
        readonly expiresInMinutes: 5;
        readonly maxAttempts: 5;
        readonly maxRequestsPerHour: 3;
        readonly codeLength: 6;
        readonly verificationTokenMinutes: 10;
    };
    readonly password: {
        readonly bcryptRounds: 12;
        readonly minimumLength: 8;
    };
    readonly token: {
        readonly accessMinutes: 15;
        readonly refreshDays: 30;
    };
    readonly login: {
        readonly maxFailedAttempts: 5;
        readonly lockMinutes: 15;
    };
    readonly pagination: {
        readonly defaultLimit: 20;
        readonly maxLimit: 100;
    };
};
