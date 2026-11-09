
import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  Patch,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

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

}
