import { JSONSchemaType } from 'ajv';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { email } from '../shared/email.schema';
import { password } from '../shared/password.schema';
import { Role } from './roles.schema';

export const CreateUserSchema: JSONSchemaType<CreateUserDto> = {
  type: 'object',
  properties: {
    email: email,
    password: password,
    role: Role,
  },
  required: ['email', 'password', 'role'],
  additionalProperties: false,
};
