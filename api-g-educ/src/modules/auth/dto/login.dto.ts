import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '+22670123456' })
  @IsPhoneNumber()
  phone!: string;

  @ApiProperty({ example: 'MotDePasse123' })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string;

  @ApiProperty({ example: 'device-001' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  deviceId!: string;

  @ApiPropertyOptional({ example: 'Samsung Galaxy A15' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  deviceName?: string;
}