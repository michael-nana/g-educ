"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnvironment = validateEnvironment;
function validateEnvironment(environment) {
    const required = [
        'DATABASE_URL',
        'JWT_ACCESS_SECRET',
        'JWT_REFRESH_SECRET',
        'OTP_VERIFICATION_SECRET',
    ];
    const missing = required.filter((key) => !environment[key]?.trim());
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
    return environment;
}
//# sourceMappingURL=environment.validation.js.map