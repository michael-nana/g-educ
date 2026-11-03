import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';

import { ChaptersService } from '../services/chapters.service';

import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter.dto';
import { ReorderChaptersDto } from '../dto/reorder-chapters.dto';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChaptersController {
  constructor(
    private readonly chaptersService: ChaptersService,
  ) {}

  @Post('class-subjects/:classSubjectId/chapters')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Param('classSubjectId', ParseUUIDPipe) classSubjectId: string,
    @Body() dto: CreateChapterDto,
  ) {
    return this.chaptersService.create(
      user,
      classSubjectId,
      dto,
    );
  }

  @Patch('chapters/:id')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateChapterDto,
  ) {
    return this.chaptersService.update(user, id, dto);
  }

  @Post('chapters/:id/publish')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  publish(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.chaptersService.publish(user, id);
  }

  @Post('chapters/:id/archive')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  archive(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.chaptersService.archive(user, id);
  }

  @Put('class-subjects/:classSubjectId/chapters/order')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  reorder(
    @CurrentUser() user: AuthenticatedUser,
    @Param('classSubjectId', ParseUUIDPipe) classSubjectId: string,
    @Body() dto: ReorderChaptersDto,
  ) {
    return this.chaptersService.reorder(
      user,
      classSubjectId,
      dto,
    );
  }

  @Get('me/chapters')
  @Roles('ELEVE')
  findMyChapters(
    @CurrentUser() user: AuthenticatedUser,
    @Query('classSubjectId') classSubjectId?: string,
  ) {
    return this.chaptersService.findMyChapters(
      user,
      classSubjectId,
    );
  }
}