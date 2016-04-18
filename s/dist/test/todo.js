(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
			args.forEach(function (item) {
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

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = exports.body = exports.div = exports.ul = exports.li = exports.button = exports.label = exports.form = exports.head = exports.title = exports.a = exports.input = exports.meta = exports.doctype = undefined;

var _primitive = require('./primitive.js');

var api = _interopRequireWildcard(_primitive);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var singleTag = api.singleTag; /*
                                * html in js
                                */

var doubleTag = api.doubleTag;

//***********************************************//
/*
 * doctype
 */
var doctype = exports.doctype = function doctype() {
  return '<!DOCTYPE html>';
};

/*
 * meta
 */
var meta = exports.meta = singleTag('meta');

/*
 * input
 */
var input = exports.input = singleTag('input');

var a = exports.a = singleTag('a');

//***********************************************//
/*
 * title
 */
var title = exports.title = doubleTag('title');

/*
 * head
 */
var head = exports.head = doubleTag('head');

/*
 * form
 */
var form = exports.form = doubleTag('form');

var label = exports.label = doubleTag('label');

var button = exports.button = doubleTag('button');

/*
 * list
 */
var li = exports.li = doubleTag('li');
var ul = exports.ul = doubleTag('ul');

var div = exports.div = doubleTag('div');

/*
 * body
 */
var body = exports.body = doubleTag('body');

/*
 * html
 */
var html = exports.html = doubleTag('html');

},{"./primitive.js":1}],3:[function(require,module,exports){
'use strict';

var _tag = require('../tag.js');

var _ = _interopRequireWildcard(_tag);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var doctype = _.doctype,
    html = _.html,
    head = _.head,
    meta = _.meta,
    title = _.title,
    body = _.body,
    li = _.li,
    ul = _.ul,
    input = _.input,
    button = _.button,
    div = _.div,
    label = _.label;

var todo = li(div(input({ class: 'toggle', type: 'checkbox' }), label('name'), button({ class: 'destroy' })), input({ class: 'edit', value: 'name' }));
var app = document.getElementById('app');
app.innerHTML = todo;

},{"../tag.js":2}]},{},[3]);
