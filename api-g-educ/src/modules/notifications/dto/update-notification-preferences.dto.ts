import {
  IsBoolean,
  IsOptional,
  Matches,
} from 'class-validator';

export class UpdateNotificationPreferencesDto {
  @IsOptional()
  @IsBoolean()
  eventsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  streakReminder?: boolean;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'L’heure doit être au format HH:mm.',
  })
  streakReminderTime?: string;

  @IsOptional()
  @IsBoolean()
  forumEnabled?: boolean;
}