"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_CONFIG = void 0;
exports.APP_CONFIG = {
    otp: {
        expiresInMinutes: 5,
        maxAttempts: 5,
        maxRequestsPerHour: 3,
        codeLength: 6,
        verificationTokenMinutes: 10,
    },
    password: {
        bcryptRounds: 12,
        minimumLength: 8,
    },
    token: {
        accessMinutes: 15,
        refreshDays: 30,
    },
    login: {
        maxFailedAttempts: 5,
        lockMinutes: 15,
    },
    pagination: {
        defaultLimit: 20,
        maxLimit: 100,
    },
};
//# sourceMappingURL=app.constants.js.map