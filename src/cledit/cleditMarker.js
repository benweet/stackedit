var cledit = require('./cleditCore')

var DIFF_DELETE = -1
var DIFF_INSERT = 1
var DIFF_EQUAL = 0

var idCounter = 0

function Marker(offset, trailing) {
  this.id = idCounter++
  this.offset = offset
  this.trailing = trailing
}

Marker.prototype.adjustOffset = function (diffs) {
  var startOffset = 0
  diffs.cl_each(function (diff) {
    var diffType = diff[0]
    var diffText = diff[1]
    var diffOffset = diffText.length
    switch (diffType) {
      case DIFF_EQUAL:
        startOffset += diffOffset
        break
      case DIFF_INSERT:
        if (
          this.trailing
            ? this.offset > startOffset
            : this.offset >= startOffset
        ) {
          this.offset += diffOffset
        }
        startOffset += diffOffset
        break
      case DIFF_DELETE:
        if (this.offset > startOffset) {
          this.offset -= Math.min(diffOffset, this.offset - startOffset)
        }
        break
    }
  }.cl_bind(this))
}

cledit.Marker = Marker
