/**
  @class Foo
  @export named
*/

export class Foo {

}

/**
  @function foo
  @export default
  @param {string} bar a bar string
  @param {number} baz a baz number
  @return {string}
*/
export default function foo(bar, baz) {
  return bar + baz;
}

/**
  @function bar
  @return {Array<boolean>}
*/
export function bar() {
  return [true];
}

/**
  @variable baz
  @type number
*/
export const baz = 123;

/**
  @const qux
  @type string
*/
export const qux = '123';

/**
  @constant quux
  @type boolean
*/
export const quux = true;
