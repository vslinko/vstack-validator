/* @flow */

import type {
  ConstraintMap,
  Constraint,
  ErrorMessage,
} from '../types';

import executeMessage from './executeMessage';

export default function createObjectConstraint(constraints: ConstraintMap, message: ?ErrorMessage = null): Constraint {
  var keys = Object.keys(constraints);

  return (value, context) => {
    if (!value || typeof value !== 'object') {
      return Promise.resolve({
        valid: false,
        message: executeMessage(value, context, [], message || 'Object is not valid'),
        children: {},
      });
    }

    return Promise
      .all(keys.map(key => constraints[key](value[key], context)))
      .then((values) => {
        var children = keys.reduce((acc, key, index) => (
          acc[key] = values[index],
          acc
        ), {});

        var valid = keys.every(key => children[key].valid);

        return {
          valid,
          message: valid ? null : executeMessage(value, context, children, message || 'Object is not valid'),
          children,
        };
      });
  };
}
