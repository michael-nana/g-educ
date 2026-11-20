import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ProgressService } from './progress.service';

@Controller('me/progress')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  @Roles('ELEVE')
  findMyProgress(@CurrentUser() user: AuthenticatedUser) {
    return this.progressService.findMyProgress(user);
  }

  @Get('subjects/:classSubjectId')
  @Roles('ELEVE')
  findMySubjectProgress(
    @CurrentUser() user: AuthenticatedUser,
    @Param('classSubjectId', ParseUUIDPipe) classSubjectId: string,
  ) {
    return this.progressService.findMySubjectProgress(user, classSubjectId);
  }
}
