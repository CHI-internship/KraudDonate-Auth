import { JSONSchemaType } from "ajv";
import { UserRoles } from "src/auth/dto/roles.dto";

export const Role: JSONSchemaType<UserRoles> = {
  type: "string",
  enum: ["customer", "volunteer", "admin"]
}
