import { S3Client } from '@aws-sdk/client-s3';
import type { UploadConfig } from './upload.config';
export interface UploadFileInput {
    storageKey: string;
    buffer: Buffer;
    mimeType: string;
}
export declare class UploadService {
    private readonly s3Client;
    private readonly uploadConfig;
    constructor(s3Client: S3Client, uploadConfig: UploadConfig);
    uploadFile(input: UploadFileInput): Promise<void>;
    createSignedDownloadUrl(storageKey: string, expiresInSeconds?: number): Promise<string>;
    deleteFile(storageKey: string): Promise<void>;
}
