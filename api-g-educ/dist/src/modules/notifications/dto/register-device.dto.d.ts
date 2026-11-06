import { DevicePlatform } from '../../../generated/prisma/client';
export declare class RegisterDeviceDto {
    token: string;
    platform: DevicePlatform;
    appVersion?: string;
}
