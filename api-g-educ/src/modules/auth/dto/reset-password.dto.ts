import { ApiProperty } from '@nestjs/swagger';
import {
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: '+22670123456' })
  @IsPhoneNumber()
  phone!: string;

  @ApiProperty({ example: '123456' })
  @Matches(/^\d{6}$/)
  code!: string;

  @ApiProperty({ example: 'NouveauMotDePasse123' })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  newPassword!: string;
}