export type AssessmentKind = 'EXERCICE' | 'QUIZ';
export type AssessmentStatus = 'BROUILLON' | 'PUBLIE' | 'ARCHIVE';
export type QuestionType = 'QCM_UNIQUE' | 'QCM_MULTIPLE' | 'VRAI_FAUX';

export interface QuestionOption {
  id: string;
  label: string;
  isCorrect: boolean;
  position: number;
}

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  statement: string;
  explanation: string | null;
  imageKey: string | null;
  points: number;
  position: number;
  options: QuestionOption[];
}

export interface Assessment {
  id: string;
  chapterId: string;
  classId: string;
  kind: AssessmentKind;
  title: string;
  instructions: string | null;
  durationSeconds: number | null;
  passingPercent: number | null;
  position: number;
  status: AssessmentStatus;
  version: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  questions: AssessmentQuestion[];
  _count?: {
    attempts: number;
  };
}

export interface CreateAssessmentOptionDto {
  label: string;
  isCorrect: boolean;
  position?: number;
}

export interface CreateAssessmentQuestionDto {
  type: QuestionType;
  statement: string;
  explanation?: string;
  imageKey?: string;
  points?: number;
  position?: number;
  options: CreateAssessmentOptionDto[];
}

export interface CreateAssessmentDto {
  title: string;
  instructions?: string;
  durationSeconds?: number;
  passingPercent?: number;
  position?: number;
  questions: CreateAssessmentQuestionDto[];
}

export interface UpdateAssessmentDto {
  title?: string;
  instructions?: string;
  durationSeconds?: number | null;
  passingPercent?: number | null;
  position?: number;
  questions?: CreateAssessmentQuestionDto[];
}
