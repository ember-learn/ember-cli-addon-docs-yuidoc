'use strict';

const Y = require('yuidocjs');

const YUIDoc = Y.YUIDoc;
const DIGESTERS = Y.DocParser.DIGESTERS;
const TAGLIST = Y.DocParser.TAGLIST;

// Aliases
TAGLIST.push('accessor');
TAGLIST.push('action');
TAGLIST.push('computed');
TAGLIST.push('const');
TAGLIST.push('constant');
TAGLIST.push('field');
TAGLIST.push('function');
TAGLIST.push('variable');

// New types
TAGLIST.push('yield');
TAGLIST.push('argument');
TAGLIST.push('export');

const classDigest = DIGESTERS.class;
const paramDigest = DIGESTERS.param;
const propertyDigest = DIGESTERS.property;
const methodDigest = DIGESTERS.method;

DIGESTERS.const = propertyDigest;
DIGESTERS.constant = propertyDigest;
DIGESTERS.field = propertyDigest;
DIGESTERS.variable = propertyDigest;
DIGESTERS.computed = propertyDigest;
DIGESTERS.accessor = propertyDigest;

DIGESTERS.action = methodDigest;
DIGESTERS.argument = methodDigest;
DIGESTERS.function = methodDigest;

DIGESTERS.class = function(tagname, value, target, block) {
  return classDigest.call(this, tagname, `${target.file}~${value}`, target, block);
}

DIGESTERS.yield = function(tagname, value, target, block) {
  target.yields = target.yields || [];
  let fakeTarget = { params: target.yields };

  return paramDigest.call(this, tagname, value, fakeTarget, block);
}

function normalizePath(path, inputPathRegex) {
  path = path.replace(inputPathRegex, '');

  // if the path now starts with a slash or backslash, it
  // must be removed (because it's a relative path now)
  if (path.startsWith('/') || path.startsWith('\\')) {
    path = path.slice(1);
  }

  // we now have a windows or unix style path, but relative
  // so it's safe to convert to unix style paths at this point
  // (they will work on windows too)
  path = path.replace(/\\/g, '/');

  // remove index.js and .js extensions from the end of paths
  path = path.replace(/(\/index)?\.js/, '');

  return path;
}

function normalizePaths(document, inputPaths) {
  // replace single backslashes with double backslashes (because they would be
  // regex escape characters), then create a single regex out of all paths.
  let inputPath = new RegExp(inputPaths.map(i => i.replace(/\\/g, '\\\\')).join('|'));

  for (let path in document.files) {
    let normalizedPath = normalizePath(path, inputPath);
    let file = document.files[path];

    file.name = normalizedPath;

    document.files[normalizedPath] = file;
    delete document.files[path];
  }

  for (let id in document.classes) {
    let normalizedId = normalizePath(id, inputPath);
    let klass = document.classes[id];

    klass.name = normalizedId;
    klass.shortname = normalizedId;
    klass.file = normalizePath(klass.file, inputPath);

    document.classes[normalizedId] = klass;
    delete document.classes[id];
  }

  for (let item of document.classitems) {
    item.file = normalizePath(item.file, inputPath);
    item.class = normalizePath(item.class, inputPath);
  }

  for (let warning of document.warnings) {
    warning.line = warning.line.replace(inputPath, '');
  }
}

function isAcceptableWarning(warning) {
  return warning.message.match(/^unknown tag:/);
}

module.exports = function generateYUIDoc(inputPaths, project) {
  let json = new YUIDoc({
    quiet: true,
    writeJSON: false,
    paths: inputPaths,
    project: {
      name: project.name()
    }
  }).run();

  normalizePaths(json, inputPaths);

  for (let warning of json.warnings) {
    if (!isAcceptableWarning(warning)) {
      project.ui.writeWarnLine(`${warning.line}: ${warning.message}`);
    }
  }

  return json;
};
