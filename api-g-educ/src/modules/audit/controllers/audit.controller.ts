import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuditService } from '../services/audit.service';
import { AuditQueryDto } from '../dto/audit-query.dto';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('audit')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMINISTRATEUR')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  findAll(@Query() filters: AuditQueryDto) {
    return this.auditService.findAll(filters);
  }
}