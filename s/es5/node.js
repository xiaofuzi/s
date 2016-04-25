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
						_html += child.innerHTML;
					}
				});
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
			if (isVoid) {
				return '<' + this.nodeName + ' >';
			} else {}
		}
	}]);

	return Node;
}();

exports.default = Node;