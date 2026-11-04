import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../../generated/prisma/client';
import { UsersService } from '../services/users.service';
import { AnonymizationService } from '../services/anonymization.service';
import { ClassChangeRequestsService } from '../services/class-change-requests.service';
import { UpdateMyProfileDto } from '../dto/update-my-profile.dto';
import { ChangeMyPasswordDto } from '../dto/change-my-password.dto';
import { CreateClassChangeRequestDto } from '../dto/create-class-change-request.dto';

@ApiTags('Users - Mon compte')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('me')
export class MeController {
  constructor(
    private readonly usersService: UsersService,
    private readonly anonymizationService: AnonymizationService,
    private readonly classChangeRequestsService: ClassChangeRequestsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Consulter mon profil' })
  getMe(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.getMe(user);
  }

  @Patch('profile')
  @Roles(Role.ELEVE)
  @ApiOperation({ summary: 'Modifier mon profil élève' })
  updateProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateMyProfileDto,
  ) {
    return this.usersService.updateMyProfile(user, dto);
  }

  @Post('password')
  @ApiOperation({ summary: 'Changer mon mot de passe' })
  changePassword(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ChangeMyPasswordDto,
  ) {
    return this.usersService.changePassword(user, dto);
  }

  @Post('class-change-requests')
  @Roles(Role.ELEVE)
  @ApiOperation({ summary: 'Demander un changement de classe' })
  createClassChangeRequest(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateClassChangeRequestDto,
  ) {
    return this.classChangeRequestsService.create(user, dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Anonymiser mon compte' })
  anonymize(@CurrentUser() user: AuthenticatedUser) {
    return this.anonymizationService.anonymize(user);
  }
}