import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { LoginUserDto } from "src/auth/dto/login-user.dto";
import { EmailDto } from "src/password/dto/email.dto";
import { ResetPasswordDto } from "src/password/dto/reset-password.dto";
import { UpdatePasswordDto } from "src/password/dto/update-password.dto";
import { LoginAdminDto } from "src/admin/auth/dto/login-admin.dto";
import { AdminResetPassDto } from "src/admin/admin-password/dto/admin-reset-pass.dto";
import { AdminUpdatePassDto } from "src/admin/admin-password/dto/admin-update-pass.dto";


export type SchemaType =
  | CreateUserDto
  | LoginUserDto
  | ResetPasswordDto
  | UpdatePasswordDto
  | EmailDto
  | LoginAdminDto
  | AdminResetPassDto
  | AdminUpdatePassDto;
