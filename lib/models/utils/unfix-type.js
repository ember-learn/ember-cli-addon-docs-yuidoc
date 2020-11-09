module.exports = function unfixType(t = '') {
  if(!t) {
    return '';
  }
  return t.replace(/^(String|Boolean|Number|Any|Void|Null|Undefined|Object)$/g, function(match) {
    return match.toLowerCase();
  });
}
