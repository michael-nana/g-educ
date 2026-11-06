import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  applicationDefault,
  getApps,
  initializeApp,
} from 'firebase-admin/app';

import { getMessaging } from 'firebase-admin/messaging';

import type {
  PushMessage,
  PushResult,
} from './interfaces/push-message.interface';

@Injectable()
export class PushService implements OnModuleInit {
  private readonly logger = new Logger(PushService.name);

  onModuleInit() {
    if (getApps().length === 0) {
      initializeApp({
        credential: applicationDefault(),
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
    }

    this.logger.log('Firebase Admin SDK initialisé.');
  }

  async sendToTokens(
    tokens: string[],
    message: PushMessage,
  ): Promise<PushResult> {
    const result: PushResult = {
      successTokens: [],
      invalidTokens: [],
    };

    const uniqueTokens = [...new Set(tokens)];

    if (uniqueTokens.length === 0) {
      return result;
    }

    const messaging = getMessaging();

    for (let index = 0; index < uniqueTokens.length; index += 500) {
      const batch = uniqueTokens.slice(index, index + 500);

      try {
        const response = await messaging.sendEachForMulticast({
          tokens: batch,
          notification: {
            title: message.title,
            body: message.body,
          },
          data: message.data ?? {},
        });

        response.responses.forEach((item, responseIndex) => {
          const token = batch[responseIndex];

          if (item.success) {
            result.successTokens.push(token);
            return;
          }

          const errorCode = item.error?.code;

          if (
            errorCode ===
              'messaging/registration-token-not-registered' ||
            errorCode === 'messaging/invalid-registration-token'
          ) {
            result.invalidTokens.push(token);
          } else {
            this.logger.warn(
              `Échec Push pour un token : ${errorCode ?? 'erreur inconnue'}`,
            );
          }
        });
      } catch (error) {
        this.logger.error(
          'Impossible d’envoyer un lot de notifications Firebase.',
          error instanceof Error ? error.stack : String(error),
        );
      }
    }

    return result;
  }
}