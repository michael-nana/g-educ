"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3_CLIENT = exports.UPLOAD_CONFIG = void 0;
exports.createUploadConfig = createUploadConfig;
exports.createS3Client = createS3Client;
const client_s3_1 = require("@aws-sdk/client-s3");
exports.UPLOAD_CONFIG = 'UPLOAD_CONFIG';
exports.S3_CLIENT = 'S3_CLIENT';
function createUploadConfig(configService) {
    return {
        endpoint: configService.getOrThrow('S3_ENDPOINT'),
        region: configService.getOrThrow('S3_REGION'),
        bucket: configService.getOrThrow('S3_BUCKET'),
        accessKeyId: configService.getOrThrow('S3_ACCESS_KEY_ID'),
        secretAccessKey: configService.getOrThrow('S3_SECRET_ACCESS_KEY'),
    };
}
function createS3Client(config) {
    return new client_s3_1.S3Client({
        endpoint: config.endpoint,
        region: config.region,
        credentials: {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
        },
        forcePathStyle: true,
    });
}
//# sourceMappingURL=upload.config.js.map