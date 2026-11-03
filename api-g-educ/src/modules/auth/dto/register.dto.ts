import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsOptional,
  MinLength,
  MaxLength,
  IsPhoneNumber,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: '+22670123456' })
  @IsPhoneNumber()
  phone!: string;

  @ApiProperty({ example: 'MotDePasse123' })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string;

  @ApiProperty({
    description: 'Jeton temporaire obtenu après vérification OTP',
  })
  @IsString()
  verificationToken!: string;

  @ApiProperty({ example: 'Élève_BF_2026' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  displayName!: string;

  @ApiPropertyOptional({ example: 'Lycée Municipal de Ouagadougou' })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  schoolName?: string;

  @ApiProperty({ example: 'uuid-de-la-classe' })
  @IsUUID()
  classId!: string;
}