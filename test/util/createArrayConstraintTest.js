import { assert } from 'chai';

import createConstraint from '../../src/util/createConstraint';
import createArrayConstraint from '../../src/util/createArrayConstraint';

describe('createArrayConstraint', () => {
  const constraint = createArrayConstraint(
    createConstraint((value) => value === 'test', 'Error1')
  );
  const constraintWithCustomErrorMessage = createArrayConstraint(
    createConstraint((value) => value === 'test', 'Error1'),
    'Custom Error Message'
  );

  it('should check value for type', () => {
    return constraint()
      .then((result) => {
        assert.deepEqual(result, {
          valid: false,
          message: 'Array is not valid',
          children: [],
        });
      });
  });

  it('should check every value in array', () => {
    return constraint(['test', 'not-test'])
      .then((result) => {
        assert.deepEqual(result, {
          valid: false,
          message: 'Array is not valid',
          children: [
            {
              valid: true,
              message: null,
              children: null,
            },
            {
              valid: false,
              message: 'Error1',
              children: null,
            },
          ],
        });
      });
  });

  it('should use custom error message', () => {
    return constraintWithCustomErrorMessage(['test', 'not-test'])
      .then((result) => {
        assert.deepEqual(result, {
          valid: false,
          message: 'Custom Error Message',
          children: [
            {
              valid: true,
              message: null,
              children: null,
            },
            {
              valid: false,
              message: 'Error1',
              children: null,
            },
          ],
        });
      });
  });
});
