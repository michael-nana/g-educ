
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

import { LessonsService } from '../services/lessons.service';

import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { LessonFilterDto } from '../dto/lesson-filter.dto';
import { UpdateLessonProgressDto } from '../dto/update-lesson-progress.dto';

@ApiTags('Courses - Lessons')
@ApiBearerAuth()
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
  ) {}

  @Post('chapters/:chapterId/lessons')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  @ApiOperation({ summary: 'Créer une leçon' })
  create(
    @CurrentUser() user: any,
    @Param('chapterId', ParseUUIDPipe) chapterId: string,
    @Body() dto: CreateLessonDto,
  ) {
    return this.lessonsService.create(
      user,
      chapterId,
      dto,
    );
  }

  @Patch('lessons/:id')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  @ApiOperation({ summary: 'Modifier une leçon' })
  update(
    @CurrentUser() user: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(
      user,
      id,
      dto,
    );
  }

  @Post('lessons/:id/assets')
@Roles('ADMINISTRATEUR', 'ENSEIGNANT')
@UseInterceptors(
  FileInterceptor('file', {
    storage: memoryStorage(),
    limits: {
      fileSize: 20 * 1024 * 1024,
      files: 1,
    },
  }),
)
uploadAsset(
  @CurrentUser() user: any,
  @Param('id', ParseUUIDPipe) id: string,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.lessonsService.uploadPdfAsset(user, id, file);
}

@Delete('lessons/:id/assets/:assetId')
@Roles('ADMINISTRATEUR', 'ENSEIGNANT')
deleteAsset(
  @CurrentUser() user: any,
  @Param('id', ParseUUIDPipe) id: string,
  @Param('assetId', ParseUUIDPipe) assetId: string,
) {
  return this.lessonsService.deleteAsset(user, id, assetId);
}

  @Post('lessons/:id/publish')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  @ApiOperation({ summary: 'Publier une leçon' })
  publish(
    @CurrentUser() user: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.lessonsService.publish(user, id);
  }

  @Post('lessons/:id/archive')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  @ApiOperation({ summary: 'Archiver une leçon' })
  archive(
    @CurrentUser() user: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.lessonsService.archive(user, id);
  }

  @Get('lessons')
  @Roles('ELEVE', 'ADMINISTRATEUR', 'ENSEIGNANT')
  @ApiOperation({ summary: 'Lister les leçons' })
  findAll(
    @CurrentUser() user: any,
    @Query() filters: LessonFilterDto,
  ) {
    return this.lessonsService.findAll(
      user,
      filters,
    );
  }

  @Get('lessons/:id')
  @Roles('ELEVE', 'ADMINISTRATEUR', 'ENSEIGNANT')
  @ApiOperation({ summary: 'Détail d’une leçon' })
  findOne(
    @CurrentUser() user: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.lessonsService.findOne(user, id);
  }

  @Put('lessons/:id/favorite')
  @Roles('ELEVE')
  @ApiOperation({ summary: 'Ajouter aux favoris' })
  addFavorite(
    @CurrentUser() user: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.lessonsService.addFavorite(user, id);
  }

  @Delete('lessons/:id/favorite')
  @Roles('ELEVE')
  @ApiOperation({ summary: 'Retirer des favoris' })
  removeFavorite(
    @CurrentUser() user: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.lessonsService.removeFavorite(
      user,
      id,
    );
  }

  @Put('lessons/:id/progress')
  @Roles('ELEVE')
  @ApiOperation({ summary: 'Mettre à jour la progression' })
  updateProgress(
    @CurrentUser() user: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLessonProgressDto,
  ) {
    return this.lessonsService.updateProgress(
      user,
      id,
      dto,
    );
  }

  @Get('me/progress/lessons')
  @Roles('ELEVE')
  @ApiOperation({ summary: 'Reprendre les leçons' })
  findMyProgress(
    @CurrentUser() user: any,
  ) {
    return this.lessonsService.findMyProgress(user);
  }
}
