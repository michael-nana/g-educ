"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnvironment = validateEnvironment;
function validateEnvironment(environment) {
    const required = [
        'DATABASE_URL',
        'JWT_ACCESS_SECRET',
        'JWT_REFRESH_SECRET',
        'OTP_VERIFICATION_SECRET',
        'S3_ENDPOINT',
        'S3_REGION',
        'S3_BUCKET',
        'S3_ACCESS_KEY_ID',
        'S3_SECRET_ACCESS_KEY',
    ];
    const missing = required.filter((key) => !environment[key]?.trim());
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
    return environment;
}
//# sourceMappingURL=environment.validation.js.map