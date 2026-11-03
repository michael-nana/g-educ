import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Role } from '../../../generated/prisma/client';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

import { CreateAcademicYearDto } from '../dto/create-academic-year.dto';
import { AcademicYearsService } from '../services/academic-years.service';

@Controller('academic-years')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AcademicYearsController {
  constructor(
    private readonly academicYearsService: AcademicYearsService,
  ) {}

  @Get('current')
  findCurrent() {
    return this.academicYearsService.findCurrent();
  }

  @Post()
  @Roles(Role.ADMINISTRATEUR)
  create(@Body() dto: CreateAcademicYearDto) {
    return this.academicYearsService.create(dto);
  }
}