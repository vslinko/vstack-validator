/* @flow */

import type {
  Constraint,
} from '../types';

type SchemaChildren = ?({[key: string]: Schema} | Array<Schema> | Schema);
type SchemaOptions = {type: string, check: Constraint, children: SchemaChildren};

class Schema {
  type: string;
  check: Constraint;
  children: SchemaChildren;

  constructor({ type, check, children }: SchemaOptions) {
    this.type = type;
    this.check = (value, context) => check(value, context || value);
    this.children = children;
  }
}

export default Schema;
