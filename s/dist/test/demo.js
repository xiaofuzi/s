'use strict';

var _tag = require('../tag.js');

var _ = _interopRequireWildcard(_tag);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function html5() {
		return _.doctype() + _.html(_.head(_.meta(), _.title('hello world!')), _.body(_.div('hello world!')));
}

console.log(index());