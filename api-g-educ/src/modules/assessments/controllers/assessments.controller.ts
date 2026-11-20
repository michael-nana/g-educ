
import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  Patch,
  Get,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AssessmentFilterDto } from '../dto/assessment-filter.dto';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AttemptFilterDto } from '../dto/attempt-filter.dto';
import { SubmitAttemptDto } from '../dto/submit-attempt.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { UpdateAssessmentDto } from '../dto/update-assessment.dto';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';

import { AssessmentsService } from '../services/assessments.service';

import { CreateAssessmentDto } from '../dto/create-assessment.dto';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssessmentsController {
  constructor(
    private readonly assessmentsService: AssessmentsService,
  ) {}

  @Post('assessments/:id/files/:fileType')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 },
  }))
  uploadExerciseFile(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Param('fileType') fileType: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.assessmentsService.uploadExerciseFile(user, id, fileType, file);
  }

  @Get('assessments/:id/correction')
  @Roles('ELEVE')
  getExerciseCorrection(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.assessmentsService.getExerciseCorrection(user, id);
  }

  @Post('chapters/:chapterId/exercises')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  createExercise(
    @CurrentUser() user: AuthenticatedUser,
    @Param('chapterId', ParseUUIDPipe) chapterId: string,
    @Body() dto: CreateAssessmentDto,
  ) {
    return this.assessmentsService.create(
      user,
      chapterId,
      dto,
      'EXERCICE',
    );
  }

  @Get('chapters/:chapterId/assessments')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  findForManagement(
    @CurrentUser() user: AuthenticatedUser,
    @Param('chapterId', ParseUUIDPipe) chapterId: string,
  ) {
    return this.assessmentsService.findForManagement(user, chapterId);
  }

@Get('assessments')
@Roles('ELEVE')
findPublishedForStudent(
  @CurrentUser() user: AuthenticatedUser,
  @Query() filters: AssessmentFilterDto,
) {
  return this.assessmentsService.findPublishedForStudent(
    user,
    filters,
  );
}

@Get('assessments/:id')
@Roles('ELEVE')
findPublishedOneForStudent(
  @CurrentUser() user: AuthenticatedUser,
  @Param('id', ParseUUIDPipe) id: string,
) {
  return this.assessmentsService.findPublishedOneForStudent(
    user,
    id,
  );
}


  @Post('chapters/:chapterId/quizzes')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  createQuiz(
    @CurrentUser() user: AuthenticatedUser,
    @Param('chapterId', ParseUUIDPipe) chapterId: string,
    @Body() dto: CreateAssessmentDto,
  ) {
    return this.assessmentsService.create(
      user,
      chapterId,
      dto,
      'QUIZ',
    );
  }

  
@Patch('assessments/:id')
@Roles('ADMINISTRATEUR', 'ENSEIGNANT')
update(
  @CurrentUser() user: AuthenticatedUser,
  @Param('id', ParseUUIDPipe) id: string,
  @Body() dto: UpdateAssessmentDto,
) {
  return this.assessmentsService.update(
    user,
    id,
    dto,
  );
}

@Post('assessments/:id/publish')
@Roles('ADMINISTRATEUR', 'ENSEIGNANT')
publish(
  @CurrentUser() user: AuthenticatedUser,
  @Param('id', ParseUUIDPipe) id: string,
) {
  return this.assessmentsService.publish(user, id);
}

@Post('assessments/:id/archive')
@Roles('ADMINISTRATEUR', 'ENSEIGNANT')
archive(
  @CurrentUser() user: AuthenticatedUser,
  @Param('id', ParseUUIDPipe) id: string,
) {
  return this.assessmentsService.archive(user, id);
}


@Post('assessments/:id/attempts')
@Roles('ELEVE')
submitAttempt(
  
  @CurrentUser() user: AuthenticatedUser,
  @Param('id', ParseUUIDPipe) id: string,
  @Body() dto: SubmitAttemptDto,
) {
  return this.assessmentsService.submitAttempt(
    user,
    id,
    dto,
  );
}

@Get('me/attempts')
@Roles('ELEVE')
findMyAttempts(
  @CurrentUser() user: AuthenticatedUser,
  @Query() filters: AttemptFilterDto,
) {
  return this.assessmentsService.findMyAttempts(
    user,
    filters,
  );
}

@Get('me/attempts/:id')
@Roles('ELEVE')
findMyAttemptById(
  @CurrentUser() user: AuthenticatedUser,
  @Param('id', ParseUUIDPipe) id: string,
) {
  return this.assessmentsService.findMyAttemptById(
    user,
    id,
  );
}


}
