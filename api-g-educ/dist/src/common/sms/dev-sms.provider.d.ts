import { SmsProvider } from './sms.provider';
export declare class DevSmsProvider implements SmsProvider {
    private readonly logger;
    send(phone: string, message: string): Promise<void>;
}
