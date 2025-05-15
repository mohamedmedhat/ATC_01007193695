import { Role } from '../../shared/enums/Role.enum';

export interface LoginResponse {
  id: string;
  access_token: string;
  refresh_token: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  roles: Set<Role>;
}
