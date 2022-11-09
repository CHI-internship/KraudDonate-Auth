import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { LoginUserDto } from "src/auth/dto/login-user.dto";
import { EmailDto } from "src/password/dto/email.dto";
import { ResetPasswordDto } from "src/password/dto/reset-password.dto";
import { UpdatePasswordDto } from "src/password/dto/update-password.dto";


export type SchemaType = CreateUserDto | LoginUserDto | ResetPasswordDto | UpdatePasswordDto | EmailDto;