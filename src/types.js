/* @flow */

import Schema from './schema/Schema';

export type Validator = (value: any) => boolean | Promise<boolean>;

export type Constraint = (value: any, context: any) => Promise<ConstraintResult>;

export type ConstraintResult = {
  valid: boolean,
  message: ?string,
  children: ?ConstraintChildren
};
export type ConstraintChildren = ConstraintResultMap | ConstraintResultArray | ConstraintResult
export type ConstraintResultMap = { [key: string]: ConstraintResult };
export type ConstraintResultArray = Array<ConstraintResult>;

export type ErrorMessage = string | (value: any, children: ?ConstraintChildren) => string;

export type ConstraintMap = { [key: string]: Constraint };
export type Field = ConstraintMap | Schema;
export type FieldMap = { [key: string]: Field };
export type SchemaMap = { [key: string]: Schema };
