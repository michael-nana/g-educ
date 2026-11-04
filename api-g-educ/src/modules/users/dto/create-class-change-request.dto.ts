import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateClassChangeRequestDto {
  @IsUUID('4')
  toClassId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  note!: string;
}