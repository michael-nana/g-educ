import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { AnnalImportService } from '../services/annal-import.service';

@ApiTags('Courses - Annal import')
@ApiBearerAuth()
@Controller('annals')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnnalImportController {
  constructor(private readonly annalImportService: AnnalImportService) {}

  @Post('import')
  @Roles('ADMINISTRATEUR', 'ENSEIGNANT')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024, files: 1 },
  }))
  @ApiOperation({ summary: 'Importer un annal PDF et préparer les brouillons' })
  import(
    @CurrentUser() user: AuthenticatedUser,
    @Body('chapterId') chapterId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!chapterId) throw new BadRequestException('Choisissez un chapitre.');
    return this.annalImportService.importPdf(user, chapterId, file);
  }
}
