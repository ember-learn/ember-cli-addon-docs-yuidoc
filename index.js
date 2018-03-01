'use strict';

module.exports = {
  name: 'ember-cli-addon-docs-yuidoc',

  createDocsGenerator(inputTree, options) {
    let YuiDocGenerator = require('./lib/broccoli/generator');

    return new YuiDocGenerator([inputTree], options);
  }
};
