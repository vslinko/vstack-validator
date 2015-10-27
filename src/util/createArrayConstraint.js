/* @flow */

import type {
  Constraint,
  ErrorMessage,
} from '../types';

import executeMessage from './executeMessage';
import { isArray } from '../validators';

export default function createArrayConstraint(constraint: Constraint, message: ?ErrorMessage = null): Constraint {
  return (value, context) => {
    if (!isArray(value)) {
      return Promise.resolve({
        valid: false,
        message: executeMessage(value, context, [], message || 'Array is not valid'),
        children: [],
      });
    }

    return Promise
      .all(value.map((valueItem) => constraint(valueItem, context)))
      .then((children) => {
        var valid = children.every(child => child.valid);

        return {
          valid,
          message: valid ? null : executeMessage(value, context, children, message || 'Array is not valid'),
          children,
        };
      });
  };
}
