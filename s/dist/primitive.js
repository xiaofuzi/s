'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.singleTag = singleTag;
exports.doubleTag = doubleTag;
exports.sequence = sequence;
//primitive
function singleTag(tag) {
	return function () {
		var attrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var attrDom = '';
		for (var attr in attrs) {
			attrDom += attr + '="' + attrs[attr] + '"';
		}
		return '<' + tag + ' ' + attrDom + '>';
	};
}

function doubleTag(tag) {
	/*
  * @params attrs {object}
  * @params html {string}
  */
	return function () {
		var _html = '';
		var attrs = {};
		if (arguments.length > 0) {
			var args = [].slice.call(arguments, 0);
			html.forEach(function (item) {
				if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
					attrs = extend(attrs, item);
				} else {
					_html += item;
				}
			});
		} else {
			_html = html;
		}
		//attribute
		var attrDom = '';
		for (var attr in attrs) {
			attrDom += attr + '="' + attrs[attr] + '"';
		}
		return '<' + tag + ' ' + attrDom + '>' + _html + '</' + tag + '>';
	};
}

/*
 * sequence tags
 * @params {tag name | array}
 */
function sequence() {
	if (arguments.length === 0) return '';

	if (arguments.length >= 1) {}
}
/*
 *
 */
function extend() {
	var oldObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	var newObj = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	for (var o in newObj) {
		if (newObj.hasOwnProperty(o)) {
			oldObj[o] = newObj[o];
		}
	}
	return oldObj;
}