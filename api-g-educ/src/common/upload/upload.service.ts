import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { Inject, Injectable } from '@nestjs/common';

import {
  S3_CLIENT,
  UPLOAD_CONFIG,
} from './upload.config';

import type { UploadConfig } from './upload.config';

export interface UploadFileInput {
  storageKey: string;
  buffer: Buffer;
  mimeType: string;
}

@Injectable()
export class UploadService {
  constructor(
    @Inject(S3_CLIENT)
    private readonly s3Client: S3Client,

    @Inject(UPLOAD_CONFIG)
    private readonly uploadConfig: UploadConfig,
  ) {}

  async uploadFile(input: UploadFileInput): Promise<void> {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.uploadConfig.bucket,
        Key: input.storageKey,
        Body: input.buffer,
        ContentType: input.mimeType,
        ContentLength: input.buffer.length,
      }),
    );
  }

  async createSignedDownloadUrl(
    storageKey: string,
    expiresInSeconds = 300,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.uploadConfig.bucket,
      Key: storageKey,
    });

    return getSignedUrl(this.s3Client, command, {
      expiresIn: expiresInSeconds,
    });
  }

  async deleteFile(storageKey: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.uploadConfig.bucket,
        Key: storageKey,
      }),
    );
  }
}
