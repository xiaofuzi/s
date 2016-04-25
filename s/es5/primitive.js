(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require('./node.js');

var _node2 = _interopRequireDefault(_node);

var _log = require('./log.js');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextNode = function (_Node) {
	_inherits(TextNode, _Node);

	function TextNode(parent) {
		var text = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

		_classCallCheck(this, TextNode);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextNode).call(this, '#text', parent));

		_this.text = text;
		return _this;
	}

	_createClass(TextNode, [{
		key: 'innerHTML',
		get: function get() {
			return this.text;
		},
		set: function set(text) {
			this.text = text;
		}
	}, {
		key: 'outerHTML',
		get: function get() {
			return this.innerHTML;
		}
	}]);

	return TextNode;
}(_node2.default);

exports.default = TextNode;

},{"./log.js":2,"./node.js":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*
* debug
*/
var Config = {
	debug: true
};

exports.default = {
	error: function error() {
		if (Config.debug) {
			console.error.apply(console, arguments);
		}
	},
	info: function info() {
		if (Config.debug) {
			console.log.apply(console, arguments);
		}
	},
	warn: function warn() {
		if (Config.debug) {
			console.warn.apply(console, arguments);
		}
	}
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var randomStr = _util2.default.randomStr;
var hash = _util2.default.hash;

var Node = function () {
	function Node() {
		var tagName = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
		var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

		_classCallCheck(this, Node);

		this.id = randomStr();
		this.html = '';
		this.attribute = hash();
		this.nodeType = '';
		this.nodeName = tagName;
		this.parent = parent;
		this.children = [];
	}

	_createClass(Node, [{
		key: 'innerHTML',
		get: function get() {
			var _html = '';
			if (this.children) {
				this.children.forEach(function (child) {
					if (child instanceof Node) {
						_html += child.outerHTML;
					}
				});
			} else {
				_html = this.innerHTML;
			}
			return _html;
		},
		set: function set(_html) {
			if (_html instanceof Node) {
				this.children = [];
				this.children.push(_html);
			} else if (Array.isArray(_html)) {
				this.children = _html;
			}
		}
	}, {
		key: 'outerHTML',
		get: function get() {
			var attrs = this.attribute;
			var attrDom = '';
			var tag = this.nodeName;

			attrDom += 'id="' + this.id + '"';
			for (var attr in attrs) {
				attrDom += attr + '="' + attrs[attr] + '"';
			}

			return '<' + tag + attrDom + '>' + this.innerHTML + '</' + tag + '>';
		}
	}]);

	return Node;
}();

exports.default = Node;

},{"./util.js":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sfor = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.singleTag = singleTag;
exports.doubleTag = doubleTag;
exports.sequence = sequence;

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

var _node = require('./node.js');

var _node2 = _interopRequireDefault(_node);

var _voidNode = require('./voidNode.js');

var _voidNode2 = _interopRequireDefault(_voidNode);

var _TextNode = require('./TextNode.js');

var _TextNode2 = _interopRequireDefault(_TextNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extend = _util2.default.extend;
var hash = _util2.default.hash;
var formatStr = _util2.default.formatStr;

//primitive
function singleTag(tag) {
	return function () {
		var attrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var voidNode = new _voidNode2.default(tag);
		voidNode.attribute = attrs;

		return voidNode;
	};
}

function doubleTag(tag) {
	/*
  * @params attrs {object}
  * @params html {string}
  * @params Node instance {class instance}
  */
	return function () {
		var node = new _node2.default(tag);
		var attrs = hash();

		if (arguments.length > 0) {
			var args = [].slice.call(arguments, 0);
			args.forEach(function (item) {
				if (item instanceof _node2.default) {
					node.children.push(item);
					item.parent = node;
				} else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
					attrs = extend(attrs, item);
				} else {
					//string
					var textNode = new _TextNode2.default(node, item);
					node.children.push(textNode);
				}
			});
		}

		node.attribute = attrs;

		return node;
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
 * loop an tag
 * @params {item in items}
 */
var sfor = exports.sfor = function sfor() {};

},{"./TextNode.js":1,"./node.js":3,"./util.js":5,"./voidNode.js":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    /*
     * extend an object
     */

    extend: function extend() {
        var oldObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var newObj = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        for (var o in newObj) {
            if (newObj.hasOwnProperty(o)) {
                oldObj[o] = newObj[o];
            }
        }
        return oldObj;
    },

    /*
     * 随机数生成
     */
    randomStr: function randomStr() {
        return Math.random().toString().substring(2) + Number(new Date());
    },
    hash: function hash() {
        return Object.create(null);
    },
    formatStr: function formatStr(obj) {
        return JSON.stringify(obj, '\t');
    }
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require('./node.js');

var _node2 = _interopRequireDefault(_node);

var _log = require('./log.js');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoidNode = function (_Node) {
	_inherits(VoidNode, _Node);

	function VoidNode(tagName) {
		var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

		_classCallCheck(this, VoidNode);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(VoidNode).call(this, tagName, parent));
	}

	_createClass(VoidNode, [{
		key: 'innerHTML',
		get: function get() {
			return '';
		},
		set: function set(val) {
			_log2.default.warn('void element can not set innerHTML.');
		}
	}, {
		key: 'outerHTML',
		get: function get() {
			var attrDom = '';
			var attrs = this.attribute;
			var tag = this.nodeName;

			for (var attr in attrs) {
				attrDom += attr + '="' + attrs[attr] + '"';
			}
			return '<' + tag + ' ' + attrDom + '>';
		}
	}]);

	return VoidNode;
}(_node2.default);

exports.default = VoidNode;

},{"./log.js":2,"./node.js":3}]},{},[4]);
