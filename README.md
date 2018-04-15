ember-cli-addon-docs-yuidoc
==============================================================================

[YUIDoc](https://github.com/yui/yuidoc) plugin for Ember CLI Addon Docs. This
plugin adds automatic API documentation to your addon through a modified
version of YUIDoc with support for:

* Modules
* Plain, non-class functions and constants
* Classes
  * Added support for accessors and fields
* Components (including arguments and yields)
* Helper functions
* Markdown in comments

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-addon-docs-yuidoc
```


Usage
------------------------------------------------------------------------------

### Documenting a Class

You can document classes using standard YUIDoc syntax with a few modifications

* You can use `@field` as an alias for `@property`
* You can use `@accessor` to reference a native getter/setter, or `@computed`
for an Ember computed. These document the same, but `@computed` assumes a
setter exists, whereas `@accessor` requires you to add the `@set` tag.
* You can add `@static`, `@async`, and `@generator` modifiers to methods

```js
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
    An accessor named baz

    @accessor baz
    @type any
    @set
  */
  get bar() {
    return this._baz;
  }

  set bar(val) {
    this._baz = val;
  }

  /**
    A static async method named grault

    @method grault
    @static
    @async
  */
  static async baz() {
    // ...
  }
}
```

### Documenting Components

Components can be documented the same as classes, and will be automatically
detected based on folder structure. They also have two extra types of
properties:

* `@yield` which must be applied to the class itself
* `@argument` which is meant to represent an argument passed into the
component

```js
/**
  A foo-bar component. Usage:

  ```hbs
    {{#foo-bar baz=123 as |hash|}}

    {{/foo-bar}}
  ```

  @class FooBarComponent
  @yield {Hash} hash
  @yield {number} hash.foo
*/
export default Ember.Component.extend({
  /**
    @argument baz
    @type {number}
  */
  baz: -1
});
```

### Documenting Modules

Modules will automatically be detected - no need to use `@module`. You can use
the following tags:

* `@function` documents plain functions
* `@variable`, `@const`, or `@constant` documents variable values
* `@export [named|default]` specifies the export type
  * Classes are considered the default export unless specified otherwise,
  functions and variables are considered named unless specified otherwwise.

```js
/**
  @class Foo
  @export named
*/
export class Foo {}

/**
  @function bar
  @export default
*/
export default function bar() {}

/**
  @const baz
  @type {number}
*/
export const baz = 123;
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-cli-addon-docs-yuidoc`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `yarn test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
