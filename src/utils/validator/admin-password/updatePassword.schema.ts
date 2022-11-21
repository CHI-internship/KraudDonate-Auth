import { JSONSchemaType } from 'ajv';
import { AdminUpdatePassDto } from 'src/admin/admin-password/dto/admin-update-pass.dto';
import { email } from '../shared/email.schema';
import { password } from '../shared/password.schema';

export const UpdateAdmPassSchema: JSONSchemaType<AdminUpdatePassDto> = {
  type: 'object',
  properties: {
    oldPassword: password,
    newPassword: {
      type: 'string',
      minLength: 8,
      not: {
        const: {
          $data: '1/oldPassword',
        },
      },
    },
    newPasswordConfirm: {
      type: 'string',
    },
    email: email,
  },
  required: ['oldPassword', 'newPassword', 'newPasswordConfirm', 'email'],
  errorMessage: {
    properties: {
      newPassword:
        'should be a string with min length 8 and don`t match the oldPassword',
    },
  },
  additionalProperties: false,
  if: {
    properties: {
      newPassword: password,
    },
  },
  then: {
    properties: {
      newPasswordConfirm: {
        const: {
          $data: '1/newPassword',
        },
      },
    },
  },
};
