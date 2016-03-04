/* @flow */

import { schema } from '../src';
import Schema from '../src/schema/Schema';
import betterLog from 'better-log';

const log = betterLog.setConfig({ depth: null });

const data = {
  title: 'some title',
  items: [
    { type: 'a', foo: 'foo', bar: 'bar' },
    { type: 'b', baz: 'baz' },
  ],
};

function conditionalSchema({ hash, mapping }) {
  return new Schema({
    type: 'conditional',
    check: (value, context) => (
      mapping[hash(value)].check(value, context)
    ),
    children: mapping,
  });
}

const dataSchema = schema.type('data', {
  title: {
    notEmpty: schema.isNotEmpty,
  },
  items: schema.list(conditionalSchema({
    hash: (item) => String(item.type),
    mapping: {
      a: schema.type('a', {
        foo: {
          notEmpty: schema.isNotEmpty,
        },
        bar: {
          notEmpty: schema.isNotEmpty,
        },
      }),
      b: schema.type('b', {
        baz: {
          notEmpty: schema.isNotEmpty,
        },
      }),
    },
  })),
});

log(dataSchema);
dataSchema.check(data)
  .then((result) => {
    log(result);
  });
