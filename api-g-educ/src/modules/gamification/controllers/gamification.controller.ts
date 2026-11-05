
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  ActivityRefType,
  ActivityType,
  Role,
} from '../../../generated/prisma/client';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';

import { RecordActivityDto } from '../dto/record-activity.dto';
import { ActivityQueryDto } from '../dto/activity-query.dto';
import { GamificationService } from '../services/gamification.service';

@ApiTags('Gamification - Mon activité')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ELEVE)
@Controller('me')
export class MeGamificationController {
  constructor(
    private readonly gamificationService: GamificationService,
  ) {}

  @Get('streak')
  @ApiOperation({ summary: 'Consulter ma flamme' })
  getStreak(@CurrentUser() user: AuthenticatedUser) {
    return this.gamificationService.getStreak(user.id);
  }

  @Get('activity')
  @ApiOperation({ summary: 'Consulter mon calendrier d’activité' })
  getActivity(
    @CurrentUser() user: AuthenticatedUser,
    @Query() query: ActivityQueryDto,
  ) {
    return this.gamificationService.getActivityCalendar(
      user.id,
      query,
    );
  }
}

@ApiTags('Gamification - Activités')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ELEVE)
@Controller('activities')
export class ActivitiesController {
  constructor(
    private readonly gamificationService: GamificationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Enregistrer une activité' })
  recordActivity(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: RecordActivityDto,
  ) {
    return this.gamificationService.recordActivityForUser(
      {
        id: user.id,
        classId: user.classId,
      },
      {
        userId: user.id,
        clientId: dto.clientId,
        type: dto.type as ActivityType,
        refType: dto.refType as ActivityRefType,
        refId: dto.refId,
        occurredAt: new Date(dto.occurredAt),
      },
    );
  }
}
