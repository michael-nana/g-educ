
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.class.findMany({
      select: {
        id: true,
        code: true,
        label: true,
        cycle: true,
        level: true,
        series: true,
        position: true,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }
}
