
export interface AssignSubjectDto {
  subjectId: string;
  coefficient?: number;
  position?: number;
}

export interface ClassSubject {
  id: string;
  classId: string;
  subjectId: string;
  coefficient: number;
  position: number;
  createdAt: string;

  subject: {
    id: string;
    name: string;
    slug: string;
    isActive?: boolean;
  };

  class: {
    id: string;
    code: string;
    label: string;
  };
}
