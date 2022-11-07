import Ajv from 'ajv';

const ajv = new Ajv()

ajv.addKeyword('roles', { compile: function(schema) {
  return function(data) {

  };
} });
