import { OnModuleInit } from '@nestjs/common';
import type { PushMessage, PushResult } from './interfaces/push-message.interface';
export declare class PushService implements OnModuleInit {
    private readonly logger;
    onModuleInit(): void;
    sendToTokens(tokens: string[], message: PushMessage): Promise<PushResult>;
}
