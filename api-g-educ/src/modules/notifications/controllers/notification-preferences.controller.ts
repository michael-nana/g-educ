import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';

import { UpdateNotificationPreferencesDto } from '../dto/update-notification-preferences.dto';

import { NotificationPreferencesService } from '../services/notification-preferences.service';

@ApiTags('Notifications - Préférences')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('me/notification-preferences')
export class NotificationPreferencesController {
  constructor(
    private readonly preferencesService: NotificationPreferencesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Consulter mes préférences de notification' })
  get(@CurrentUser() user: AuthenticatedUser) {
    return this.preferencesService.get(user);
  }

  @Put()
  @ApiOperation({ summary: 'Modifier mes préférences de notification' })
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateNotificationPreferencesDto,
  ) {
    return this.preferencesService.update(user, dto);
  }
}