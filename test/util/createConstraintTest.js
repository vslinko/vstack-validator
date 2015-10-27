import {assert} from 'chai';

import createConstraint from '../../src/util/createConstraint';

describe('createConstraint', () => {
  var constraint = createConstraint(
    value => value === 'test'
  );
  var constraintWithCustomErrorMessage = createConstraint(
    value => value === 'test',
    'Custom Error Message'
  );

  it('should return valid constraint result when value is valid', () => {
    return constraint('test')
      .then((result) => {
        assert.deepEqual(
          result,
          { valid: true, message: null, children: null }
        );
      });
  });

  it('should return valid constraint result when value is invalid', () => {
    return constraint('')
      .then((result) => {
        assert.deepEqual(
          result,
          { valid: false, message: 'Value is not valid', children: null }
        );
      });
  });

  it('should use custom error message', () => {
    return constraintWithCustomErrorMessage('')
      .then((result) => {
        assert.deepEqual(
          result,
          { valid: false, message: 'Custom Error Message', children: null }
        );
      });
  });
});
