/* @flow */

import type {
  FieldMap,
  Field,
  ConstraintMap,
  SchemaMap,
} from '../types';

import combineConstraints from '../util/combineConstraints';
import nullableConstraint from '../util/nullableConstraint';
import createArrayConstraint from '../util/createArrayConstraint';
import createObjectConstraint from '../util/createObjectConstraint';
import createConstraint from '../util/createConstraint';

import Schema from './Schema';

import * as validators from '../validators';

import {
  isNotNull,
  isNull,
  isBoolean,
  isTrue,
  isFalse,
  isNumber,
  isNotANumber,
  isInfinity,
  isString,
  isObject,
  isPlainObject,
  isArray,
  isRegExp,
  isDate,
  isFunction,
  createRegExpConstraint,
  isEmail,
  isUppercase,
  isLowercase,
  createMinConstraint,
  createMaxConstraint,
  isNotEmpty,
  isEmpty,
  createMinLengthConstraint,
  createMaxLengthConstraint,
} from '../constraints';

function field(name: string, constraints: ConstraintMap): Schema {
  return new Schema({
    type: name,
    check: combineConstraints(constraints),
    children: null,
  });
}

function ensureFieldIsSchema(maybeSchema: Field, name: string = 'field'): Schema {
  return maybeSchema instanceof Schema
    ? maybeSchema
    : field(name, maybeSchema);
}

function fields(fieldMap: FieldMap): SchemaMap {
  return Object.keys(fieldMap)
    .reduce((acc, key) => (
      acc[key] = ensureFieldIsSchema(fieldMap[key], key),
      acc
    ), {});
}

function object(fieldMap: FieldMap, name: ?string): Schema {
  const children = fields(fieldMap);

  const schemaConstraint = createObjectConstraint(
    Object.keys(children)
      .reduce((acc, key) => (
        acc[key] = children[key].check,
        acc
      ), {})
  );

  return new Schema({
    type: name || 'object',
    check: schemaConstraint,
    children,
  });
}

function optional(maybeSchema: Field): Schema {
  const schema = ensureFieldIsSchema(maybeSchema);

  return new Schema({
    type: `optional(${schema.type})`,
    check: nullableConstraint(schema.check),
    children: schema,
  });
}

function list(maybeSchema: Field): Schema {
  const schema = ensureFieldIsSchema(maybeSchema);

  return new Schema({
    type: `list(${schema.type})`,
    check: createArrayConstraint(schema.check),
    children: schema,
  });
}

function contextRoot(schema: Schema): Schema {
  return new Schema({
    type: schema.type,
    check: (value, context) => schema.check(value, { value, parent: context }),
    children: schema.children,
  });
}

function type(name: string, fieldMap: FieldMap): Schema {
  return contextRoot(object(fieldMap, name));
}

export default {
  object,
  optional,
  field,
  fields,
  list,
  contextRoot,
  type,

  validators,

  constraint: createConstraint,

  isNotNull,
  isNull,
  isBoolean,
  isTrue,
  isFalse,
  isNumber,
  isNotANumber,
  isInfinity,
  isString,
  isObject,
  isPlainObject,
  isArray,
  isRegExp,
  isDate,
  isFunction,
  regexp: createRegExpConstraint,
  isEmail,
  isUppercase,
  isLowercase,
  min: createMinConstraint,
  max: createMaxConstraint,
  isNotEmpty,
  isEmpty,
  minLength: createMinLengthConstraint,
  maxLength: createMaxLengthConstraint,
};
