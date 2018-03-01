module.exports = function unfixType(t) {
  t.replace(/^(String|Boolean|Number|Any|Void|Null|Undefined|Object)$/g, function(match) {
    return match.toLowerCase();
  });
}
