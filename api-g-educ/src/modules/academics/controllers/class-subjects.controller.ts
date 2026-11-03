
import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Role } from '../../../generated/prisma/client';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

import { AssignSubjectDto } from '../dto/assign-subject.dto';
import { ClassSubjectsService } from '../services/class-subjects.service';

@Controller('classes/:classId/subjects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClassSubjectsController {
  constructor(
    private readonly classSubjectsService: ClassSubjectsService,
  ) {}

  @Post()
  @Roles(Role.ADMINISTRATEUR)
  assign(
    @Param('classId', new ParseUUIDPipe()) classId: string,
    @Body() dto: AssignSubjectDto,
  ) {
    return this.classSubjectsService.assign(classId, dto);
  }
}
