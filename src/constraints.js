/* @flow */

import type {
  ErrorMessage,
} from './types';

import createConstraint from './util/createConstraint';
import * as validators from './validators';

// Type constraints

export var isNotNull = createConstraint(
  validators.isNotNull,
  'Value is null or undefined'
);

export var isNull = createConstraint(
  validators.isNull,
  'Value is neither null nor undefined'
);

export var isBoolean = createConstraint(
  validators.isBoolean,
  'Value is not boolean'
);

export var isTrue = createConstraint(
  validators.isTrue,
  'Value is not true'
);

export var isFalse = createConstraint(
  validators.isFalse,
  'Value is not false'
);

export var isNumber = createConstraint(
  validators.isNumber,
  'Value is not number'
);

export var isNotANumber = createConstraint(
  validators.isNotANumber,
  'Value is not NaN'
);

export var isInfinity = createConstraint(
  validators.isInfinity,
  'Value is not infinity'
);

export var isString = createConstraint(
  validators.isString,
  'Value is not string'
);

export var isObject = createConstraint(
  validators.isObject,
  'Value is not object'
);

export var isPlainObject = createConstraint(
  validators.isPlainObject,
  'Value is not plain object'
);

export var isArray = createConstraint(
  validators.isArray,
  'Value is not array'
);

export var isRegExp = createConstraint(
  validators.isRegExp,
  'Value is not regular expression'
);

export var isDate = createConstraint(
  validators.isDate,
  'Value is not date'
);

export var isFunction = createConstraint(
  validators.isFunction,
  'Value is not function'
);

// String constraints

export function createRegExpConstraint(regexp: RegExp, message: ?ErrorMessage = null) {
  return createConstraint(
    value => validators.isString(value) && regexp.test(value),
    message || `Value is not matched by pattern`
  );
}

export var isEmail = createConstraint(
  validators.isEmail,
  'Value is not valid email address'
);

export var isUppercase = createConstraint(
  validators.isUppercase,
  'Value has symbols not in uppercase'
);

export var isLowercase = createConstraint(
  validators.isLowercase,
  'Value has symbols not in lowercase'
);

// Number constraints

export function createMinConstraint(min: number, message: ?ErrorMessage = null) {
  return createConstraint(
    value => value >= min,
    message || `Value is less than ${min}`
  );
}

export function createMaxConstraint(max: number, message: ?ErrorMessage = null) {
  return createConstraint(
    value => value <= max,
    message || `Value is more than ${max}`
  );
}

// Length constraints

export var isNotEmpty = createConstraint(
  validators.isNotEmpty,
  'Value is empty'
);

export var isEmpty = createConstraint(
  validators.isEmpty,
  'Value is not empty'
);

export function createMinLengthConstraint(minLength: number, message: ?ErrorMessage = null) {
  return createConstraint(
    value => value && value.length >= minLength,
    message || `Value length is less than ${minLength}`
  );
}

export function createMaxLengthConstraint(maxLength: number, message: ?ErrorMessage = null) {
  return createConstraint(
    value => value && value.length <= maxLength,
    message || `Value length is more than ${maxLength}`
  );
}
