export interface AcademicYear {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  createdAt: string;
}

export interface CreateAcademicYearDto {
  label: string;
  startDate: string;
  endDate: string;
}
