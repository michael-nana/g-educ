import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: '+22670123456' })
  @IsPhoneNumber()
  phone!: string;
}