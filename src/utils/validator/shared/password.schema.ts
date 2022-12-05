import { JSONSchemaType } from 'ajv';

export const password: JSONSchemaType<string> = {
  type: 'string',
  format: 'password',
  minLength: 8,
};
