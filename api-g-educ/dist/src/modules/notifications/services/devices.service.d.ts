import { PrismaService } from '../../../prisma/prisma.service';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import type { RegisterDeviceDto } from '../dto/register-device.dto';
export declare class DevicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
