import { JSONSchemaType } from 'ajv';

export const email: JSONSchemaType<string> = {
  type: 'string',
  format: 'email',
};
