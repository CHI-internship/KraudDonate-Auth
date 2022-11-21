import { JSONSchemaType } from 'ajv';
import { EmailDto } from 'src/password/dto/email.dto';
import { email } from '../shared/email.schema';

export const EmailSchema: JSONSchemaType<EmailDto> = {
  type: 'object',
  properties: {
    email: email,
  },
  required: ['email'],
  additionalProperties: false,
};
