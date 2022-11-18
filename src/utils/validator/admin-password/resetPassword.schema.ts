import { JSONSchemaType } from 'ajv';
import { AdminResetPassDto } from 'src/admin/admin-password/dto/admin-reset-pass.dto';
import { email } from '../shared/email.schema';
import { password } from '../shared/password.schema';

export const ResetAdmPassSchema: JSONSchemaType<AdminResetPassDto> = {
  type: 'object',
  properties: {
    newPassword: password,
    confirmPassword: {
      type: 'string',
    },
    email: email,
  },
  required: ['newPassword', 'confirmPassword', 'email'],
  additionalProperties: false,
  if: {
    properties: {
      newPassword: password,
    },
  },
  then: {
    properties: {
      confirmPassword: {
        const: {
          $data: '1/newPassword',
        },
      },
    },
  },
};
