export type ClassChangeRequestStatus =
  | 'EN_ATTENTE'
  | 'APPROUVEE'
  | 'REFUSEE';

export interface ClassChangeRequest {
  id: string;
  studentProfileId: string;
  academicYearId: string;
  fromClassId: string;
  toClassId: string;
  status: ClassChangeRequestStatus;
  note: string | null;
  reviewedById: string | null;
  reviewedAt: string | null;
  createdAt: string;
  studentProfile?: {
    displayName: string;
    schoolName: string | null;
  } | null;
  academicYear?: {
    label: string;
  } | null;
  fromClass?: {
    code: string;
    label: string;
  } | null;
  toClass?: {
    code: string;
    label: string;
  } | null;
}

export interface ReviewClassChangeRequestDto {
  note?: string;
}

export interface ClassChangeRequestReviewResult {
  id: string;
  status: Exclude<ClassChangeRequestStatus, 'EN_ATTENTE'>;
  reviewedById: string | null;
  reviewedAt: string | null;
  note: string | null;
}
