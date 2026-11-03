import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, Matches } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({ example: '+22670123456' })
  @IsPhoneNumber()
  phone!: string;

  @ApiProperty({
    example: '123456',
    description: 'Code OTP à six chiffres',
  })
  @Matches(/^\d{6}$/, {
    message: 'Le code OTP doit contenir exactement 6 chiffres',
  })
  code!: string;
}