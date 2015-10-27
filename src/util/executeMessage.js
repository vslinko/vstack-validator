/* @flow */

import type {
  ErrorMessage,
  ConstraintChildren,
} from '../types';

export default function executeMessage(value: any, context: any, children: ?ConstraintChildren, message: ErrorMessage): string {
  return typeof message === 'function'
    ? message(value, context, children)
    : message;
}
