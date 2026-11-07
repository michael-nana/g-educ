
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

export const UPLOAD_CONFIG = 'UPLOAD_CONFIG';
export const S3_CLIENT = 'S3_CLIENT';

export interface UploadConfig {
  endpoint: string;
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export function createUploadConfig(
  configService: ConfigService,
): UploadConfig {
  return {
    endpoint: configService.getOrThrow<string>('S3_ENDPOINT'),
    region: configService.getOrThrow<string>('S3_REGION'),
    bucket: configService.getOrThrow<string>('S3_BUCKET'),
    accessKeyId: configService.getOrThrow<string>(
      'S3_ACCESS_KEY_ID',
    ),
    secretAccessKey: configService.getOrThrow<string>(
      'S3_SECRET_ACCESS_KEY',
    ),
  };
}

export function createS3Client(config: UploadConfig): S3Client {
  return new S3Client({
    endpoint: config.endpoint,
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    forcePathStyle: true,
  });
}
