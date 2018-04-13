'use strict';

const _ = require('lodash');

const Module = require('../models/module');

const Class = require('../models/classes').Class;
const Component = require('../models/classes').Component;

const Function = require('../models/functions').Function;
const Method = require('../models/functions').Method;

const Variable = require('../models/variables').Variable;
const Field = require('../models/variables').Field;
const Argument = require('../models/variables').Argument;
const Accessor = require('../models/variables').Accessor;

const generateYuiDoc = require('./generate-yuidoc');
const Serializer = require('../serializers/main');

function resolveParentClass(klasses, klass, ui) {
  let matches = Object.keys(klasses).filter(k => k.includes(klass.extends));

  if (matches.length === 1) {
    return matches[0];
  } else if (matches.length === 1) {
    ui.writeWarnLine(`Attempted to match extends for ${klass.shortname}, but found multiple values for parent class ${klass.extends}. Try providing the full class identifier ({path}~{name}).`);
  }

  return klass.extends;
}

module.exports = function generateYuiDocJsonApi(inputPaths, project) {
  let document = generateYuiDoc(inputPaths, project);

  let modules = {};
  let klasses = {};

  for (let file in document.files) {
    modules[file] = new Module(document.files[file]);
  }

  for (let id in document.classes) {
    let doc = document.classes[id];
    let module = modules[doc.file];

    if (doc.extends) {
      doc.extends = resolveParentClass(klasses, doc, project.ui);
    }

    if (Component.detect(doc)) {
      let klass = new Component(doc);
      module.components.push(klass);
      klasses[klass.id] = klass;

    } else {
      let klass = new Class(doc);
      module.classes.push(klass);
      klasses[klass.id] = klass;

    }
  }

  for (let item of document.classitems) {
    let module = modules[item.file];
    let klass = klasses[item.class];

    if (Method.detect(item)) {
      klass.methods.push(new Method(item));

    } else if (Accessor.detect(item)) {
      klass.accessors.push(new Accessor(item));

    } else if (Argument.detect(item)) {
      klass.arguments.push(new Argument(item));

    } else if (Field.detect(item)) {
      klass.fields.push(new Field(item));

    } else if (Function.detect(item)) {
      module.functions.push(new Function(item));

    } else if (Variable.detect(item)) {
      module.variables.push(new Variable(item));
    }
  }

  let includedModules = [];

  for (let id in modules) {
    includedModules.push(modules[id]);
  }

  return Serializer.serialize('module', _.sortBy(includedModules, ['id']))
}
