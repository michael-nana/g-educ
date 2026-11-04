import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../../../generated/prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { ClassChangeRequestsService } from '../services/class-change-requests.service';
import { ReviewClassChangeRequestDto } from '../dto/review-class-change-request.dto';
@ApiTags('Users - Changements de classe')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMINISTRATEUR)
@Controller('class-change-requests')
export class ClassChangeRequestsController {
  constructor(
    private readonly service: ClassChangeRequestsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lister les demandes de changement de classe' })
  list() {
    return this.service.list();
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approuver une demande' })
  approve(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ReviewClassChangeRequestDto,
  ) {
    return this.service.approve(admin, id, dto);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Refuser une demande' })
  reject(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ReviewClassChangeRequestDto,
  ) {
    return this.service.reject(admin, id, dto);
  }
}