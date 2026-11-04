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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../../../generated/prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { UsersService } from '../services/users.service';
import { StaffService } from '../services/staff.service';
import { CreateStaffDto } from '../dto/create-staff.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ListUsersDto } from '../dto/list-users.dto';

@ApiTags('Users - Administration')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMINISTRATEUR)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly staffService: StaffService,
  ) {}

  @Post('staff')
  @ApiOperation({ summary: 'Créer un enseignant ou un modérateur' })
  createStaff(@Body() dto: CreateStaffDto) {
    return this.staffService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister les utilisateurs' })
  list(@Query() dto: ListUsersDto) {
    return this.usersService.list(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consulter un utilisateur' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier le rôle ou les permissions' })
  update(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(admin, id, dto);
  }

  @Post(':id/suspend')
  @ApiOperation({ summary: 'Suspendre un utilisateur' })
  suspend(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.suspend(admin, id);
  }

  @Post(':id/reactivate')
  @ApiOperation({ summary: 'Réactiver un utilisateur' })
  reactivate(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.reactivate(admin, id);
  }
}