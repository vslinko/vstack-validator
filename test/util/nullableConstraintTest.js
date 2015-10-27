import {assert} from 'chai';

import createConstraint from '../../src/util/createConstraint';
import nullableConstraint from '../../src/util/nullableConstraint';

describe('nullableConstraint', () => {
  var constraint = nullableConstraint(
    createConstraint(() => false, 'Error1')
  );

  it('should return child constraint result if value is not null', () => {
    return constraint('')
      .then((result) => {
        assert.deepEqual(result, {
          valid: false,
          message: 'Error1',
          children: null,
        });
      });
  });

  it('should override child constraint result if value is null', () => {
    return constraint(null)
      .then((result) => {
        assert.deepEqual(result, {
          valid: true,
          message: null,
          children: null,
        });
      });
  });
});
