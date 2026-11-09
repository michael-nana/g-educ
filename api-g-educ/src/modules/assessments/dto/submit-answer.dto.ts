import {
  ArrayUnique,
  IsArray,
  IsUUID,
} from 'class-validator';

export class SubmitAnswerDto {
  @IsUUID()
  questionId!: string;

  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  optionIds!: string[];
}