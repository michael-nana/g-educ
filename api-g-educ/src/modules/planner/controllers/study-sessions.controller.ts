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

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';

import { CreateStudySessionDto } from '../dto/create-study-session.dto';
import { UpdateStudySessionDto } from '../dto/update-study-session.dto';
import { FilterStudySessionsDto } from '../dto/filter-study-sessions.dto';

import { StudySessionsService } from '../services/study-sessions.service';

@ApiTags('Study Sessions')
@ApiBearerAuth()
@Controller('study-sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ELEVE')
export class StudySessionsController {
  constructor(
    private readonly studySessionsService: StudySessionsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Créer une séance de révision',
  })
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateStudySessionDto,
  ) {
    return this.studySessionsService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Consulter les séances de révision',
  })
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filters: FilterStudySessionsDto,
  ) {
    return this.studySessionsService.findAll(
      user.id,
      filters,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Modifier une séance de révision',
  })
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStudySessionDto,
  ) {
    return this.studySessionsService.update(
      user.id,
      id,
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Supprimer logiquement une séance de révision',
  })
  remove(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.studySessionsService.remove(
      user.id,
      id,
    );
  }
}