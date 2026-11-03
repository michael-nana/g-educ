import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';

import { MeSubjectsService } from '../services/me-subjects.service';

@Controller('me/subjects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MeSubjectsController {
  constructor(
    private readonly meSubjectsService: MeSubjectsService,
  ) {}

  @Get()
  @Roles('ELEVE')
  findMySubjects(
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.meSubjectsService.findMySubjects(user.id);
  }
}