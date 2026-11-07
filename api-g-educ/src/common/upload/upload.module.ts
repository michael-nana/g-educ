
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  S3_CLIENT,
  UPLOAD_CONFIG,
  createS3Client,
  createUploadConfig,
} from './upload.config';

import { UploadService } from './upload.service';

@Module({
  imports: [ConfigModule],

  providers: [
    {
      provide: UPLOAD_CONFIG,
      inject: [ConfigService],
      useFactory: createUploadConfig,
    },
    {
      provide: S3_CLIENT,
      inject: [UPLOAD_CONFIG],
      useFactory: createS3Client,
    },
    UploadService,
  ],

  exports: [UploadService],
})
export class UploadModule {}
