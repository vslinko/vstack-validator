import { assert } from 'chai';

import * as constraints from '../src/constraints';

function tests({ name, constraint, validValues, invalidValues, message }) {
  describe(name, () => {
    it('should return valid constraint result when value is valid', () => (
      Promise.all(validValues.map((validValue) => (
        constraint(validValue)
          .then((result) => {
            assert.deepEqual(result, {
              valid: true,
              message: null,
              children: null,
            });
          })
      )))
    ));

    it('should return valid constraint result when value is invalid', () => (
      Promise.all(invalidValues.map((invalidValue) => (
        constraint(invalidValue)
          .then((result) => {
            assert.deepEqual(result, {
              valid: false,
              message,
              children: null,
            });
          })
      )))
    ));
  });
}

describe('constraints', () => {
  function Foo() {}

  tests({
    name: 'isNotNull',
    constraint: constraints.isNotNull,
    validValues: [0],
    invalidValues: [null, undefined],
    message: 'Value is null or undefined',
  });

  tests({
    name: 'isNull',
    constraint: constraints.isNull,
    validValues: [null, undefined],
    invalidValues: [0],
    message: 'Value is neither null nor undefined',
  });

  tests({
    name: 'isBoolean',
    constraint: constraints.isBoolean,
    validValues: [true, false],
    invalidValues: [0],
    message: 'Value is not boolean',
  });

  tests({
    name: 'isTrue',
    constraint: constraints.isTrue,
    validValues: [true],
    invalidValues: [0, false],
    message: 'Value is not true',
  });

  tests({
    name: 'isFalse',
    constraint: constraints.isFalse,
    validValues: [false],
    invalidValues: [0, true],
    message: 'Value is not false',
  });

  tests({
    name: 'isNumber',
    constraint: constraints.isNumber,
    validValues: [0, 1.0],
    invalidValues: [null],
    message: 'Value is not number',
  });

  tests({
    name: 'isNotANumber',
    constraint: constraints.isNotANumber,
    validValues: [NaN],
    invalidValues: [0, 1.0, null],
    message: 'Value is not NaN',
  });

  tests({
    name: 'isInfinity',
    constraint: constraints.isInfinity,
    validValues: [Infinity],
    invalidValues: [NaN, 0, 1.0, null],
    message: 'Value is not infinity',
  });

  tests({
    name: 'isString',
    constraint: constraints.isString,
    validValues: [''],
    invalidValues: [NaN, 0, 1.0, null],
    message: 'Value is not string',
  });

  tests({
    name: 'isObject',
    constraint: constraints.isObject,
    validValues: [{}, new Foo()],
    invalidValues: [NaN, 0, 1.0, null],
    message: 'Value is not object',
  });

  tests({
    name: 'isPlainObject',
    constraint: constraints.isPlainObject,
    validValues: [{}],
    invalidValues: [NaN, 0, 1.0, null, new Foo()],
    message: 'Value is not plain object',
  });

  tests({
    name: 'isArray',
    constraint: constraints.isArray,
    validValues: [[]],
    invalidValues: [{}, NaN, 0, 1.0, null, new Foo()],
    message: 'Value is not array',
  });

  tests({
    name: 'isRegExp',
    constraint: constraints.isRegExp,
    validValues: [/./],
    invalidValues: [[], {}, NaN, 0, 1.0, null, new Foo()],
    message: 'Value is not regular expression',
  });

  tests({
    name: 'isDate',
    constraint: constraints.isDate,
    validValues: [new Date()],
    invalidValues: [[], {}, NaN, 0, 1.0, null, new Foo()],
    message: 'Value is not date',
  });

  tests({
    name: 'isFunction',
    constraint: constraints.isFunction,
    validValues: [Foo],
    invalidValues: [[], {}, NaN, 0, 1.0, null, new Foo()],
    message: 'Value is not function',
  });

  tests({
    name: 'createRegExpConstraint',
    constraint: constraints.createRegExpConstraint(/z/),
    validValues: ['z'],
    invalidValues: [[], {}, NaN, 0, 1.0, null, new Foo()],
    message: 'Value is not matched by pattern',
  });

  tests({
    name: 'createRegExpConstraint',
    constraint: constraints.createRegExpConstraint(/a/, 'a'),
    validValues: ['a'],
    invalidValues: ['z', [], {}, NaN, 0, 1.0, null, new Foo()],
    message: 'a',
  });

  tests({
    name: 'isEmail',
    constraint: constraints.isEmail,
    validValues: ['text@example.com'],
    invalidValues: ['', [], {}, NaN, 0, 1.0, null, new Foo()],
    message: 'Value is not valid email address',
  });

  tests({
    name: 'isUppercase',
    constraint: constraints.isUppercase,
    validValues: ['', 'A'],
    invalidValues: ['a', [], {}, NaN, 0, 1.0, null, new Foo()],
    message: 'Value has symbols not in uppercase',
  });

  tests({
    name: 'isLowercase',
    constraint: constraints.isLowercase,
    validValues: ['', 'a'],
    invalidValues: ['A', [], {}, NaN, 0, 1.0, null, new Foo()],
    message: 'Value has symbols not in lowercase',
  });

  tests({
    name: 'createMinConstraint',
    constraint: constraints.createMinConstraint(10),
    validValues: [11, 10],
    invalidValues: [9, 0, -9],
    message: 'Value is less than 10',
  });

  tests({
    name: 'createMinConstraint',
    constraint: constraints.createMinConstraint('c', 'x'),
    validValues: ['d', 'e'],
    invalidValues: ['a', 'b'],
    message: 'x',
  });

  tests({
    name: 'createMaxConstraint',
    constraint: constraints.createMaxConstraint(10),
    validValues: [10, 9, 0, -9],
    invalidValues: [11],
    message: 'Value is more than 10',
  });

  tests({
    name: 'createMaxConstraint',
    constraint: constraints.createMaxConstraint('c', 'x'),
    validValues: ['a', 'b'],
    invalidValues: ['d', 'e'],
    message: 'x',
  });

  tests({
    name: 'isNotEmpty',
    constraint: constraints.isNotEmpty,
    validValues: ['a', [1]],
    invalidValues: ['', []],
    message: 'Value is empty',
  });

  tests({
    name: 'isEmpty',
    constraint: constraints.isEmpty,
    validValues: ['', []],
    invalidValues: ['a', [1]],
    message: 'Value is not empty',
  });

  tests({
    name: 'createMinLengthConstraint',
    constraint: constraints.createMinLengthConstraint(2),
    validValues: ['abc', 'yz', [1, 2, 3], [-1, 0]],
    invalidValues: ['a', [1]],
    message: 'Value length is less than 2',
  });

  tests({
    name: 'createMinLengthConstraint',
    constraint: constraints.createMinLengthConstraint(2, 'x'),
    validValues: ['abc', 'yz', [1, 2, 3], [-1, 0]],
    invalidValues: ['a', [1]],
    message: 'x',
  });

  tests({
    name: 'createMaxLengthConstraint',
    constraint: constraints.createMaxLengthConstraint(2),
    validValues: ['a', [1], 'yz', [-1, 0]],
    invalidValues: ['abc', [1, 2, 3]],
    message: 'Value length is more than 2',
  });

  tests({
    name: 'createMaxLengthConstraint',
    constraint: constraints.createMaxLengthConstraint(2, 'x'),
    validValues: ['a', [1], 'yz', [-1, 0]],
    invalidValues: ['abc', [1, 2, 3]],
    message: 'x',
  });
});
