import { JSONSchemaType } from "ajv";
import { ResetPasswordDto } from "src/password/dto/reset-password.dto";
import { password } from "../shared/password.schema";



export const ResetPasswordSchema: JSONSchemaType<ResetPasswordDto> = {
  type: "object",
  properties: {
    resetToken: {
      type: "string"
    },
    newPassword: password,
    newPasswordConfirm: {
      type: "string"
    }
   },
  required: ["resetToken", "newPassword", "newPasswordConfirm"],
  additionalProperties: false,
  if: {
    properties: {
      newPassword: password
    }
  },
  then: {
    properties: {
      newPasswordConfirm: {
        const: {
          $data: "1/newPassword"
        }
      }
    }
  },
  errorMessage: {
    properties: {
      newPasswordConfirm: "should be a string and match the newPassword"
    }
  },
}