/* @flow */

import { schema } from '../src';
import betterLog from 'better-log';

const log = betterLog.setConfig({ depth: null });

const userSchema = schema.type('user', {
  email: {
    notEmpty: schema.constraint(schema.validators.isNotEmpty, 'Email is empty'),
    email: schema.constraint(schema.validators.isEmail, 'Email is not valid'),
  },
  password: schema.optional({
    notEmpty: schema.constraint(schema.validators.isNotEmpty, 'Password is empty'),
    minLength: schema.minLength(3, 'Password is less than 3'),
  }),
});

const itemSchema = schema.type('item', {
  name: {
    notEmpty: schema.constraint(schema.validators.isNotEmpty, 'Name is empty'),
  },
});

const cartSchema = schema.type('cart', {
  user: userSchema,
  items: schema.list(itemSchema),
});

log(cartSchema);

cartSchema
  .check({
    user: {
      email: '',
      password: '',
    },
    items: [
      { name: '' },
    ],
  })
  .then(log, log);
