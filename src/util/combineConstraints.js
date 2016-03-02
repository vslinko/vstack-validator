/* @flow */

import type {
  ConstraintMap,
  Constraint,
  ErrorMessage,
} from '../types';

import executeMessage from './executeMessage';

export default function combineConstraints(
  constraints: ConstraintMap,
  message: ?ErrorMessage = null
): Constraint {
  const keys = Object.keys(constraints);

  return (value, context) => (
    Promise
      .all(keys.map(key => constraints[key](value, context)))
      .then((values) => {
        const children = keys.reduce((acc, key, index) => (
          acc[key] = values[index],
          acc
        ), {});

        const valid = keys.every(key => children[key].valid);

        return {
          valid,
          message: valid
            ? null
            : executeMessage(value, context, children, message || 'Value is not valid'),
          children,
        };
      })
  );
}
