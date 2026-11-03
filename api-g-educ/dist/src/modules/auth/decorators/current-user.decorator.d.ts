export interface AuthenticatedUser {
    id: string;
    role: string;
    status: string;
    canPublish: boolean;
    classId: string | null;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
