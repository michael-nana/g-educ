
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';

import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { EventFilterDto } from '../dto/event-filter.dto';

import { EventsService } from '../services/events.service';

@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) {}

  @Post()
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateEventDto,
  ) {
    return this.eventsService.create(user, dto);
  }

  @Patch(':id')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEventDto,
  ) {
    return this.eventsService.update(user, id, dto);
  }

  @Delete(':id')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  archive(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.eventsService.archive(user, id);
  }

  @Get()
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT', 'ELEVE')
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filters: EventFilterDto,
  ) {
    return this.eventsService.findAll(user, filters);
  }
}
