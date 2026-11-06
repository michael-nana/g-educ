import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { RegisterDeviceDto } from '../dto/register-device.dto';
import { DevicesService } from '../services/devices.service';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    register(user: AuthenticatedUser, dto: RegisterDeviceDto): Promise<{
        message: string;
        device: {
            id: string;
            createdAt: Date;
            platform: import("../../../generated/prisma/enums").DevicePlatform;
            appVersion: string | null;
            lastSeenAt: Date;
        };
    }>;
    remove(user: AuthenticatedUser, token: string): Promise<{
        message: string;
    }>;
}
