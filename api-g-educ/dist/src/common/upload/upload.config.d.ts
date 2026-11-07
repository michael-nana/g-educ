import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
export declare const UPLOAD_CONFIG = "UPLOAD_CONFIG";
export declare const S3_CLIENT = "S3_CLIENT";
export interface UploadConfig {
    endpoint: string;
    region: string;
    bucket: string;
    accessKeyId: string;
    secretAccessKey: string;
}
export declare function createUploadConfig(configService: ConfigService): UploadConfig;
export declare function createS3Client(config: UploadConfig): S3Client;
