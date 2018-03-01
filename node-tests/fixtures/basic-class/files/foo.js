/**
  A foo class

  @class Foo
  @anArbitraryTag
  @public
*/
export default class Foo {
  /**
    A field named foo

    @field foo
    @type number
  */
  foo = 123;

  /**
    A property named bar with a tag

    @taggg
    @property bar
    @type string
  */
  bar = '123';

  /**
    An acccesor named baz

    @accessor baz
    @type any
  */
  get baz() {
    return this._baz;
  }

  set baz(val) {
    this._baz = val;
  }

  /**
    An accessor without a setter named qux

    @accessor qux
    @set false
    @type boolean
  */
  get qux() {
    return true;
  }

  /**
    A readonly accessor named quux with a tag

    @taggg 123
    @accessor quux
    @readOnly
    @type number
  */
  get quux() {
    return 123;
  }

  /**
    A set only accessor named quux

    @accessor quuz
    @get false
    @type any
  */
  set quuz(val) {
    this._quuz = val;
  }

  /**
    A method named corge with a tag

    @taggg
    @method corge
    @param {string} foo - a foo param
    @param {number} bar - a bar param
    @return {string} - the corge return value
  */
  corge(foo, bar) {
    return foo + bar;
  }
}
