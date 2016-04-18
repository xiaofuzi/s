'use strict';

var _tag = require('../tag.js');

var _ = _interopRequireWildcard(_tag);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var doctype = _.doctype,
    html = _.html,
    head = _.head,
    meta = _.meta,
    title = _.title,
    body = _.body;

function html5() {
	return function () {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		headContent = options.headContent || '', title = options.title || '', bodyContent = options.body || '';
		return doctype() + html(head(headContent, meta(), title(title ? title : 'HTML5 template')), body(bodyContent));
	};
}