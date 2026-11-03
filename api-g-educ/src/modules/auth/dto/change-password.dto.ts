import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(72)
    currentPassword!: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(72)
    newPassword!: string;
}