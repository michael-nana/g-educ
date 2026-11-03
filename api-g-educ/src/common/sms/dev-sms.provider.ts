import { Injectable, Logger } from '@nestjs/common';
import { SmsProvider } from './sms.provider';

@Injectable()
export class DevSmsProvider implements SmsProvider {
  private readonly logger = new Logger(DevSmsProvider.name);

  async send(phone: string, message: string): Promise<void> {
    this.logger.warn(`SMS vers ${phone}: ${message}`);
  }
}
