import { UserRoles } from "./roles.dto";

export class CreateUserDto {
  email: string;
  password: string;
  role: UserRoles;
}
