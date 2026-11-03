
import { Controller, Get } from '@nestjs/common';

import { ClassesService } from '../services/classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  findAll() {
    return this.classesService.findAll();
  }
}
