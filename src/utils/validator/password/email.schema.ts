import { JSONSchemaType } from 'ajv';
import { EmailDto } from 'src/password/dto/email.dto';
import { email } from '../shared/email.schema';

export const EmailShema: JSONSchemaType<EmailDto> = {
  type: 'object',
  properties: {
    email: email,
  },
  required: ['email'],
  additionalProperties: false,
};
