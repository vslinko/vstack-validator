import { assert } from 'chai';

import schema from '../../src/schema';
import Schema from '../../src/schema/Schema';

describe('field', () => {
  it('should return field schema', () => {
    const field = schema.field('name', {
      notNull: schema.isNotNull,
    });

    assert.deepPropertyVal(field, 'type', 'name');
    assert.deepPropertyVal(field, 'children', null);

    return field.check(null)
      .then((result) => {
        assert.deepPropertyVal(result, 'children.notNull.valid', false);
      });
  });
});

describe('fields', () => {
  it('should return map of fields', () => {
    const fields = schema.fields({
      name: {
        notNull: schema.isNotNull,
      },
    });

    assert.deepPropertyVal(fields, 'name.type', 'name');
    assert.deepPropertyVal(fields, 'name.children', null);

    return fields.name.check(null)
      .then((result) => {
        assert.deepPropertyVal(result, 'children.notNull.valid', false);
      });
  });
});

describe('object', () => {
  it('should return object schema', () => {
    const object = schema.object({
      name: {
        notNull: schema.isNotNull,
      },
    });

    assert.deepPropertyVal(object, 'type', 'object');
    assert.deepPropertyVal(object, 'children.name.type', 'name');
    assert.deepPropertyVal(object, 'children.name.children', null);

    return object.check({name: null})
      .then((result) => {
        assert.deepPropertyVal(result, 'children.name.children.notNull.valid', false);
      });
  });
});

describe('optional', () => {
  it('should return optional field', () => {
    const optional = schema.optional(schema.field('name', {
      isString: schema.isString,
    }));

    assert.deepPropertyVal(optional, 'type', 'optional(name)');
    assert.deepPropertyVal(optional, 'children.type', 'name');
    assert.deepPropertyVal(optional, 'children.children', null);

    return optional.check(null)
      .then((result) => {
        assert.deepPropertyVal(result, 'valid', true);
        assert.deepPropertyVal(result, 'children.isString.valid', false);
        assert.deepPropertyVal(result, 'children.isString.children', null);
      });
  });
});

describe('list', () => {
  it('should return list field', () => {
    const list = schema.list(schema.field('name', {
      isString: schema.isString,
    }));

    assert.deepPropertyVal(list, 'type', 'list(name)');
    assert.deepPropertyVal(list, 'children.type', 'name');
    assert.deepPropertyVal(list, 'children.children', null);

    return list.check([null])
      .then((result) => {
        assert.deepPropertyVal(result, 'valid', false);
        assert.deepPropertyVal(result, 'children.0.valid', false);
        assert.deepPropertyVal(result, 'children.0.children.isString.valid', false);
        assert.deepPropertyVal(result, 'children.0.children.isString.children', null);
      });
  });
});

describe('contextRoot', () => {
  it('should replace context value', () => {
    const contextRoot = schema.contextRoot(new Schema({
      type: 'test',
      check: (value, context) => {
        assert.deepPropertyVal(value, 'v', 1);
        assert.deepPropertyVal(context, 'value.v', 1);
        assert.deepPropertyVal(context, 'parent.v', 2);

        return Promise.resolve();
      },
      children: null,
    }));

    assert.deepPropertyVal(contextRoot, 'type', 'test');
    assert.deepPropertyVal(contextRoot, 'children', null);

    return contextRoot.check({v: 1}, {v: 2});
  });
});

describe('type', () => {
  it('should return type schema with own context', () => {
    const type = schema.type('user', {
      name: new Schema({
        type: 'name',
        check: (value, context) => {
          assert.deepPropertyVal(value, 'v', 1);
          assert.deepPropertyVal(context, 'value.name.v', 1);
          assert.deepPropertyVal(context, 'parent.v', 2);

          return Promise.resolve({
            valid: false,
          });
        },
        children: null,
      }),
    });

    assert.deepPropertyVal(type, 'type', 'user');
    assert.deepPropertyVal(type, 'children.name.type', 'name');
    assert.deepPropertyVal(type, 'children.name.children', null);

    return type.check({name: {v: 1}}, {v: 2})
      .then((result) => {
        assert.deepPropertyVal(result, 'children.name.valid', false);
      });
  });
});
