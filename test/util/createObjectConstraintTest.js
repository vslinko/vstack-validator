import {assert} from 'chai';

import createConstraint from '../../src/util/createConstraint';
import createObjectConstraint from '../../src/util/createObjectConstraint';

describe('createObjectConstraint', () => {
  var constraint = createObjectConstraint({
    e1: createConstraint(value => value === 'test', 'Error1'),
    e2: createConstraint(value => value === 'test', 'Error2'),
  });
  var constraintWithCustomErrorMessage = createObjectConstraint({
    e1: createConstraint(value => value === 'test', 'Error1'),
    e2: createConstraint(value => value === 'test', 'Error2'),
  }, 'Custom Error Message');

  it('should check value for type', () => {
    return constraint()
      .then((result) => {
        assert.deepEqual(result, {
          valid: false,
          message: 'Object is not valid',
          children: {},
        });
      });
  });

  it('should return valid constraint result when value is valid', () => {
    return constraint({e1: 'test', e2: 'test'})
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
    return constraint({e1: 'test', e2: ''})
      .then((result) => {
        assert.deepEqual(result, {
          valid: false,
          message: 'Object is not valid',
          children: {
            e1: {
              valid: true,
              message: null,
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
    return constraintWithCustomErrorMessage({e1: '', e2: ''})
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
