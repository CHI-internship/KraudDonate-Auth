import { JSONSchemaType } from "ajv";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { email } from "../shared/email.schema";
import { password } from "../shared/password.schema";


export const CreateUserSchema: JSONSchemaType<CreateUserDto> = {
  type: "object",
  properties: {
    email: email,
    password: password,
    role: {type: "string", nullable: true}
   },
  required: ["email", "password"],
  additionalProperties: false
}