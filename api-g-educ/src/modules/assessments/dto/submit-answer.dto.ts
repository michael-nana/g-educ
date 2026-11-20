import {
  ArrayUnique,
  IsArray,
  IsUUID,
  IsOptional,
  IsString,
} from 'class-validator';

export class SubmitAnswerDto {
  @IsUUID()
  questionId!: string;

  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  optionIds!: string[];

  @IsOptional()
  @IsString()
  responseText?: string;
}
