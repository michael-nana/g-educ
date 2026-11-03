import { Global, Module } from '@nestjs/common';
import { DevSmsProvider } from './dev-sms.provider';

export const SMS_PROVIDER = Symbol('SMS_PROVIDER');

@Global()
@Module({
  providers: [
    {
      provide: SMS_PROVIDER,
      useClass: DevSmsProvider,
    },
  ],
  exports: [SMS_PROVIDER],
})
export class SmsModule {}
