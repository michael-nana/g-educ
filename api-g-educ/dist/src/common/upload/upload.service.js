"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const common_1 = require("@nestjs/common");
const upload_config_1 = require("./upload.config");
let UploadService = class UploadService {
    s3Client;
    uploadConfig;
    constructor(s3Client, uploadConfig) {
        this.s3Client = s3Client;
        this.uploadConfig = uploadConfig;
    }
    async uploadFile(input) {
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.uploadConfig.bucket,
            Key: input.storageKey,
            Body: input.buffer,
            ContentType: input.mimeType,
            ContentLength: input.buffer.length,
        }));
    }
    async createSignedDownloadUrl(storageKey, expiresInSeconds = 300) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.uploadConfig.bucket,
            Key: storageKey,
        });
        return (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, {
            expiresIn: expiresInSeconds,
        });
    }
    async deleteFile(storageKey) {
        await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: this.uploadConfig.bucket,
            Key: storageKey,
        }));
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(upload_config_1.S3_CLIENT)),
    __param(1, (0, common_1.Inject)(upload_config_1.UPLOAD_CONFIG)),
    __metadata("design:paramtypes", [client_s3_1.S3Client, Object])
], UploadService);
//# sourceMappingURL=upload.service.js.map