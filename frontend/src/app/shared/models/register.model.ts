import { Role } from '../enums/Role.enum';

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  roles: Set<Role>;
}
