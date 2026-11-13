
export interface Subject {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateSubjectDto {
  name: string;
}

export interface UpdateSubjectDto {
  name?: string;
  isActive?: boolean;
}
