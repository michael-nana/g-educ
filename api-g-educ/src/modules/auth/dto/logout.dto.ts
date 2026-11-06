import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class LogoutDto {
  @ApiProperty()
  @IsString()
  @MinLength(20)
  refreshToken!: string;

  @ApiPropertyOptional({
    description: 'Token FCM de l’appareil à désenregistrer',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(4096)
  deviceToken?: string;
}