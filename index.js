'use strict';

module.exports = {
  name: require('./package').name,

  createDocsGenerator(inputTree, options) {
    let YuiDocGenerator = require('./lib/broccoli/generator');

    return new YuiDocGenerator([inputTree], options);
  }
};
