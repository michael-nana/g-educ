
export type UserRole =
  | 'ELEVE'
  | 'ENSEIGNANT'
  | 'MODERATEUR'
  | 'ADMINISTRATEUR';

export type UserStatus = 'ACTIF' | 'SUSPENDU';

export interface StudentProfile {
  displayName: string;
  classId: string;
  schoolName: string | null;
}

export interface UserListItem {
  id: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  canPublish: boolean;
  mustChangePassword: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  studentProfile: StudentProfile | null;
}

export interface UserDetails extends Omit<UserListItem, 'studentProfile'> {
  phoneVerifiedAt: string | null;
  updatedAt: string;
  studentProfile: {
    id: string;
    displayName: string;
    schoolName: string | null;
    classId: string;
    academicYearId: string;
  } | null;
  teacherAssignments: {
    id: string;
    classSubjectId: string;
  }[];
}

export interface UsersPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UsersListResponse {
  data: UserListItem[];
  pagination: UsersPagination;
}

export interface UsersQuery {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface UpdateUserDto {
  role?: UserRole;
  canPublish?: boolean;
}

export interface UpdateUserResponse {
  id: string;
  phone: string;
  role: UserRole;
  canPublish: boolean;
  status: UserStatus;
}

export interface UserStatusResponse {
  id: string;
  status: UserStatus;
  role?: UserRole;
}
export type StaffRole = 'ENSEIGNANT' | 'MODERATEUR';

export interface CreateStaffDto {
  phone: string;
  role: StaffRole;
  canPublish?: boolean;
  classSubjectIds?: string[];
}

export interface CreateStaffResponse {
  user: {
    id: string;
    phone: string;
    role: StaffRole;
    status: UserStatus;
    canPublish: boolean;
    mustChangePassword: boolean;
    createdAt: string;
  };
  temporaryPassword: string;
  message: string;
}