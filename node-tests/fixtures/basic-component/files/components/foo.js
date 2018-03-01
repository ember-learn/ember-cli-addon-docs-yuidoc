/**
  A foo class

  @class Foo
  @yield {Hash} bar
  @yield {Component} bar.baz
  @public
*/
export default class Foo {
  /**
    An argument named foo

    @argument foo
    @type {number}
    @default 123
  */
  foo = 123;

  /**
    A property named bar with a tag

    @taggg
    @field bar
    @type string
    @default '123'
  */
  bar = '123';

  /**
    An acccesor named baz

    @computed baz
    @type any
  */
  get baz() {
    return this._baz;
  }

  set baz(val) {
    this._baz = val;
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
    An action named qux

    @action qux
    @param {Object} foo - a foo object
  */
  qux(foo) {
    return foo.bar;
  }
}
