import { assert } from 'chai';

import * as validators from '../src/validators';

describe('validators', () => {
  function Foo() {}

  describe('isNotNull', () => {
    it('should correctly validate values', () => {
      assert.isTrue(validators.isNotNull(0));
      assert.isTrue(validators.isNotNull(''));
      assert.isTrue(validators.isNotNull(true));
      assert.isTrue(validators.isNotNull(false));
      assert.isFalse(validators.isNotNull(null));
      assert.isFalse(validators.isNotNull(undefined));
      assert.isTrue(validators.isNotNull(NaN));
      assert.isTrue(validators.isNotNull(Infinity));
      assert.isTrue(validators.isNotNull([]));
      assert.isTrue(validators.isNotNull({}));
      assert.isTrue(validators.isNotNull(new Foo()));
      assert.isTrue(validators.isNotNull(new Date()));
      assert.isTrue(validators.isNotNull(/./));
      assert.isTrue(validators.isNotNull(Foo));
    });
  });

  describe('isNull', () => {
    it('should correctly validate values', () => {
      assert.isTrue(validators.isNull(null));
      assert.isTrue(validators.isNull(undefined));
      assert.isFalse(validators.isNull(0));
      assert.isFalse(validators.isNull(''));
      assert.isFalse(validators.isNull(true));
      assert.isFalse(validators.isNull(false));
      assert.isFalse(validators.isNull(NaN));
      assert.isFalse(validators.isNull(Infinity));
      assert.isFalse(validators.isNull([]));
      assert.isFalse(validators.isNull({}));
      assert.isFalse(validators.isNull(new Foo()));
      assert.isFalse(validators.isNull(new Date()));
      assert.isFalse(validators.isNull(/./));
      assert.isFalse(validators.isNull(Foo));
    });
  });

  describe('isBoolean', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isBoolean(0));
      assert.isFalse(validators.isBoolean(''));
      assert.isFalse(validators.isBoolean(null));
      assert.isFalse(validators.isBoolean(undefined));
      assert.isTrue(validators.isBoolean(true));
      assert.isTrue(validators.isBoolean(false));
      assert.isFalse(validators.isBoolean(NaN));
      assert.isFalse(validators.isBoolean(Infinity));
      assert.isFalse(validators.isBoolean([]));
      assert.isFalse(validators.isBoolean({}));
      assert.isFalse(validators.isBoolean(new Foo()));
      assert.isFalse(validators.isBoolean(new Date()));
      assert.isFalse(validators.isBoolean(/./));
      assert.isFalse(validators.isBoolean(Foo));
    });
  });

  describe('isTrue', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isTrue(0));
      assert.isFalse(validators.isTrue(''));
      assert.isFalse(validators.isTrue(null));
      assert.isFalse(validators.isTrue(undefined));
      assert.isFalse(validators.isTrue(false));
      assert.isTrue(validators.isTrue(true));
      assert.isFalse(validators.isTrue(NaN));
      assert.isFalse(validators.isTrue(Infinity));
      assert.isFalse(validators.isTrue([]));
      assert.isFalse(validators.isTrue({}));
      assert.isFalse(validators.isTrue(new Foo()));
      assert.isFalse(validators.isTrue(new Date()));
      assert.isFalse(validators.isTrue(/./));
      assert.isFalse(validators.isTrue(Foo));
    });
  });

  describe('isFalse', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isFalse(0));
      assert.isFalse(validators.isFalse(''));
      assert.isFalse(validators.isFalse(null));
      assert.isFalse(validators.isFalse(undefined));
      assert.isFalse(validators.isFalse(true));
      assert.isTrue(validators.isFalse(false));
      assert.isFalse(validators.isFalse(NaN));
      assert.isFalse(validators.isFalse(Infinity));
      assert.isFalse(validators.isFalse([]));
      assert.isFalse(validators.isFalse({}));
      assert.isFalse(validators.isFalse(new Foo()));
      assert.isFalse(validators.isFalse(new Date()));
      assert.isFalse(validators.isFalse(/./));
      assert.isFalse(validators.isFalse(Foo));
    });
  });

  describe('isNumber', () => {
    it('should correctly validate values', () => {
      assert.isTrue(validators.isNumber(0));
      assert.isFalse(validators.isNumber(''));
      assert.isFalse(validators.isNumber(null));
      assert.isFalse(validators.isNumber(undefined));
      assert.isFalse(validators.isNumber(true));
      assert.isFalse(validators.isNumber(false));
      assert.isFalse(validators.isNumber(NaN));
      assert.isFalse(validators.isNumber(Infinity));
      assert.isFalse(validators.isNumber([]));
      assert.isFalse(validators.isNumber({}));
      assert.isFalse(validators.isNumber(new Foo()));
      assert.isFalse(validators.isNumber(new Date()));
      assert.isFalse(validators.isNumber(/./));
      assert.isFalse(validators.isNumber(Foo));
    });
  });

  describe('isNotANumber', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isNotANumber(0));
      assert.isFalse(validators.isNotANumber(''));
      assert.isFalse(validators.isNotANumber(null));
      assert.isFalse(validators.isNotANumber(undefined));
      assert.isFalse(validators.isNotANumber(true));
      assert.isFalse(validators.isNotANumber(false));
      assert.isTrue(validators.isNotANumber(NaN));
      assert.isFalse(validators.isNotANumber(Infinity));
      assert.isFalse(validators.isNotANumber([]));
      assert.isFalse(validators.isNotANumber({}));
      assert.isFalse(validators.isNotANumber(new Foo()));
      assert.isFalse(validators.isNotANumber(new Date()));
      assert.isFalse(validators.isNotANumber(/./));
      assert.isFalse(validators.isNotANumber(Foo));
    });
  });

  describe('isInfinity', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isInfinity(0));
      assert.isFalse(validators.isInfinity(''));
      assert.isFalse(validators.isInfinity(null));
      assert.isFalse(validators.isInfinity(undefined));
      assert.isFalse(validators.isInfinity(true));
      assert.isFalse(validators.isInfinity(false));
      assert.isFalse(validators.isInfinity(NaN));
      assert.isTrue(validators.isInfinity(Infinity));
      assert.isFalse(validators.isInfinity([]));
      assert.isFalse(validators.isInfinity({}));
      assert.isFalse(validators.isInfinity(new Foo()));
      assert.isFalse(validators.isInfinity(new Date()));
      assert.isFalse(validators.isInfinity(/./));
      assert.isFalse(validators.isInfinity(Foo));
    });
  });

  describe('isString', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isString(0));
      assert.isTrue(validators.isString(''));
      assert.isFalse(validators.isString(null));
      assert.isFalse(validators.isString(undefined));
      assert.isFalse(validators.isString(true));
      assert.isFalse(validators.isString(false));
      assert.isFalse(validators.isString(NaN));
      assert.isFalse(validators.isString(Infinity));
      assert.isFalse(validators.isString([]));
      assert.isFalse(validators.isString({}));
      assert.isFalse(validators.isString(new Foo()));
      assert.isFalse(validators.isString(new Date()));
      assert.isFalse(validators.isString(/./));
      assert.isFalse(validators.isString(Foo));
    });
  });

  describe('isObject', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isObject(0));
      assert.isFalse(validators.isObject(''));
      assert.isFalse(validators.isObject(null));
      assert.isFalse(validators.isObject(undefined));
      assert.isFalse(validators.isObject(true));
      assert.isFalse(validators.isObject(false));
      assert.isFalse(validators.isObject(NaN));
      assert.isFalse(validators.isObject(Infinity));
      assert.isTrue(validators.isObject([]));
      assert.isTrue(validators.isObject({}));
      assert.isTrue(validators.isObject(new Foo()));
      assert.isTrue(validators.isObject(new Date()));
      assert.isTrue(validators.isObject(/./));
      assert.isTrue(validators.isObject(Foo));
    });
  });

  describe('isPlainObject', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isPlainObject(0));
      assert.isFalse(validators.isPlainObject(''));
      assert.isFalse(validators.isPlainObject(null));
      assert.isFalse(validators.isPlainObject(undefined));
      assert.isFalse(validators.isPlainObject(true));
      assert.isFalse(validators.isPlainObject(false));
      assert.isFalse(validators.isPlainObject(NaN));
      assert.isFalse(validators.isPlainObject(Infinity));
      assert.isFalse(validators.isPlainObject([]));
      assert.isTrue(validators.isPlainObject({}));
      assert.isFalse(validators.isPlainObject(new Foo()));
      assert.isFalse(validators.isPlainObject(new Date()));
      assert.isFalse(validators.isPlainObject(/./));
      assert.isFalse(validators.isPlainObject(Foo));
    });
  });

  describe('isArray', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isArray(0));
      assert.isFalse(validators.isArray(''));
      assert.isFalse(validators.isArray(null));
      assert.isFalse(validators.isArray(undefined));
      assert.isFalse(validators.isArray(true));
      assert.isFalse(validators.isArray(false));
      assert.isFalse(validators.isArray(NaN));
      assert.isFalse(validators.isArray(Infinity));
      assert.isTrue(validators.isArray([]));
      assert.isFalse(validators.isArray({}));
      assert.isFalse(validators.isArray(new Foo()));
      assert.isFalse(validators.isArray(new Date()));
      assert.isFalse(validators.isArray(/./));
      assert.isFalse(validators.isArray(Foo));
    });
  });

  describe('isRegExp', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isRegExp(0));
      assert.isFalse(validators.isRegExp(''));
      assert.isFalse(validators.isRegExp(null));
      assert.isFalse(validators.isRegExp(undefined));
      assert.isFalse(validators.isRegExp(true));
      assert.isFalse(validators.isRegExp(false));
      assert.isFalse(validators.isRegExp(NaN));
      assert.isFalse(validators.isRegExp(Infinity));
      assert.isFalse(validators.isRegExp([]));
      assert.isFalse(validators.isRegExp({}));
      assert.isFalse(validators.isRegExp(new Foo()));
      assert.isFalse(validators.isRegExp(new Date()));
      assert.isTrue(validators.isRegExp(/./));
      assert.isFalse(validators.isRegExp(Foo));
    });
  });

  describe('isDate', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isDate(0));
      assert.isFalse(validators.isDate(''));
      assert.isFalse(validators.isDate(null));
      assert.isFalse(validators.isDate(undefined));
      assert.isFalse(validators.isDate(true));
      assert.isFalse(validators.isDate(false));
      assert.isFalse(validators.isDate(NaN));
      assert.isFalse(validators.isDate(Infinity));
      assert.isFalse(validators.isDate([]));
      assert.isFalse(validators.isDate({}));
      assert.isFalse(validators.isDate(new Foo()));
      assert.isTrue(validators.isDate(new Date()));
      assert.isFalse(validators.isDate(/./));
      assert.isFalse(validators.isDate(Foo));
    });
  });

  describe('isFunction', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isFunction(0));
      assert.isFalse(validators.isFunction(''));
      assert.isFalse(validators.isFunction(null));
      assert.isFalse(validators.isFunction(undefined));
      assert.isFalse(validators.isFunction(true));
      assert.isFalse(validators.isFunction(false));
      assert.isFalse(validators.isFunction(NaN));
      assert.isFalse(validators.isFunction(Infinity));
      assert.isFalse(validators.isFunction([]));
      assert.isFalse(validators.isFunction({}));
      assert.isFalse(validators.isFunction(new Foo()));
      assert.isFalse(validators.isFunction(new Date()));
      assert.isFalse(validators.isFunction(/./));
      assert.isTrue(validators.isFunction(Foo));
    });
  });

  describe('isEmail', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isEmail(0));
      assert.isFalse(validators.isEmail(''));
      assert.isFalse(validators.isEmail(null));
      assert.isFalse(validators.isEmail(undefined));
      assert.isFalse(validators.isEmail(true));
      assert.isFalse(validators.isEmail(false));
      assert.isFalse(validators.isEmail(NaN));
      assert.isFalse(validators.isEmail(Infinity));
      assert.isFalse(validators.isEmail([]));
      assert.isFalse(validators.isEmail({}));
      assert.isFalse(validators.isEmail(new Foo()));
      assert.isFalse(validators.isEmail(new Date()));
      assert.isFalse(validators.isEmail(/./));
      assert.isFalse(validators.isEmail(Foo));

      assert.isTrue(validators.isEmail('test@example.com'));
    });
  });

  describe('isUppercase', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isUppercase(0));
      assert.isTrue(validators.isUppercase(''));
      assert.isFalse(validators.isUppercase(null));
      assert.isFalse(validators.isUppercase(undefined));
      assert.isFalse(validators.isUppercase(true));
      assert.isFalse(validators.isUppercase(false));
      assert.isFalse(validators.isUppercase(NaN));
      assert.isFalse(validators.isUppercase(Infinity));
      assert.isFalse(validators.isUppercase([]));
      assert.isFalse(validators.isUppercase({}));
      assert.isFalse(validators.isUppercase(new Foo()));
      assert.isFalse(validators.isUppercase(new Date()));
      assert.isFalse(validators.isUppercase(/./));
      assert.isFalse(validators.isUppercase(Foo));

      assert.isTrue(validators.isUppercase('A'));
      assert.isFalse(validators.isUppercase('a'));
    });
  });

  describe('isLowercase', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isLowercase(0));
      assert.isTrue(validators.isLowercase(''));
      assert.isFalse(validators.isLowercase(null));
      assert.isFalse(validators.isLowercase(undefined));
      assert.isFalse(validators.isLowercase(true));
      assert.isFalse(validators.isLowercase(false));
      assert.isFalse(validators.isLowercase(NaN));
      assert.isFalse(validators.isLowercase(Infinity));
      assert.isFalse(validators.isLowercase([]));
      assert.isFalse(validators.isLowercase({}));
      assert.isFalse(validators.isLowercase(new Foo()));
      assert.isFalse(validators.isLowercase(new Date()));
      assert.isFalse(validators.isLowercase(/./));
      assert.isFalse(validators.isLowercase(Foo));

      assert.isFalse(validators.isLowercase('A'));
      assert.isTrue(validators.isLowercase('a'));
    });
  });

  describe('isNotEmpty', () => {
    it('should correctly validate values', () => {
      assert.isFalse(validators.isNotEmpty(0));
      assert.isFalse(validators.isNotEmpty(''));
      assert.isFalse(validators.isNotEmpty(null));
      assert.isFalse(validators.isNotEmpty(undefined));
      assert.isFalse(validators.isNotEmpty(true));
      assert.isFalse(validators.isNotEmpty(false));
      assert.isFalse(validators.isNotEmpty(NaN));
      assert.isFalse(validators.isNotEmpty(Infinity));
      assert.isFalse(validators.isNotEmpty([]));
      assert.isFalse(validators.isNotEmpty({}));
      assert.isFalse(validators.isNotEmpty(new Foo()));
      assert.isFalse(validators.isNotEmpty(new Date()));
      assert.isFalse(validators.isNotEmpty(/./));
      assert.isFalse(validators.isNotEmpty(Foo));

      assert.isTrue(validators.isNotEmpty('A'));
      assert.isTrue(validators.isNotEmpty([1]));
      assert.isTrue(validators.isNotEmpty({ a: 1 }));
    });
  });

  describe('isEmpty', () => {
    it('should correctly validate values', () => {
      assert.isTrue(validators.isEmpty(0));
      assert.isTrue(validators.isEmpty(''));
      assert.isTrue(validators.isEmpty(null));
      assert.isTrue(validators.isEmpty(undefined));
      assert.isTrue(validators.isEmpty(true));
      assert.isTrue(validators.isEmpty(false));
      assert.isTrue(validators.isEmpty(NaN));
      assert.isTrue(validators.isEmpty(Infinity));
      assert.isTrue(validators.isEmpty([]));
      assert.isTrue(validators.isEmpty({}));
      assert.isTrue(validators.isEmpty(new Foo()));
      assert.isTrue(validators.isEmpty(new Date()));
      assert.isTrue(validators.isEmpty(/./));
      assert.isTrue(validators.isEmpty(Foo));

      assert.isFalse(validators.isEmpty('A'));
      assert.isFalse(validators.isEmpty([1]));
      assert.isFalse(validators.isEmpty({ a: 1 }));
    });
  });
});
