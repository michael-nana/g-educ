import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class RequestRegistrationOtpDto {
  @ApiProperty({
    example: '+22670123456',
    description: 'Numéro de téléphone au format international E.164',
  })
  @IsPhoneNumber()
  phone!: string;
}