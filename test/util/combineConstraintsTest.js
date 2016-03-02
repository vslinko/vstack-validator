import { assert } from 'chai';

import createConstraint from '../../src/util/createConstraint';
import combineConstraints from '../../src/util/combineConstraints';

describe('combineConstraints', () => {
  const constraint = combineConstraints({
    e1: createConstraint(value => value === 'test', 'Error1'),
    e2: createConstraint(value => value === 'test', 'Error2'),
  });
  const constraintWithCustomErrorMessage = combineConstraints({
    e1: createConstraint(value => value === 'test', 'Error1'),
    e2: createConstraint(value => value === 'test', 'Error2'),
  }, 'Custom Error Message');

  it('should return valid constraint result when value is valid', () => {
    return constraint('test')
      .then((result) => {
        assert.deepEqual(result, {
          valid: true,
          message: null,
          children: {
            e1: {
              valid: true,
              message: null,
              children: null,
            },
            e2: {
              valid: true,
              message: null,
              children: null,
            },
          },
        });
      });
  });

  it('should return valid constraint result when value is invalid', () => {
    return constraint('')
      .then((result) => {
        assert.deepEqual(result, {
          valid: false,
          message: 'Value is not valid',
          children: {
            e1: {
              valid: false,
              message: 'Error1',
              children: null,
            },
            e2: {
              valid: false,
              message: 'Error2',
              children: null,
            },
          },
        });
      });
  });

  it('should return use custom error message', () => {
    return constraintWithCustomErrorMessage('')
      .then((result) => {
        assert.deepEqual(result, {
          valid: false,
          message: 'Custom Error Message',
          children: {
            e1: {
              valid: false,
              message: 'Error1',
              children: null,
            },
            e2: {
              valid: false,
              message: 'Error2',
              children: null,
            },
          },
        });
      });
  });
});
