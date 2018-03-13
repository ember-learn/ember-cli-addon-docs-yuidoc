'use strict';

const recognizedAttrs = {
  access: true,
  argument: true,
  async: true,
  class: true,
  classitems: true,
  description: true,
  default: true,
  export: true,
  extends: true,
  extension_for: true,
  extensions: true,
  file: true,
  generator: true,
  get: true,
  interface: true,
  itemtype: true,
  line: true,
  module: true,
  name: true,
  namespace: true,
  params: true,
  plugin_for: true,
  plugins: true,
  return: true,
  set: true,
  shortname: true,
  static: true,
  tagname: true,
  type: true,
  yields: true
}

class Document {
  constructor(doc) {
    this.name = doc.shortname || doc.name;
    this.file = doc.file;
    this.description = doc.description;
    this.lineNumber = doc.line;
    this.access = doc.access || 'public';
    this.tags = [];

    // Clean up type tag if it exists
    // doc.type = (doc.type || '').replace(/^{|}$/g, '');

    for (let key in doc) {
      if (!(key in recognizedAttrs)) {
        this.tags.push({ name: key, value: doc[key] });
      }
    }
  }
}

module.exports = Document;
