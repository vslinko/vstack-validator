# vstack-validator

> Declarative validator for complex deep structures

## Intro

Validator is a simple function that receives a value and returns boolean result
of validation. Validator could be asynchronous.

```js
type Validator = (value: any) => boolean | Promise<boolean>
```

Constraint is a function that receives a value and returns validation metadata.
Constraint should be asynchronous.

```js
type Constraint = (value: any, context: any) => Promise<ConstraintResult>

type ConstraintResult = {
  valid: boolean,
  message: string | void,
  children: ConstraintResultMap | ConstraintResultArray | void
}

type ConstraintResultMap = {
  [key: string]: ConstraintResult
}

type ConstraintResultArray = Array<ConstraintResult>
```

Schema is a declaration of constraints tree.

```js
class Schema {
  type: string;
  check: Constraint;
  children: SchemaChildren;
}

type SchemaChildren = ?({[key: string]: Schema} | Array<Schema> | Schema);
```

## Usage

```js
import {schema} from '../src';

var userSchema = schema.type('user', {
  email: {
    notEmpty: schema.constraint(schema.validators.isNotEmpty, 'Email is empty'),
    email: schema.constraint(schema.validators.isEmail, 'Email is not valid'),
  },
  password: schema.optional({
    notEmpty: schema.constraint(schema.validators.isNotEmpty, 'Password is empty'),
    minLength: schema.minLength(3, 'Password is less than 3'),
  }),
});

var itemSchema = schema.type('item', {
  name: {
    notEmpty: schema.constraint(schema.validators.isNotEmpty, 'Name is empty'),
  },
});

var cartSchema = schema.type('cart', {
  user: userSchema,
  items: schema.list(itemSchema),
});

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
  .then((constraintResult) => console.log(constraintResult));
```

```
{ valid: false,
  message: 'Object is not valid',
  children:
   { user:
      { valid: false,
        message: 'Object is not valid',
        children:
         { email:
            { valid: false,
              message: 'Value is not valid',
              children:
               { notEmpty: { valid: false, message: 'Email is empty', children: null },
                 email: { valid: false, message: 'Email is not valid', children: null } } },
           password:
            { valid: false,
              message: 'Value is not valid',
              children:
               { notEmpty: { valid: false, message: 'Password is empty', children: null },
                 minLength:
                  { valid: false,
                    message: 'Password is less than 3',
                    children: null } } } } },
     items:
      { valid: false,
        message: 'Array is not valid',
        children:
         [ { valid: false,
             message: 'Object is not valid',
             children:
              { name:
                 { valid: false,
                   message: 'Value is not valid',
                   children: { notEmpty: { valid: false, message: 'Name is empty', children: null } } } } } ] } } }
```
