import { Role } from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { CreateStaffDto } from '../dto/create-staff.dto';
export declare class StaffService {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    create(dto: CreateStaffDto): Promise<{
        user: {
            id: string;
            createdAt: Date;
            phone: string;
            role: Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            canPublish: boolean;
            mustChangePassword: boolean;
        };
        temporaryPassword: string;
        message: string;
    }>;
}
