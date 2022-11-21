import { JSONSchemaType } from 'ajv';
import { LoginAdminDto } from 'src/admin/auth/dto/login-admin.dto';
import { email } from '../shared/email.schema';
import { password } from '../shared/password.schema';

export const LoginAdminSchema: JSONSchemaType<LoginAdminDto> = {
  type: 'object',
  properties: {
    email: email,
    password: password,
  },
  required: ['email', 'password'],
  additionalProperties: false,
};
