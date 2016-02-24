/* @flow */

import _isArray from 'lodash/isArray';
import _isBoolean from 'lodash/isBoolean';
import _isDate from 'lodash/isDate';
import _isEmpty from 'lodash/isEmpty';
import _isFinite from 'lodash/isFinite';
import _isFunction from 'lodash/isFunction';
import _isNaN from 'lodash/isNaN';
import _isNull from 'lodash/isNull';
import _isNumber from 'lodash/isNumber';
import _isObject from 'lodash/isObject';
import _isPlainObject from 'lodash/isPlainObject';
import _isRegExp from 'lodash/isRegExp';
import _isString from 'lodash/isString';
import _isTypedArray from 'lodash/isTypedArray';
import _isUndefined from 'lodash/isUndefined';

// Type validators

export function isNotNull(value: any): boolean {
  return !_isNull(value) && !_isUndefined(value);
}

export function isNull(value: any): boolean {
  return _isNull(value) || _isUndefined(value);
}

export function isBoolean(value: any): boolean {
  return _isBoolean(value);
}

export function isTrue(value: any): boolean {
  return value === true;
}

export function isFalse(value: any): boolean {
  return value === false;
}

export function isNumber(value: any): boolean {
  return _isNumber(value) && !_isNaN(value) && _isFinite(value);
}

export function isNotANumber(value: any): boolean {
  return _isNaN(value);
}

export function isInfinity(value: any): boolean {
  return _isNumber(value) && !_isNaN(value) && !_isFinite(value);
}

export function isString(value: any): boolean {
  return _isString(value);
}

export function isObject(value: any): boolean {
  return _isObject(value);
}

export function isPlainObject(value: any): boolean {
  return _isPlainObject(value);
}

export function isArray(value: any): boolean {
  return _isArray(value) || _isTypedArray(value);
}

export function isRegExp(value: any): boolean {
  return _isRegExp(value);
}

export function isDate(value: any): boolean {
  return _isDate(value);
}

export function isFunction(value: any): boolean {
  return _isFunction(value);
}

// String validators

export function isEmail(value: any): boolean {
  return /^.+@.+$/.test(value);
}

export function isUppercase(value: any): boolean {
  return _isString(value) && value.toUpperCase() === value;
}

export function isLowercase(value: any): boolean {
  return _isString(value) && value.toLowerCase() === value;
}

// Length validators

export function isNotEmpty(value: any): boolean {
  return !_isEmpty(value);
}

export function isEmpty(value: any): boolean {
  return _isEmpty(value);
}
