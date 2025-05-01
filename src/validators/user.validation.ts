export type UserRole = 'admin' | 'client';

export interface User {
  id: number;
  password: string;
  role: UserRole;
}
