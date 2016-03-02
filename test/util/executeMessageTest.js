import { assert } from 'chai';

import executeMessage from '../../src/util/executeMessage';

describe('executeMessage', () => {
  it('should return message if message is string', () => {
    assert.equal(
      executeMessage('value', 'context', 'children', 'test'),
      'test'
    );
  });

  it('should call message if message is function', () => {
    assert.equal(
      executeMessage(
        'value',
        'context',
        'children',
        (value, context, children) => value + context + children
      ),
      'valuecontextchildren'
    );
  });
});
