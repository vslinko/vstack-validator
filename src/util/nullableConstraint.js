/* @flow */

import type {
  Constraint,
} from '../types';

import {
  isNull,
} from '../validators';

export default function nullableConstraint(constraint: Constraint): Constraint {
  return (value, context) => {
    return constraint(value, context)
      .then((children) => {
        var valueIsNull = isNull(value);

        return {
          valid: valueIsNull ? true : children.valid,
          message: valueIsNull ? null : children.message,
          children: children.children,
        };
      });
  };
}
