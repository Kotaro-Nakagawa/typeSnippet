type JSONSchemaType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'array'
  | 'object'
  | 'null';

interface BaseJSONSchema {
  type?: JSONSchemaType | JSONSchemaType[];
  [key: string]: any;
}

interface StringSchema extends BaseJSONSchema {
  type: 'string';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

interface NumberSchema extends BaseJSONSchema {
  type: 'number' | 'integer';
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
}

interface BooleanSchema extends BaseJSONSchema {
  type: 'boolean';
}

interface NullSchema extends BaseJSONSchema {
  type: 'null';
}

interface ArraySchema extends BaseJSONSchema {
  type: 'array';
  items?: JSONSchema | JSONSchema[];
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
}

interface ObjectSchema extends BaseJSONSchema {
  type: 'object';
  properties: { [key: string]: JSONSchema };
  required?: string[];
  additionalProperties?: boolean | JSONSchema;
  minProperties?: number;
  maxProperties?: number;
}

type JSONSchema =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | NullSchema
  | ArraySchema
  | ObjectSchema;
