/* @flow */

import type {
  Validator,
  Constraint,
  ErrorMessage,
} from '../types';

import executeMessage from './executeMessage';

export default function createConstraint(
  validator: Validator,
  message: ?ErrorMessage = null
): Constraint {
  return (value, context) => (
    Promise.resolve(validator(value))
      .then((valid) => ({
        valid,
        message: valid
          ? null
          : executeMessage(value, context, null, message || 'Value is not valid'),
        children: null,
      }))
  );
}
