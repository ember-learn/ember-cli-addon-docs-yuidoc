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
    A static property named bar with a tag

    @taggg
    @static
    @property bar
    @type string
  */
  static bar = '123';

  /**
    An accessor named baz

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
    A static accessor named baz

    @accessor baz
    @static
    @type any
  */
  static get baz() {
    return this._bazzz;
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

  /**
    A static async method named grault

    @method grault
    @static
    @async
  */
  static async grault(foo, bar) {
    return foo + bar;
  }

  /**
    A generator method named garply

    @method garply
    @generator
  */
  *garply(foo, bar) {
    yield foo + bar;
  }
}
