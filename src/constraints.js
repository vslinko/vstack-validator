/* @flow */

import type {
  ErrorMessage,
  Constraint,
} from './types';

import createConstraint from './util/createConstraint';
import * as validators from './validators';

// Type constraints

export const isNotNull = createConstraint(
  validators.isNotNull,
  'Value is null or undefined'
);

export const isNull = createConstraint(
  validators.isNull,
  'Value is neither null nor undefined'
);

export const isBoolean = createConstraint(
  validators.isBoolean,
  'Value is not boolean'
);

export const isTrue = createConstraint(
  validators.isTrue,
  'Value is not true'
);

export const isFalse = createConstraint(
  validators.isFalse,
  'Value is not false'
);

export const isNumber = createConstraint(
  validators.isNumber,
  'Value is not number'
);

export const isNotANumber = createConstraint(
  validators.isNotANumber,
  'Value is not NaN'
);

export const isInfinity = createConstraint(
  validators.isInfinity,
  'Value is not infinity'
);

export const isString = createConstraint(
  validators.isString,
  'Value is not string'
);

export const isObject = createConstraint(
  validators.isObject,
  'Value is not object'
);

export const isPlainObject = createConstraint(
  validators.isPlainObject,
  'Value is not plain object'
);

export const isArray = createConstraint(
  validators.isArray,
  'Value is not array'
);

export const isRegExp = createConstraint(
  validators.isRegExp,
  'Value is not regular expression'
);

export const isDate = createConstraint(
  validators.isDate,
  'Value is not date'
);

export const isFunction = createConstraint(
  validators.isFunction,
  'Value is not function'
);

// String constraints

export function createRegExpConstraint(regexp: RegExp, message: ?ErrorMessage = null): Constraint {
  return createConstraint(
    value => validators.isString(value) && regexp.test(value),
    message || 'Value is not matched by pattern'
  );
}

export const isEmail = createConstraint(
  validators.isEmail,
  'Value is not valid email address'
);

export const isUppercase = createConstraint(
  validators.isUppercase,
  'Value has symbols not in uppercase'
);

export const isLowercase = createConstraint(
  validators.isLowercase,
  'Value has symbols not in lowercase'
);

// Number constraints

export function createMinConstraint(min: number, message: ?ErrorMessage = null): Constraint {
  return createConstraint(
    value => value >= min, // null and undefined are treated automatically by the comparison.
    message || `Value is less than ${min}`
  );
}

export function createMaxConstraint(max: number, message: ?ErrorMessage = null): Constraint {
  return createConstraint(
    value => value <= max, // null and undefined are treated automatically by the comparison.
    message || `Value is more than ${max}`
  );
}

// Length constraints

export const isNotEmpty = createConstraint(
  validators.isNotEmpty,
  'Value is empty'
);

export const isEmpty = createConstraint(
  validators.isEmpty,
  'Value is not empty'
);

export function createMinLengthConstraint(
  minLength: number,
  message: ?ErrorMessage = null
): Constraint {
  return createConstraint(
    value => value && value.length >= minLength, // null and undefined cannot meet any minimum length requirement, even a min length of 0 is longer than null or undefined!
    message || `Value length is less than ${minLength}`
  );
}

export function createMaxLengthConstraint(
  maxLength: number,
  message: ?ErrorMessage = null
): Constraint {
  return createConstraint(
    value => typeof value === "undefined" || value === null || value.length <= maxLength,// if the value is undefined or null, then it is already known to be shorter than required.  If you don't want it to be either of those, then please use the isNotNull contraint as well.
    message || `Value length is more than ${maxLength}`
  );
}
