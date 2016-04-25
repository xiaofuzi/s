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

},{"./log.js":4,"./node.js":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function () {
	var plex = hash();

	plex.createComponent = function () {
		var options = arguments.length <= 0 || arguments[0] === undefined ? hash() : arguments[0];

		return new Component(options);
	};
	plex.render = function (component, data) {};
};

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

var _log = require('./log.js');

var _log2 = _interopRequireDefault(_log);

var _node = require('./node.js');

var _node2 = _interopRequireDefault(_node);

var _tag = require('./tag.js');

var _tag2 = _interopRequireDefault(_tag);

var _browserEvent = require('./browserEvent.js');

var _browserEvent2 = _interopRequireDefault(_browserEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hash = _util2.default.hash;
var normalize = _util2.default.normalize;
var extend = _util2.default.extend;
var isFunc = _util2.default.isFunc;

var Component = function () {
	function Component() {
		var domFn = arguments.length <= 0 || arguments[0] === undefined ? function () {
			return '';
		} : arguments[0];
		var _ref = arguments[1];
		var _ref$data = _ref.data;
		var data = _ref$data === undefined ? hash() : _ref$data;
		var _ref$components = _ref.components;
		var components = _ref$components === undefined ? hash() : _ref$components;
		var _ref$methods = _ref.methods;
		var methods = _ref$methods === undefined ? hash() : _ref$methods;
		var _ref$init = _ref.init;
		var init = _ref$init === undefined ? hash() : _ref$init;
		var _ref$create = _ref.create;
		var create = _ref$create === undefined ? hash() : _ref$create;
		var _ref$ready = _ref.ready;
		var ready = _ref$ready === undefined ? hash() : _ref$ready;

		_classCallCheck(this, Component);

		this.$data = data;
		this.$domFn = domFn;
		this.$components = components;
		this.$methods = methods;
		/*
   * life circle
   */
		this.$init = init;
		this.$create = create;
		this.$ready = ready;

		this.$scope = hash();
		this.$parent = null;
		this.$children = [];

		this._init();
		this.$dom = this.getDom();
	}

	_createClass(Component, [{
		key: 'getDom',
		value: function getDom() {
			return this.$domFn.call(this.$scope);
		}
		/*
   * private
   */

	}, {
		key: '_init',
		value: function _init() {
			var _this = this;

			this.init();
			//get dom
			extend(this.$scope, this.$data);
			extend(this.$scope, this.$methods);

			//components initial
			Object.keys(this.$components).forEach(function (componentName) {
				_this.$children.push({
					parent: _this.$parent,
					name: componentName,
					body: _this.$components[componentName]
				});
			});
			this.create();
		}

		/*
      * life circle
   */

	}, {
		key: '_call',
		value: function _call() {
			var obj = arguments.length <= 0 || arguments[0] === undefined ? hash() : arguments[0];

			if (!obj) return;
			for (var fnName in obj) {
				obj[fnName].call(this.$scope);
			}
		}
	}, {
		key: 'init',
		value: function init() {
			this._call(this.$init);
		}
	}, {
		key: 'create',
		value: function create(obj) {
			this._call(this.$create);
		}
	}, {
		key: 'ready',
		value: function ready(obj) {
			/*
    * bind browser event after dom is ready
    */
			this.$el = document.getElementById(this.$dom.id);

			this._bindBrowerEvent();
			this._call(this.$ready);
		}
		/*
      *绑定浏览器事件
   */

	}, {
		key: '_bindBrowerEvent',
		value: function _bindBrowerEvent() {
			var _this2 = this;

			var el = this.$el,
			    events = this.$dom.events;

			/*
    * 增加事件功能
    */
			var $dom = (0, _browserEvent2.default)(el);

			var _loop = function _loop(eType) {
				var eArray = events[eType];
				eArray.forEach(function (eCbName) {
					if (isFunc(_this2.$scope[eCbName])) {
						_log2.default.info(_this2.$scope[eCbName].toString());
						$dom.on(eType, _this2.$scope[eCbName]);
					} else {
						_log2.default.warn('Missing ' + eCbName + 'method.');
					}
				});
			};

			for (var eType in events) {
				_loop(eType);
			}
		}
	}]);

	return Component;
}();

/*
 * demo
 */
var MyComponent = function MyComponent() {
	var str = arguments.length <= 0 || arguments[0] === undefined ? 'www.iwaimai.com' : arguments[0];

	return _tag2.default.div({
		class: 'container',
		onClick: 'hello'
	}, _tag2.default.header(_tag2.default.div('hello world!')), _tag2.default.article(_tag2.default.div(this.paragraph + this.name)), _tag2.default.footer(_tag2.default.input({
		type: 'text'
	}), _tag2.default.a({
		href: str
	}, this.name)));
};

var rootApp = new Component(MyComponent, {
	data: {
		name: 'baidu',
		paragraph: 'my name is yangxiaofu'
	},
	methods: {
		hello: function hello() {
			alert('my name is yangxiaofu!');
		}
	}
});

var app = document.getElementById('app');
// app.innerHTML = (MyComponent.innerHTML)
app.innerHTML = rootApp.$dom.outerHTML;
rootApp.ready();

//console.log('html', MyComponent, MyComponent.innerHTML)

},{"./browserEvent.js":3,"./log.js":4,"./node.js":5,"./tag.js":7,"./util.js":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function ($el) {
    var event = {
        element: $el,
        eventHandler: {
            events: {},
            bindEvent: function bindEvent(event, callback, targetElement) {
                //bind event listener to DOM element
                //在冒泡阶段触发
                targetElement.addEventListener(event, callback, false);

                if (this.events[event]) {
                    var counter = this.events[event].length;
                    this.events[event].push({
                        eventId: counter,
                        event: callback,
                        target: targetElement
                    });
                } else {
                    this.events[event] = [];
                    this.events[event].push({
                        eventId: 0,
                        event: callback,
                        target: targetElement
                    });
                }
            },
            findEvent: function findEvent(event) {
                if (this.events[event]) {
                    return this.events[event][0];
                } else {
                    return false;
                }
            },
            /*
             * return all listen events
             */
            all: function all(event) {
                if (this.events[event]) {
                    return this.events[event];
                } else {
                    return false;
                }
            },
            unbindEvent: function unbindEvent(event, targetElement) {
                var foundEvent = this.findEvent(event);
                if (foundEvent) {
                    targetElement.removeEventListener(event, foundEvent.event, false);

                    //update events array
                    this.events = this.events[event].filter(function (e) {
                        return e.counter !== event.counter;
                    }, event);
                }
            },
            remove: function remove(event, targetElement) {
                var self = this;
                var events = this.all(event);
                if (events) {
                    events.forEach(function (e) {
                        self.unbindEvent(e, targetElement);
                    });
                    self.events[event] = [];
                }
            },
            /*
             * 检查该事件类型是否被绑定
             */
            isBinding: function isBinding(event) {
                if (this.findEvent(event)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        on: function on(event, callback) {
            this.eventHandler.bindEvent(event, callback, this.element);
        },
        /*
         * bind once
         */
        once: function once(event, callback) {
            this.eventHandler.remove(event);
            this.on(event, callback);
        },
        off: function off(event) {
            this.eventHandler.unbindEvent(event, this.element);
        },
        /*
         * delegate 事件,给动态添加元素绑定监听事件
         */
        // delegate: function(selector, event, fn) {
        //     var self = this;
        //     self.on(event, function(e) {
        //         var context = this;
        //         var children = self.create(self.selector + ' ' + selector).elements;
        //         children.forEach(function(child) {
        //             if (e.target == child) {
        //                 fn.call(context, e);
        //             }
        //         })
        //     })
        // },
        /*
         * 触发指定事件
         */
        //浏览器事件，默认冒泡
        trigger: function trigger(type) {
            var el = this.element;
            var event = document.createEvent('HTMLEvents');
            event.initEvent(type, true, true);
            el.dispatchEvent(event);
        }
    };
    return event;
};

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
		this.scope = hash();
		this.events = hash();
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

			attrDom += ' id="' + this.id + '"';
			for (var attr in attrs) {
				/*
     * events collect
     */
				if (attr.substr(0, 2) === 'on') {
					var eventType = attr.substr(2);
					eventType = eventType.toLowerCase();
					if (!this.events[eventType]) {
						this.events[eventType] = [];
					}
					this.events[eventType].push(attrs[attr]);
				} else {
					attrDom += attr + '="' + attrs[attr] + '"';
				}
			}

			return '<' + tag + attrDom + '>' + this.innerHTML + '</' + tag + '>';
		}
	}]);

	return Node;
}();

exports.default = Node;

},{"./util.js":8}],6:[function(require,module,exports){
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

},{"./TextNode.js":1,"./node.js":5,"./util.js":8,"./voidNode.js":9}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _primitive = require('./primitive.js');

/*
 * close tag
*/
var CLOSE_TAGS = ['header', 'article', 'footer', 'section', 'div', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'form', 'button', 'label', 'a'];

var OPEN_TAGS = ['meta', 'img', 'input'];

var h = {};

CLOSE_TAGS.forEach(function (tag) {
	h[tag] = (0, _primitive.doubleTag)(tag);
});

OPEN_TAGS.forEach(function (tag) {
	h[tag] = (0, _primitive.singleTag)(tag);
});

exports.default = h;

},{"./primitive.js":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var utils = {
    /*types*/
    type: function type(obj) {
        return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
    },
    isArray: function isArray(arr) {
        return Array.isArray(arr);
    },
    toArray: function toArray(obj) {
        return [].slice.call(obj);
    },
    isObject: function isObject(obj) {
        if (utils.type(obj) === 'object') {
            return true;
        } else {
            return false;
        }
    },
    isNumber: function isNumber(num) {
        return utils.type(num) === 'number' ? true : false;
    },
    isString: function isString(str) {
        return typeof str === 'string' ? true : false;
    },
    isFunc: function isFunc(fn) {
        return utils.type(fn) === 'function' ? true : false;
    },
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
        var random = Math.random().toString().substring(2) + Number(new Date());
        return random;
    },
    hash: function hash() {
        return Object.create(null);
    },
    formatStr: function formatStr(obj) {
        return JSON.stringify(obj, '\t');
    },
    normalize: function normalize() {
        var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        var obj = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var pArr = null,
            value = obj;
        if (path && obj) {
            if (path[0] == '.') path = path.substring(1);
            if (path[path.length - 1] == '.') {
                path = path.substr(0, -2);
            }

            if (path.indexOf('.') != -1) {
                pArr = path.split('.');

                pArr.forEach(function (key) {
                    if (value[key]) {
                        value = value[key];
                    } else {
                        log.error(obj, 'the value of ' + path + ' is undefined.');
                    }
                });
                return value;
            }
        }
    }
};
exports.default = utils;

},{}],9:[function(require,module,exports){
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

			attrDom += ' id="' + this.id + '"';
			for (var attr in attrs) {
				attrDom += attr + '="' + attrs[attr] + '"';
			}
			return '<' + tag + ' ' + attrDom + '>';
		}
	}]);

	return VoidNode;
}(_node2.default);

exports.default = VoidNode;

},{"./log.js":4,"./node.js":5}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9UZXh0Tm9kZS5qcyIsImxpYi9hcGkuanMiLCJsaWIvYnJvd3NlckV2ZW50LmpzIiwibGliL2xvZy5qcyIsImxpYi9ub2RlLmpzIiwibGliL3ByaW1pdGl2ZS5qcyIsImxpYi90YWcuanMiLCJsaWIvdXRpbC5qcyIsImxpYi92b2lkTm9kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR3FCOzs7QUFDcEIsVUFEb0IsUUFDcEIsQ0FBWSxNQUFaLEVBQThCO01BQVYsNkRBQU8sa0JBQUc7O3dCQURWLFVBQ1U7O3FFQURWLHFCQUViLFNBQVMsU0FEYzs7QUFFN0IsUUFBSyxJQUFMLEdBQVksSUFBWixDQUY2Qjs7RUFBOUI7O2NBRG9COztzQkFNTDtBQUNkLFVBQU8sS0FBSyxJQUFMLENBRE87O29CQUdELE1BQUs7QUFDbEIsUUFBSyxJQUFMLEdBQVksSUFBWixDQURrQjs7OztzQkFJSjtBQUNkLFVBQU8sS0FBSyxTQUFMLENBRE87Ozs7UUFiSzs7Ozs7Ozs7Ozs7Ozs7a0JDcUdOLFlBQVU7QUFDeEIsS0FBSSxPQUFPLE1BQVAsQ0FEb0I7O0FBR3hCLE1BQUssZUFBTCxHQUF1QixZQUEwQjtNQUFqQixnRUFBVSxzQkFBTzs7QUFDaEQsU0FBTyxJQUFJLFNBQUosQ0FBYyxPQUFkLENBQVAsQ0FEZ0Q7RUFBMUIsQ0FIQztBQU14QixNQUFLLE1BQUwsR0FBYyxVQUFTLFNBQVQsRUFBb0IsSUFBcEIsRUFBeUIsRUFBekIsQ0FOVTtDQUFWOztBQXpHZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0sT0FBTyxlQUFFLElBQUY7QUFDYixJQUFNLFlBQVksZUFBRSxTQUFGO0FBQ2xCLElBQU0sU0FBUyxlQUFFLE1BQUY7QUFDZixJQUFNLFNBQVMsZUFBRSxNQUFGOztJQUVUO0FBQ0wsVUFESyxTQUNMLEdBQW9JO01BQXhILDhEQUFNLFlBQVU7QUFBQyxVQUFPLEVBQVAsQ0FBRDtHQUFWLGdCQUFrSDs7dUJBQTFGLEtBQTBGO01BQTFGLGlDQUFLLG1CQUFxRjs2QkFBN0UsV0FBNkU7TUFBN0UsNkNBQVcseUJBQWtFOzBCQUExRCxRQUEwRDtNQUExRCx1Q0FBUSxzQkFBa0Q7dUJBQTFDLEtBQTBDO01BQTFDLGlDQUFLLG1CQUFxQzt5QkFBN0IsT0FBNkI7TUFBN0IscUNBQU8scUJBQXNCO3dCQUFkLE1BQWM7TUFBZCxtQ0FBTSxvQkFBUTs7d0JBRC9ILFdBQytIOztBQUNuSSxPQUFLLEtBQUwsR0FBYSxJQUFiLENBRG1JO0FBRW5JLE9BQUssTUFBTCxHQUFjLEtBQWQsQ0FGbUk7QUFHbkksT0FBSyxXQUFMLEdBQW1CLFVBQW5CLENBSG1JO0FBSW5JLE9BQUssUUFBTCxHQUFnQixPQUFoQjs7OztBQUptSSxNQVFuSSxDQUFLLEtBQUwsR0FBYSxJQUFiLENBUm1JO0FBU25JLE9BQUssT0FBTCxHQUFlLE1BQWYsQ0FUbUk7QUFVbkksT0FBSyxNQUFMLEdBQWMsS0FBZCxDQVZtSTs7QUFZbkksT0FBSyxNQUFMLEdBQWMsTUFBZCxDQVptSTtBQWFuSSxPQUFLLE9BQUwsR0FBZSxJQUFmLENBYm1JO0FBY25JLE9BQUssU0FBTCxHQUFpQixFQUFqQixDQWRtSTs7QUFnQm5JLE9BQUssS0FBTCxHQWhCbUk7QUFpQm5JLE9BQUssSUFBTCxHQUFZLEtBQUssTUFBTCxFQUFaLENBakJtSTtFQUFwSTs7Y0FESzs7MkJBcUJHO0FBQ1AsVUFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLEtBQUssTUFBTCxDQUF4QixDQURPOzs7Ozs7OzswQkFNRDs7O0FBQ04sUUFBSyxJQUFMOztBQURNLFNBR04sQ0FBTyxLQUFLLE1BQUwsRUFBYSxLQUFLLEtBQUwsQ0FBcEIsQ0FITTtBQUlOLFVBQU8sS0FBSyxNQUFMLEVBQWEsS0FBSyxRQUFMLENBQXBCOzs7QUFKTSxTQU9OLENBQU8sSUFBUCxDQUFZLEtBQUssV0FBTCxDQUFaLENBQThCLE9BQTlCLENBQXNDLFVBQUMsYUFBRCxFQUFpQjtBQUN0RCxVQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CO0FBQ25CLGFBQVEsTUFBSyxPQUFMO0FBQ1IsV0FBTSxhQUFOO0FBQ0EsV0FBTSxNQUFLLFdBQUwsQ0FBaUIsYUFBakIsQ0FBTjtLQUhELEVBRHNEO0lBQWpCLENBQXRDLENBUE07QUFjTixRQUFLLE1BQUwsR0FkTTs7Ozs7Ozs7OzBCQW9CVTtPQUFYLDREQUFJLHNCQUFPOztBQUNoQixPQUFHLENBQUMsR0FBRCxFQUFNLE9BQVQ7QUFDQSxRQUFJLElBQUksTUFBSixJQUFjLEdBQWxCLEVBQXNCO0FBQ3JCLFFBQUksTUFBSixFQUFZLElBQVosQ0FBaUIsS0FBSyxNQUFMLENBQWpCLENBRHFCO0lBQXRCOzs7O3lCQUlLO0FBQ0wsUUFBSyxLQUFMLENBQVcsS0FBSyxLQUFMLENBQVgsQ0FESzs7Ozt5QkFHQyxLQUFJO0FBQ1YsUUFBSyxLQUFMLENBQVcsS0FBSyxPQUFMLENBQVgsQ0FEVTs7Ozt3QkFHTCxLQUFJOzs7O0FBSVQsUUFBSyxHQUFMLEdBQVcsU0FBUyxjQUFULENBQXdCLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBbkMsQ0FKUzs7QUFNVCxRQUFLLGdCQUFMLEdBTlM7QUFPVCxRQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsQ0FBWCxDQVBTOzs7Ozs7OztxQ0FZUTs7O0FBQ2pCLE9BQUksS0FBSyxLQUFLLEdBQUw7T0FDUixTQUFTLEtBQUssSUFBTCxDQUFVLE1BQVY7Ozs7O0FBRk8sT0FPWCxPQUFPLDRCQUFhLEVBQWIsQ0FBUCxDQVBXOzs4QkFRVDtBQUNQLFFBQUksU0FBUyxPQUFPLEtBQVAsQ0FBVDtBQUNKLFdBQU8sT0FBUCxDQUFlLFVBQUMsT0FBRCxFQUFXO0FBQ3pCLFNBQUcsT0FBTyxPQUFLLE1BQUwsQ0FBWSxPQUFaLENBQVAsQ0FBSCxFQUFnQztBQUMvQixvQkFBSSxJQUFKLENBQVMsT0FBSyxNQUFMLENBQVksT0FBWixFQUFxQixRQUFyQixFQUFULEVBRCtCO0FBRS9CLFdBQUssRUFBTCxDQUFRLEtBQVIsRUFBZSxPQUFLLE1BQUwsQ0FBWSxPQUFaLENBQWYsRUFGK0I7TUFBaEMsTUFHSztBQUNKLG9CQUFJLElBQUosQ0FBUyxhQUFhLE9BQWIsR0FBdUIsU0FBdkIsQ0FBVCxDQURJO01BSEw7S0FEYyxDQUFmO0tBVmdCOztBQVFqQixRQUFJLElBQUksS0FBSixJQUFhLE1BQWpCLEVBQXdCO1VBQWhCLE9BQWdCO0lBQXhCOzs7O1FBL0VJOzs7Ozs7QUE0R04sSUFBSSxjQUFjLFNBQWQsV0FBYyxHQUFpQztLQUF4Qiw0REFBTSxpQ0FBa0I7O0FBQ2xELFFBQU8sY0FBRSxHQUFGLENBQ0w7QUFDQyxTQUFPLFdBQVA7QUFDQSxXQUFTLE9BQVQ7RUFISSxFQUtMLGNBQUUsTUFBRixDQUNFLGNBQUUsR0FBRixDQUFNLGNBQU4sQ0FERixDQUxLLEVBUUwsY0FBRSxPQUFGLENBQ0MsY0FBRSxHQUFGLENBQ0UsS0FBSyxTQUFMLEdBQWlCLEtBQUssSUFBTCxDQUZwQixDQVJLLEVBYUwsY0FBRSxNQUFGLENBQ0MsY0FBRSxLQUFGLENBQVE7QUFDUCxRQUFNLE1BQU47RUFERCxDQURELEVBSUMsY0FBRSxDQUFGLENBQUk7QUFDRixRQUFNLEdBQU47RUFERixFQUdDLEtBQUssSUFBTCxDQVBGLENBYkssQ0FBUCxDQURrRDtDQUFqQzs7QUEyQmxCLElBQUksVUFBVSxJQUFJLFNBQUosQ0FBYyxXQUFkLEVBQTBCO0FBQ3RDLE9BQU07QUFDTCxRQUFNLE9BQU47QUFDQSxhQUFXLHVCQUFYO0VBRkQ7QUFJQSxVQUFTO0FBQ1IsMEJBQU87QUFDTixTQUFNLHdCQUFOLEVBRE07R0FEQztFQUFUO0NBTFksQ0FBVjs7QUFZSixJQUFJLE1BQU0sU0FBUyxjQUFULENBQXdCLEtBQXhCLENBQU47O0FBRUosSUFBSSxTQUFKLEdBQWlCLFFBQVEsSUFBUixDQUFhLFNBQWI7QUFDakIsUUFBUSxLQUFSOzs7Ozs7Ozs7OztrQkNqS2UsVUFBUyxHQUFULEVBQWM7QUFDekIsUUFBSSxRQUFRO0FBQ1IsaUJBQVMsR0FBVDtBQUNBLHNCQUFjO0FBQ1Ysb0JBQVEsRUFBUjtBQUNBLHVCQUFXLG1CQUFTLEtBQVQsRUFBZ0IsUUFBaEIsRUFBMEIsYUFBMUIsRUFBeUM7OztBQUdoRCw4QkFBYyxnQkFBZCxDQUErQixLQUEvQixFQUFzQyxRQUF0QyxFQUFnRCxLQUFoRCxFQUhnRDs7QUFLaEQsb0JBQUksS0FBSyxNQUFMLENBQVksS0FBWixDQUFKLEVBQXdCO0FBQ3BCLHdCQUFJLFVBQVUsS0FBSyxNQUFMLENBQVksS0FBWixFQUFtQixNQUFuQixDQURNO0FBRXBCLHlCQUFLLE1BQUwsQ0FBWSxLQUFaLEVBQW1CLElBQW5CLENBQXdCO0FBQ3BCLGlDQUFTLE9BQVQ7QUFDQSwrQkFBTyxRQUFQO0FBQ0EsZ0NBQVEsYUFBUjtxQkFISixFQUZvQjtpQkFBeEIsTUFPTztBQUNILHlCQUFLLE1BQUwsQ0FBWSxLQUFaLElBQXFCLEVBQXJCLENBREc7QUFFSCx5QkFBSyxNQUFMLENBQVksS0FBWixFQUFtQixJQUFuQixDQUF3QjtBQUNwQixpQ0FBUyxDQUFUO0FBQ0EsK0JBQU8sUUFBUDtBQUNBLGdDQUFRLGFBQVI7cUJBSEosRUFGRztpQkFQUDthQUxPO0FBc0JYLHVCQUFXLG1CQUFTLEtBQVQsRUFBZ0I7QUFDdkIsb0JBQUksS0FBSyxNQUFMLENBQVksS0FBWixDQUFKLEVBQXdCO0FBQ3BCLDJCQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosRUFBbUIsQ0FBbkIsQ0FBUCxDQURvQjtpQkFBeEIsTUFFTztBQUNILDJCQUFPLEtBQVAsQ0FERztpQkFGUDthQURPOzs7O0FBVVgsaUJBQUssYUFBUyxLQUFULEVBQWdCO0FBQ2pCLG9CQUFJLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBSixFQUF3QjtBQUNwQiwyQkFBTyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQVAsQ0FEb0I7aUJBQXhCLE1BRU87QUFDSCwyQkFBTyxLQUFQLENBREc7aUJBRlA7YUFEQztBQU9MLHlCQUFhLHFCQUFTLEtBQVQsRUFBZ0IsYUFBaEIsRUFBK0I7QUFDeEMsb0JBQUksYUFBYSxLQUFLLFNBQUwsQ0FBZSxLQUFmLENBQWIsQ0FEb0M7QUFFeEMsb0JBQUksVUFBSixFQUFnQjtBQUNaLGtDQUFjLG1CQUFkLENBQWtDLEtBQWxDLEVBQXlDLFdBQVcsS0FBWCxFQUFrQixLQUEzRDs7O0FBRFksd0JBSVosQ0FBSyxNQUFMLEdBQWMsS0FBSyxNQUFMLENBQVksS0FBWixFQUFtQixNQUFuQixDQUEwQixVQUFTLENBQVQsRUFBWTtBQUNoRCwrQkFBTyxFQUFFLE9BQUYsS0FBYyxNQUFNLE9BQU4sQ0FEMkI7cUJBQVosRUFFckMsS0FGVyxDQUFkLENBSlk7aUJBQWhCO2FBRlM7QUFXYixvQkFBUSxnQkFBUyxLQUFULEVBQWdCLGFBQWhCLEVBQStCO0FBQ25DLG9CQUFJLE9BQU8sSUFBUCxDQUQrQjtBQUVuQyxvQkFBSSxTQUFTLEtBQUssR0FBTCxDQUFTLEtBQVQsQ0FBVCxDQUYrQjtBQUduQyxvQkFBSSxNQUFKLEVBQVk7QUFDUiwyQkFBTyxPQUFQLENBQWUsVUFBUyxDQUFULEVBQVk7QUFDdkIsNkJBQUssV0FBTCxDQUFpQixDQUFqQixFQUFvQixhQUFwQixFQUR1QjtxQkFBWixDQUFmLENBRFE7QUFJUix5QkFBSyxNQUFMLENBQVksS0FBWixJQUFxQixFQUFyQixDQUpRO2lCQUFaO2FBSEk7Ozs7QUFhUix1QkFBVyxtQkFBUyxLQUFULEVBQWdCO0FBQ3ZCLG9CQUFJLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FBSixFQUEyQjtBQUN2QiwyQkFBTyxJQUFQLENBRHVCO2lCQUEzQixNQUVPO0FBQ0gsMkJBQU8sS0FBUCxDQURHO2lCQUZQO2FBRE87U0FqRWY7QUF5RUEsWUFBSSxZQUFTLEtBQVQsRUFBZ0IsUUFBaEIsRUFBMEI7QUFDMUIsaUJBQUssWUFBTCxDQUFrQixTQUFsQixDQUE0QixLQUE1QixFQUFtQyxRQUFuQyxFQUE2QyxLQUFLLE9BQUwsQ0FBN0MsQ0FEMEI7U0FBMUI7Ozs7QUFNSixjQUFNLGNBQVMsS0FBVCxFQUFnQixRQUFoQixFQUEwQjtBQUM1QixpQkFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLEtBQXpCLEVBRDRCO0FBRTVCLGlCQUFLLEVBQUwsQ0FBUSxLQUFSLEVBQWUsUUFBZixFQUY0QjtTQUExQjtBQUlOLGFBQUssYUFBUyxLQUFULEVBQWdCO0FBQ2pCLGlCQUFLLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBOEIsS0FBOUIsRUFBcUMsS0FBSyxPQUFMLENBQXJDLENBRGlCO1NBQWhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCTCxpQkFBUyxpQkFBUyxJQUFULEVBQWU7QUFDcEIsZ0JBQUksS0FBSyxLQUFLLE9BQUwsQ0FEVztBQUVwQixnQkFBSSxRQUFRLFNBQVMsV0FBVCxDQUFxQixZQUFyQixDQUFSLENBRmdCO0FBR3BCLGtCQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsRUFBNEIsSUFBNUIsRUFIb0I7QUFJcEIsZUFBRyxhQUFILENBQWlCLEtBQWpCLEVBSm9CO1NBQWY7S0EzR1QsQ0FEcUI7QUFtSHpCLFdBQU8sS0FBUCxDQW5IeUI7Q0FBZDs7Ozs7Ozs7Ozs7QUNHZixJQUFNLFNBQVM7QUFDZCxRQUFPLElBQVA7Q0FESzs7a0JBSVM7QUFDZCx5QkFBTztBQUNOLE1BQUcsT0FBTyxLQUFQLEVBQWE7QUFDZixXQUFRLEtBQVIsQ0FBYyxLQUFkLENBQW9CLE9BQXBCLEVBQTZCLFNBQTdCLEVBRGU7R0FBaEI7RUFGYTtBQU1kLHVCQUFNO0FBQ0wsTUFBRyxPQUFPLEtBQVAsRUFBYTtBQUNmLFdBQVEsR0FBUixDQUFZLEtBQVosQ0FBa0IsT0FBbEIsRUFBMkIsU0FBM0IsRUFEZTtHQUFoQjtFQVBhO0FBV2QsdUJBQU07QUFDTCxNQUFHLE9BQU8sS0FBUCxFQUFhO0FBQ2YsV0FBUSxJQUFSLENBQWEsS0FBYixDQUFtQixPQUFuQixFQUE0QixTQUE1QixFQURlO0dBQWhCO0VBWmE7Ozs7Ozs7Ozs7OztBQ1BmOzs7Ozs7OztBQUVBLElBQU0sWUFBWSxlQUFFLFNBQUY7QUFDbEIsSUFBTSxPQUFPLGVBQUUsSUFBRjs7SUFFUTtBQUNwQixVQURvQixJQUNwQixHQUF3QztNQUE1QixnRUFBVSxrQkFBa0I7TUFBZCwrREFBUyxvQkFBSzs7d0JBRHBCLE1BQ29COztBQUN2QyxPQUFLLEVBQUwsR0FBVSxXQUFWLENBRHVDO0FBRXZDLE9BQUssSUFBTCxHQUFZLEVBQVosQ0FGdUM7QUFHdkMsT0FBSyxTQUFMLEdBQWlCLE1BQWpCLENBSHVDO0FBSXZDLE9BQUssUUFBTCxHQUFnQixFQUFoQixDQUp1QztBQUt2QyxPQUFLLFFBQUwsR0FBZ0IsT0FBaEIsQ0FMdUM7QUFNdkMsT0FBSyxNQUFMLEdBQWMsTUFBZCxDQU51QztBQU92QyxPQUFLLFFBQUwsR0FBZ0IsRUFBaEIsQ0FQdUM7QUFRdkMsT0FBSyxLQUFMLEdBQWEsTUFBYixDQVJ1QztBQVN2QyxPQUFLLE1BQUwsR0FBYyxNQUFkLENBVHVDO0VBQXhDOztjQURvQjs7c0JBYUw7QUFDZCxPQUFJLFFBQVEsRUFBUixDQURVO0FBRWQsT0FBRyxLQUFLLFFBQUwsRUFBYztBQUNoQixTQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLFVBQVMsS0FBVCxFQUFlO0FBQ3BDLFNBQUcsaUJBQWlCLElBQWpCLEVBQXNCO0FBQ3hCLGVBQVMsTUFBTSxTQUFOLENBRGU7TUFBekI7S0FEcUIsQ0FBdEIsQ0FEZ0I7SUFBakIsTUFNSztBQUNKLFlBQVEsS0FBSyxTQUFMLENBREo7SUFOTDtBQVNBLFVBQU8sS0FBUCxDQVhjOztvQkFhRCxPQUFNO0FBQ25CLE9BQUcsaUJBQWlCLElBQWpCLEVBQXNCO0FBQ3hCLFNBQUssUUFBTCxHQUFnQixFQUFoQixDQUR3QjtBQUV4QixTQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQW5CLEVBRndCO0lBQXpCLE1BR00sSUFBRyxNQUFNLE9BQU4sQ0FBYyxLQUFkLENBQUgsRUFBd0I7QUFDN0IsU0FBSyxRQUFMLEdBQWdCLEtBQWhCLENBRDZCO0lBQXhCOzs7O3NCQUtRO0FBQ2QsT0FBSSxRQUFRLEtBQUssU0FBTCxDQURFO0FBRWQsT0FBSSxVQUFVLEVBQVYsQ0FGVTtBQUdkLE9BQUksTUFBTSxLQUFLLFFBQUwsQ0FISTs7QUFLZCx3QkFBbUIsS0FBSyxFQUFMLE1BQW5CLENBTGM7QUFNZCxRQUFJLElBQUksSUFBSixJQUFZLEtBQWhCLEVBQXNCOzs7O0FBSXJCLFFBQUcsS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLENBQWYsTUFBc0IsSUFBdEIsRUFBMkI7QUFDN0IsU0FBSSxZQUFZLEtBQUssTUFBTCxDQUFZLENBQVosQ0FBWixDQUR5QjtBQUU3QixpQkFBWSxVQUFVLFdBQVYsRUFBWixDQUY2QjtBQUc3QixTQUFHLENBQUMsS0FBSyxNQUFMLENBQVksU0FBWixDQUFELEVBQXdCO0FBQzFCLFdBQUssTUFBTCxDQUFZLFNBQVosSUFBeUIsRUFBekIsQ0FEMEI7TUFBM0I7QUFHQSxVQUFLLE1BQUwsQ0FBWSxTQUFaLEVBQXVCLElBQXZCLENBQTRCLE1BQU0sSUFBTixDQUE1QixFQU42QjtLQUE5QixNQU9LO0FBQ0osZ0JBQWMsY0FBUyxNQUFNLElBQU4sT0FBdkIsQ0FESTtLQVBMO0lBSkQ7O0FBZ0JBLGdCQUFXLE1BQU0sZ0JBQVcsS0FBSyxTQUFMLFVBQW1CLFNBQS9DLENBdEJjOzs7O1FBbkNLOzs7Ozs7Ozs7Ozs7Ozs7UUNLTDtRQVNBO1FBcUNBOztBQXhEaEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sU0FBUyxlQUFFLE1BQUY7QUFDZixJQUFNLE9BQU8sZUFBRSxJQUFGO0FBQ2IsSUFBTSxZQUFZLGVBQUUsU0FBRjs7O0FBR1gsU0FBUyxTQUFULENBQW1CLEdBQW5CLEVBQXVCO0FBQzdCLFFBQU8sWUFBb0I7TUFBWCw4REFBUSxrQkFBRzs7QUFDMUIsTUFBSSxXQUFXLHVCQUFhLEdBQWIsQ0FBWCxDQURzQjtBQUUxQixXQUFTLFNBQVQsR0FBcUIsS0FBckIsQ0FGMEI7O0FBSTFCLFNBQU8sUUFBUCxDQUowQjtFQUFwQixDQURzQjtDQUF2Qjs7QUFTQSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBdUI7Ozs7OztBQU03QixRQUFPLFlBQVU7QUFDaEIsTUFBSSxPQUFPLG1CQUFTLEdBQVQsQ0FBUCxDQURZO0FBRWhCLE1BQUksUUFBUSxNQUFSLENBRlk7O0FBSWhCLE1BQUcsVUFBVSxNQUFWLEdBQW1CLENBQW5CLEVBQXFCO0FBQ3ZCLE9BQUksT0FBTyxHQUFHLEtBQUgsQ0FBUyxJQUFULENBQWMsU0FBZCxFQUF5QixDQUF6QixDQUFQLENBRG1CO0FBRXZCLFFBQUssT0FBTCxDQUFhLFVBQVMsSUFBVCxFQUFjO0FBQzFCLFFBQUcsOEJBQUgsRUFBd0I7QUFDdkIsVUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixFQUR1QjtBQUV2QixVQUFLLE1BQUwsR0FBYyxJQUFkLENBRnVCO0tBQXhCLE1BR00sSUFBRyxRQUFPLG1EQUFQLEtBQWdCLFFBQWhCLEVBQXlCO0FBQ2pDLGFBQVEsT0FBTyxLQUFQLEVBQWMsSUFBZCxDQUFSLENBRGlDO0tBQTVCLE1BRUQ7O0FBRUosU0FBSSxXQUFXLHVCQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FBWCxDQUZBO0FBR0osVUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixRQUFuQixFQUhJO0tBRkM7SUFKTSxDQUFiLENBRnVCO0dBQXhCOztBQWlCQSxPQUFLLFNBQUwsR0FBaUIsS0FBakIsQ0FyQmdCOztBQXVCaEIsU0FBTyxJQUFQLENBdkJnQjtFQUFWLENBTnNCO0NBQXZCOzs7Ozs7QUFxQ0EsU0FBUyxRQUFULEdBQW1CO0FBQ3pCLEtBQUcsVUFBVSxNQUFWLEtBQXFCLENBQXJCLEVBQXdCLE9BQU8sRUFBUCxDQUEzQjs7QUFFQSxLQUFHLFVBQVUsTUFBVixJQUFvQixDQUFwQixFQUFzQixFQUF6QjtDQUhNOzs7Ozs7QUFZQSxJQUFNLHNCQUFPLFNBQVAsSUFBTyxHQUFVLEVBQVY7Ozs7Ozs7OztBQ3BFcEI7Ozs7O0FBT0EsSUFBTSxhQUFhLENBQ2xCLFFBRGtCLEVBRWxCLFNBRmtCLEVBR2xCLFFBSGtCLEVBSWxCLFNBSmtCLEVBS2xCLEtBTGtCLEVBTWxCLElBTmtCLEVBT2xCLElBUGtCLEVBUWxCLElBUmtCLEVBUVosSUFSWSxFQVFOLElBUk0sRUFRQSxJQVJBLEVBUU0sSUFSTixFQVNsQixNQVRrQixFQVVsQixRQVZrQixFQVdsQixPQVhrQixFQVlsQixHQVprQixDQUFiOztBQWVOLElBQU0sWUFBWSxDQUNqQixNQURpQixFQUVqQixLQUZpQixFQUdqQixPQUhpQixDQUFaOztBQU1OLElBQU0sSUFBSSxFQUFKOztBQUVOLFdBQVcsT0FBWCxDQUFtQixVQUFTLEdBQVQsRUFBYTtBQUMvQixHQUFFLEdBQUYsSUFBUywwQkFBVSxHQUFWLENBQVQsQ0FEK0I7Q0FBYixDQUFuQjs7QUFJQSxVQUFVLE9BQVYsQ0FBa0IsVUFBUyxHQUFULEVBQWE7QUFDOUIsR0FBRSxHQUFGLElBQVMsMEJBQVUsR0FBVixDQUFULENBRDhCO0NBQWIsQ0FBbEI7O2tCQUllOzs7Ozs7OztBQ3RDZixJQUFNLFFBQVE7O0FBRVYsVUFBTSxjQUFTLEdBQVQsRUFBYTtBQUNmLGVBQU8sT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLEdBQS9CLEVBQW9DLE9BQXBDLENBQTRDLG1CQUE1QyxFQUFpRSxJQUFqRSxFQUF1RSxXQUF2RSxFQUFQLENBRGU7S0FBYjtBQUdOLGFBQVMsaUJBQVMsR0FBVCxFQUFjO0FBQ25CLGVBQU8sTUFBTSxPQUFOLENBQWMsR0FBZCxDQUFQLENBRG1CO0tBQWQ7QUFHVCxhQUFTLGlCQUFTLEdBQVQsRUFBYztBQUNuQixlQUFPLEdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxHQUFkLENBQVAsQ0FEbUI7S0FBZDtBQUdULGNBQVUsa0JBQVMsR0FBVCxFQUFhO0FBQ25CLFlBQUcsTUFBTSxJQUFOLENBQVcsR0FBWCxNQUFvQixRQUFwQixFQUE2QjtBQUM1QixtQkFBTyxJQUFQLENBRDRCO1NBQWhDLE1BRUs7QUFDRCxtQkFBTyxLQUFQLENBREM7U0FGTDtLQURNO0FBT1YsY0FBVSxrQkFBUyxHQUFULEVBQWE7QUFDbkIsZUFBTyxNQUFNLElBQU4sQ0FBVyxHQUFYLE1BQW9CLFFBQXBCLEdBQStCLElBQS9CLEdBQXNDLEtBQXRDLENBRFk7S0FBYjtBQUdWLGNBQVUsa0JBQVMsR0FBVCxFQUFhO0FBQ25CLGVBQU8sT0FBTyxHQUFQLEtBQWUsUUFBZixHQUEwQixJQUExQixHQUFpQyxLQUFqQyxDQURZO0tBQWI7QUFHVixZQUFRLGdCQUFTLEVBQVQsRUFBWTtBQUNoQixlQUFPLE1BQU0sSUFBTixDQUFXLEVBQVgsTUFBbUIsVUFBbkIsR0FBZ0MsSUFBaEMsR0FBdUMsS0FBdkMsQ0FEUztLQUFaOzs7O0FBTVIsOEJBQWlDO1lBQTFCLCtEQUFTLGtCQUFpQjtZQUFiLCtEQUFTLGtCQUFJOztBQUM3QixhQUFLLElBQUksQ0FBSixJQUFTLE1BQWQsRUFBc0I7QUFDbEIsZ0JBQUksT0FBTyxjQUFQLENBQXNCLENBQXRCLENBQUosRUFBOEI7QUFDMUIsdUJBQU8sQ0FBUCxJQUFZLE9BQU8sQ0FBUCxDQUFaLENBRDBCO2FBQTlCO1NBREo7QUFLQSxlQUFPLE1BQVAsQ0FONkI7S0E5QnZCOzs7OztBQXlDVixvQ0FBVztBQUNQLFlBQU0sU0FBUyxLQUFLLE1BQUwsR0FBYyxRQUFkLEdBQXlCLFNBQXpCLENBQW1DLENBQW5DLElBQXdDLE9BQU8sSUFBSSxJQUFKLEVBQVAsQ0FBeEMsQ0FEUjtBQUVWLGVBQU8sTUFBUCxDQUZVO0tBekNEO0FBNkNWLDBCQUFNO0FBQ0YsZUFBTyxPQUFPLE1BQVAsQ0FBYyxJQUFkLENBQVAsQ0FERTtLQTdDSTtBQWdEVixrQ0FBVSxLQUFJO0FBQ1YsZUFBTyxLQUFLLFNBQUwsQ0FBZSxHQUFmLEVBQW9CLElBQXBCLENBQVAsQ0FEVTtLQWhESjtBQW1EVixvQ0FBK0I7WUFBckIsNkRBQU8sa0JBQWM7WUFBViw0REFBTSxrQkFBSTs7QUFDL0IsWUFBSSxPQUFPLElBQVA7WUFDQSxRQUFRLEdBQVIsQ0FGMkI7QUFHL0IsWUFBSSxRQUFRLEdBQVIsRUFBYTtBQUNiLGdCQUFJLEtBQUssQ0FBTCxLQUFXLEdBQVgsRUFBZ0IsT0FBTyxLQUFLLFNBQUwsQ0FBZSxDQUFmLENBQVAsQ0FBcEI7QUFDQSxnQkFBSSxLQUFLLEtBQUssTUFBTCxHQUFjLENBQWQsQ0FBTCxJQUF5QixHQUF6QixFQUE4QjtBQUM5Qix1QkFBTyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBQyxDQUFELENBQXRCLENBRDhCO2FBQWxDOztBQUlBLGdCQUFJLEtBQUssT0FBTCxDQUFhLEdBQWIsS0FBcUIsQ0FBQyxDQUFELEVBQUk7QUFDekIsdUJBQU8sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFQLENBRHlCOztBQUd6QixxQkFBSyxPQUFMLENBQWEsVUFBUyxHQUFULEVBQWM7QUFDdkIsd0JBQUksTUFBTSxHQUFOLENBQUosRUFBZ0I7QUFDWixnQ0FBUSxNQUFNLEdBQU4sQ0FBUixDQURZO3FCQUFoQixNQUVPO0FBQ0gsNEJBQUksS0FBSixDQUFVLEdBQVYsRUFBZSxrQkFBa0IsSUFBbEIsR0FBeUIsZ0JBQXpCLENBQWYsQ0FERztxQkFGUDtpQkFEUyxDQUFiLENBSHlCO0FBVXpCLHVCQUFPLEtBQVAsQ0FWeUI7YUFBN0I7U0FOSjtLQXREVTtDQUFSO2tCQTJFUzs7Ozs7Ozs7Ozs7QUMzRWY7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDcEIsVUFEb0IsUUFDcEIsQ0FBWSxPQUFaLEVBQWlDO01BQVosK0RBQU8sb0JBQUs7O3dCQURiLFVBQ2E7O2dFQURiLHFCQUViLFNBQVMsU0FEaUI7RUFBakM7O2NBRG9COztzQkFLTDtBQUNkLFVBQU8sRUFBUCxDQURjOztvQkFHRCxLQUFJO0FBQ2pCLGlCQUFJLElBQUosQ0FBUyxxQ0FBVCxFQURpQjs7OztzQkFJSDtBQUNkLE9BQUksVUFBVSxFQUFWLENBRFU7QUFFZCxPQUFJLFFBQVEsS0FBSyxTQUFMLENBRkU7QUFHZCxPQUFJLE1BQU0sS0FBSyxRQUFMLENBSEk7O0FBS2Qsd0JBQW1CLEtBQUssRUFBTCxNQUFuQixDQUxjO0FBTWQsUUFBSSxJQUFJLElBQUosSUFBWSxLQUFoQixFQUFzQjtBQUNyQixlQUFjLGNBQVMsTUFBTSxJQUFOLE9BQXZCLENBRHFCO0lBQXRCO0FBR0EsZ0JBQVcsWUFBTyxhQUFsQixDQVRjOzs7O1FBWksiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlLmpzJ1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZy5qcydcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0Tm9kZSBleHRlbmRzIE5vZGUge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHRleHQgPSAnJyl7XG5cdFx0c3VwZXIoJyN0ZXh0JywgcGFyZW50KVxuXHRcdHRoaXMudGV4dCA9IHRleHRcblx0fVxuXG5cdGdldCBpbm5lckhUTUwoKXtcblx0XHRyZXR1cm4gdGhpcy50ZXh0XG5cdH1cblx0c2V0IGlubmVySFRNTCh0ZXh0KXtcblx0XHR0aGlzLnRleHQgPSB0ZXh0XG5cdH1cblxuXHRnZXQgb3V0ZXJIVE1MKCl7XG5cdFx0cmV0dXJuIHRoaXMuaW5uZXJIVE1MXG5cdH1cbn0iLCJpbXBvcnQgXyBmcm9tICcuL3V0aWwuanMnXG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nLmpzJ1xuaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlLmpzJ1xuaW1wb3J0IGggZnJvbSAnLi90YWcuanMnXG5pbXBvcnQgYnJvd3NlckV2ZW50IGZyb20gJy4vYnJvd3NlckV2ZW50LmpzJ1xuXG5jb25zdCBoYXNoID0gXy5oYXNoXG5jb25zdCBub3JtYWxpemUgPSBfLm5vcm1hbGl6ZVxuY29uc3QgZXh0ZW5kID0gXy5leHRlbmRcbmNvbnN0IGlzRnVuYyA9IF8uaXNGdW5jXG5cbmNsYXNzIENvbXBvbmVudHtcblx0Y29uc3RydWN0b3IoZG9tRm49ZnVuY3Rpb24oKXtyZXR1cm4gJyd9LCB7ZGF0YT1oYXNoKCksIGNvbXBvbmVudHM9aGFzaCgpLCBtZXRob2RzPWhhc2goKSwgaW5pdD1oYXNoKCksIGNyZWF0ZT1oYXNoKCksIHJlYWR5PWhhc2goKX0pe1xuXHRcdHRoaXMuJGRhdGEgPSBkYXRhXG5cdFx0dGhpcy4kZG9tRm4gPSBkb21GblxuXHRcdHRoaXMuJGNvbXBvbmVudHMgPSBjb21wb25lbnRzXG5cdFx0dGhpcy4kbWV0aG9kcyA9IG1ldGhvZHNcblx0XHQvKlxuXHRcdCAqIGxpZmUgY2lyY2xlXG5cdFx0ICovXG5cdFx0dGhpcy4kaW5pdCA9IGluaXRcblx0XHR0aGlzLiRjcmVhdGUgPSBjcmVhdGVcblx0XHR0aGlzLiRyZWFkeSA9IHJlYWR5XG5cblx0XHR0aGlzLiRzY29wZSA9IGhhc2goKVxuXHRcdHRoaXMuJHBhcmVudCA9IG51bGxcblx0XHR0aGlzLiRjaGlsZHJlbiA9IFtdXG5cblx0XHR0aGlzLl9pbml0KClcblx0XHR0aGlzLiRkb20gPSB0aGlzLmdldERvbSgpXG5cdH1cblxuXHRnZXREb20oKXtcblx0XHRyZXR1cm5cdHRoaXMuJGRvbUZuLmNhbGwodGhpcy4kc2NvcGUpXG5cdH1cblx0Lypcblx0ICogcHJpdmF0ZVxuXHQgKi9cblx0X2luaXQoKXtcblx0XHR0aGlzLmluaXQoKVxuXHRcdC8vZ2V0IGRvbVxuXHRcdGV4dGVuZCh0aGlzLiRzY29wZSwgdGhpcy4kZGF0YSlcblx0XHRleHRlbmQodGhpcy4kc2NvcGUsIHRoaXMuJG1ldGhvZHMpXG5cblx0XHQvL2NvbXBvbmVudHMgaW5pdGlhbFxuXHRcdE9iamVjdC5rZXlzKHRoaXMuJGNvbXBvbmVudHMpLmZvckVhY2goKGNvbXBvbmVudE5hbWUpPT57XG5cdFx0XHR0aGlzLiRjaGlsZHJlbi5wdXNoKHtcblx0XHRcdFx0cGFyZW50OiB0aGlzLiRwYXJlbnQsXG5cdFx0XHRcdG5hbWU6IGNvbXBvbmVudE5hbWUsXG5cdFx0XHRcdGJvZHk6IHRoaXMuJGNvbXBvbmVudHNbY29tcG9uZW50TmFtZV1cblx0XHRcdH0pXG5cdFx0fSlcblx0XHR0aGlzLmNyZWF0ZSgpXG5cdH1cblxuXHQvKlxuICAgICAqIGxpZmUgY2lyY2xlXG5cdCAqL1xuXHRfY2FsbChvYmo9aGFzaCgpKXtcblx0XHRpZighb2JqKSByZXR1cm4gO1xuXHRcdGZvcihsZXQgZm5OYW1lIGluIG9iail7XG5cdFx0XHRvYmpbZm5OYW1lXS5jYWxsKHRoaXMuJHNjb3BlKVxuXHRcdH1cblx0fVxuXHRpbml0KCl7XG5cdFx0dGhpcy5fY2FsbCh0aGlzLiRpbml0KVxuXHR9XG5cdGNyZWF0ZShvYmope1xuXHRcdHRoaXMuX2NhbGwodGhpcy4kY3JlYXRlKVxuXHR9XG5cdHJlYWR5KG9iail7XG5cdFx0Lypcblx0XHQgKiBiaW5kIGJyb3dzZXIgZXZlbnQgYWZ0ZXIgZG9tIGlzIHJlYWR5XG5cdFx0ICovXG5cdFx0dGhpcy4kZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLiRkb20uaWQpXG5cblx0XHR0aGlzLl9iaW5kQnJvd2VyRXZlbnQoKVxuXHRcdHRoaXMuX2NhbGwodGhpcy4kcmVhZHkpXG5cdH1cblx0LypcbiAgICAgKue7keWumua1j+iniOWZqOS6i+S7tlxuXHQgKi9cblx0X2JpbmRCcm93ZXJFdmVudCgpe1xuXHRcdGxldCBlbCA9IHRoaXMuJGVsLFxuXHRcdFx0ZXZlbnRzID0gdGhpcy4kZG9tLmV2ZW50c1xuXG5cdFx0Lypcblx0XHQgKiDlop7liqDkuovku7blip/og71cblx0XHQgKi9cblx0XHRjb25zdCAkZG9tID0gYnJvd3NlckV2ZW50KGVsKVxuXHRcdGZvcihsZXQgZVR5cGUgaW4gZXZlbnRzKXtcblx0XHRcdGxldCBlQXJyYXkgPSBldmVudHNbZVR5cGVdXG5cdFx0XHRlQXJyYXkuZm9yRWFjaCgoZUNiTmFtZSk9Pntcblx0XHRcdFx0aWYoaXNGdW5jKHRoaXMuJHNjb3BlW2VDYk5hbWVdKSl7XG5cdFx0XHRcdFx0bG9nLmluZm8odGhpcy4kc2NvcGVbZUNiTmFtZV0udG9TdHJpbmcoKSlcblx0XHRcdFx0XHQkZG9tLm9uKGVUeXBlLCB0aGlzLiRzY29wZVtlQ2JOYW1lXSlcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0bG9nLndhcm4oJ01pc3NpbmcgJyArIGVDYk5hbWUgKyAnbWV0aG9kLicpXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXHRcdFxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCl7XG5cdGxldCBwbGV4ID0gaGFzaCgpXG5cblx0cGxleC5jcmVhdGVDb21wb25lbnQgPSBmdW5jdGlvbihvcHRpb25zID0gaGFzaCgpKXtcblx0XHRyZXR1cm4gbmV3IENvbXBvbmVudChvcHRpb25zKVxuXHR9XG5cdHBsZXgucmVuZGVyID0gZnVuY3Rpb24oY29tcG9uZW50LCBkYXRhKXtcblxuXHR9XG59XG5cbi8qXG4gKiBkZW1vXG4gKi9cbmxldCBNeUNvbXBvbmVudCA9IGZ1bmN0aW9uKHN0ciA9ICd3d3cuaXdhaW1haS5jb20nKXtcblx0cmV0dXJuIGguZGl2KFxuXHRcdFx0eyBcblx0XHRcdFx0Y2xhc3M6ICdjb250YWluZXInLFxuXHRcdFx0XHRvbkNsaWNrOiAnaGVsbG8nXG5cdFx0XHR9LFxuXHRcdFx0aC5oZWFkZXIoXG5cdFx0XHRcdFx0aC5kaXYoJ2hlbGxvIHdvcmxkIScpXG5cdFx0XHRcdCksXG5cdFx0XHRoLmFydGljbGUoXG5cdFx0XHRcdGguZGl2KFxuXHRcdFx0XHRcdFx0dGhpcy5wYXJhZ3JhcGggKyB0aGlzLm5hbWVcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCksXG5cdFx0XHRoLmZvb3Rlcihcblx0XHRcdFx0aC5pbnB1dCh7XG5cdFx0XHRcdFx0dHlwZTogJ3RleHQnXG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRoLmEoe1xuXHRcdFx0XHRcdFx0aHJlZjogc3RyXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0aGlzLm5hbWVcblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0KVxufVxuXG5sZXQgcm9vdEFwcCA9IG5ldyBDb21wb25lbnQoTXlDb21wb25lbnQse1xuXHRcdGRhdGE6IHtcblx0XHRcdG5hbWU6ICdiYWlkdScsXG5cdFx0XHRwYXJhZ3JhcGg6ICdteSBuYW1lIGlzIHlhbmd4aWFvZnUnXG5cdFx0fSxcblx0XHRtZXRob2RzOiB7XG5cdFx0XHRoZWxsbygpe1xuXHRcdFx0XHRhbGVydCgnbXkgbmFtZSBpcyB5YW5neGlhb2Z1IScpXG5cdFx0XHR9XG5cdFx0fVx0XG5cdH0pXG5cbmxldCBhcHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbi8vIGFwcC5pbm5lckhUTUwgPSAoTXlDb21wb25lbnQuaW5uZXJIVE1MKVxuYXBwLmlubmVySFRNTCA9IChyb290QXBwLiRkb20ub3V0ZXJIVE1MKVxucm9vdEFwcC5yZWFkeSgpXG5cblxuLy9jb25zb2xlLmxvZygnaHRtbCcsIE15Q29tcG9uZW50LCBNeUNvbXBvbmVudC5pbm5lckhUTUwpXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWwpIHtcbiAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAgIGVsZW1lbnQ6ICRlbCxcbiAgICAgICAgZXZlbnRIYW5kbGVyOiB7XG4gICAgICAgICAgICBldmVudHM6IHt9LFxuICAgICAgICAgICAgYmluZEV2ZW50OiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2ssIHRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAvL2JpbmQgZXZlbnQgbGlzdGVuZXIgdG8gRE9NIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvL+WcqOWGkuazoemYtuauteinpuWPkVxuICAgICAgICAgICAgICAgIHRhcmdldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2ssIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSB0aGlzLmV2ZW50c1tldmVudF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudElkOiBjb3VudGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SWQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ldmVudHNbZXZlbnRdWzBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIHJldHVybiBhbGwgbGlzdGVuIGV2ZW50c1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBhbGw6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ldmVudHNbZXZlbnRdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5iaW5kRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kRXZlbnQgPSB0aGlzLmZpbmRFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmb3VuZEV2ZW50LmV2ZW50LCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy91cGRhdGUgZXZlbnRzIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzID0gdGhpcy5ldmVudHNbZXZlbnRdLmZpbHRlcihmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5jb3VudGVyICE9PSBldmVudC5jb3VudGVyO1xuICAgICAgICAgICAgICAgICAgICB9LCBldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24oZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuYWxsKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudW5iaW5kRXZlbnQoZSwgdGFyZ2V0RWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiDmo4Dmn6Xor6Xkuovku7bnsbvlnovmmK/lkKbooqvnu5HlrppcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaXNCaW5kaW5nOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbmRFdmVudChldmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb246IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIuYmluZEV2ZW50KGV2ZW50LCBjYWxsYmFjaywgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgLypcbiAgICAgICAgICogYmluZCBvbmNlXG4gICAgICAgICAqL1xuICAgICAgICBvbmNlOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLnJlbW92ZShldmVudCk7XG4gICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBjYWxsYmFjayk7XG4gICAgICAgIH0sXG4gICAgICAgIG9mZjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLnVuYmluZEV2ZW50KGV2ZW50LCB0aGlzLmVsZW1lbnQpO1xuICAgICAgICB9LFxuICAgICAgICAvKlxuICAgICAgICAgKiBkZWxlZ2F0ZSDkuovku7Ys57uZ5Yqo5oCB5re75Yqg5YWD57Sg57uR5a6a55uR5ZCs5LqL5Lu2XG4gICAgICAgICAqL1xuICAgICAgICAvLyBkZWxlZ2F0ZTogZnVuY3Rpb24oc2VsZWN0b3IsIGV2ZW50LCBmbikge1xuICAgICAgICAvLyAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyAgICAgc2VsZi5vbihldmVudCwgZnVuY3Rpb24oZSkge1xuICAgICAgICAvLyAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgLy8gICAgICAgICB2YXIgY2hpbGRyZW4gPSBzZWxmLmNyZWF0ZShzZWxmLnNlbGVjdG9yICsgJyAnICsgc2VsZWN0b3IpLmVsZW1lbnRzO1xuICAgICAgICAvLyAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09IGNoaWxkKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBmbi5jYWxsKGNvbnRleHQsIGUpO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfSlcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8qXG4gICAgICAgICAqIOinpuWPkeaMh+WumuS6i+S7tlxuICAgICAgICAgKi9cbiAgICAgICAgLy/mtY/op4jlmajkuovku7bvvIzpu5jorqTlhpLms6FcbiAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICAgICAgdmFyIGVsID0gdGhpcy5lbGVtZW50O1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgICAgICAgIGV2ZW50LmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBldmVudFxufVxuIiwiLypcbiogZGVidWdcbiovXG5jb25zdCBDb25maWcgPSB7XG5cdGRlYnVnOiB0cnVlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZXJyb3IoKXtcblx0XHRpZihDb25maWcuZGVidWcpe1xuXHRcdFx0Y29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpXG5cdFx0fVxuXHR9LFxuXHRpbmZvKCl7XG5cdFx0aWYoQ29uZmlnLmRlYnVnKXtcblx0XHRcdGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcblx0XHR9XG5cdH0sXG5cdHdhcm4oKXtcblx0XHRpZihDb25maWcuZGVidWcpe1xuXHRcdFx0Y29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgXyBmcm9tICcuL3V0aWwuanMnXG5cbmNvbnN0IHJhbmRvbVN0ciA9IF8ucmFuZG9tU3RyXG5jb25zdCBoYXNoID0gXy5oYXNoXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGV7XG5cdGNvbnN0cnVjdG9yKHRhZ05hbWUgPSAnJywgcGFyZW50ID0gbnVsbCl7XG5cdFx0dGhpcy5pZCA9IHJhbmRvbVN0cigpXG5cdFx0dGhpcy5odG1sID0gJydcblx0XHR0aGlzLmF0dHJpYnV0ZSA9IGhhc2goKVxuXHRcdHRoaXMubm9kZVR5cGUgPSAnJ1xuXHRcdHRoaXMubm9kZU5hbWUgPSB0YWdOYW1lXG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnRcblx0XHR0aGlzLmNoaWxkcmVuID0gW11cblx0XHR0aGlzLnNjb3BlID0gaGFzaCgpXG5cdFx0dGhpcy5ldmVudHMgPSBoYXNoKClcblx0fVxuXG5cdGdldCBpbm5lckhUTUwoKXtcblx0XHRsZXQgX2h0bWwgPSAnJ1xuXHRcdGlmKHRoaXMuY2hpbGRyZW4pe1xuXHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKXtcblx0XHRcdFx0aWYoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKXtcblx0XHRcdFx0XHRfaHRtbCArPSBjaGlsZC5vdXRlckhUTUxcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fWVsc2V7XG5cdFx0XHRfaHRtbCA9IHRoaXMuaW5uZXJIVE1MXG5cdFx0fVxuXHRcdHJldHVybiBfaHRtbFxuXHR9XG5cdHNldCBpbm5lckhUTUwoX2h0bWwpe1xuXHRcdGlmKF9odG1sIGluc3RhbmNlb2YgTm9kZSl7XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gW11cblx0XHRcdHRoaXMuY2hpbGRyZW4ucHVzaChfaHRtbClcblx0XHR9ZWxzZSBpZihBcnJheS5pc0FycmF5KF9odG1sKSl7XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gX2h0bWxcblx0XHR9XG5cdH1cblxuXHRnZXQgb3V0ZXJIVE1MKCl7XG5cdFx0bGV0IGF0dHJzID0gdGhpcy5hdHRyaWJ1dGVcblx0XHRsZXQgYXR0ckRvbSA9ICcnXG5cdFx0bGV0IHRhZyA9IHRoaXMubm9kZU5hbWVcblxuXHRcdGF0dHJEb20gKz0gYCBpZD1cIiR7dGhpcy5pZH1cImBcblx0XHRmb3IobGV0IGF0dHIgaW4gYXR0cnMpe1xuXHRcdFx0Lypcblx0XHRcdCAqIGV2ZW50cyBjb2xsZWN0XG5cdFx0XHQgKi9cblx0XHRcdGlmKGF0dHIuc3Vic3RyKDAsIDIpID09PSAnb24nKXtcblx0XHRcdFx0bGV0IGV2ZW50VHlwZSA9IGF0dHIuc3Vic3RyKDIpXG5cdFx0XHRcdGV2ZW50VHlwZSA9IGV2ZW50VHlwZS50b0xvd2VyQ2FzZSgpXG5cdFx0XHRcdGlmKCF0aGlzLmV2ZW50c1tldmVudFR5cGVdKXtcblx0XHRcdFx0XHR0aGlzLmV2ZW50c1tldmVudFR5cGVdID0gW11cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmV2ZW50c1tldmVudFR5cGVdLnB1c2goYXR0cnNbYXR0cl0pXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0YXR0ckRvbSArPSBgJHthdHRyfT1cIiR7YXR0cnNbYXR0cl19XCJgXHRcdFx0XHRcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gYDwke3RhZ30ke2F0dHJEb219PiR7dGhpcy5pbm5lckhUTUx9PC8ke3RhZ30+YFxuXHR9XG59XG4iLCJpbXBvcnQgXyBmcm9tICcuL3V0aWwuanMnXG5pbXBvcnQgTm9kZSBmcm9tICcuL25vZGUuanMnXG5pbXBvcnQgVm9pZE5vZGUgZnJvbSAnLi92b2lkTm9kZS5qcydcbmltcG9ydCBUZXh0Tm9kZSBmcm9tICcuL1RleHROb2RlLmpzJ1xuXG5jb25zdCBleHRlbmQgPSBfLmV4dGVuZFxuY29uc3QgaGFzaCA9IF8uaGFzaFxuY29uc3QgZm9ybWF0U3RyID0gXy5mb3JtYXRTdHJcblxuLy9wcmltaXRpdmVcbmV4cG9ydCBmdW5jdGlvbiBzaW5nbGVUYWcodGFnKXtcblx0cmV0dXJuIGZ1bmN0aW9uKGF0dHJzID0ge30pe1xuXHRcdGxldCB2b2lkTm9kZSA9IG5ldyBWb2lkTm9kZSh0YWcpXG5cdFx0dm9pZE5vZGUuYXR0cmlidXRlID0gYXR0cnNcblx0XG5cdFx0cmV0dXJuIHZvaWROb2RlXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvdWJsZVRhZyh0YWcpe1xuXHQvKlxuXHQgKiBAcGFyYW1zIGF0dHJzIHtvYmplY3R9XG5cdCAqIEBwYXJhbXMgaHRtbCB7c3RyaW5nfVxuXHQgKiBAcGFyYW1zIE5vZGUgaW5zdGFuY2Uge2NsYXNzIGluc3RhbmNlfVxuXHQgKi9cblx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0bGV0IG5vZGUgPSBuZXcgTm9kZSh0YWcpXG5cdFx0bGV0IGF0dHJzID0gaGFzaCgpXG5cblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID4gMCl7XG5cdFx0XHRsZXQgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKVxuXHRcdFx0YXJncy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRpZihpdGVtIGluc3RhbmNlb2YgTm9kZSl7XG5cdFx0XHRcdFx0bm9kZS5jaGlsZHJlbi5wdXNoKGl0ZW0pXG5cdFx0XHRcdFx0aXRlbS5wYXJlbnQgPSBub2RlXG5cdFx0XHRcdH1lbHNlIGlmKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdFx0YXR0cnMgPSBleHRlbmQoYXR0cnMsIGl0ZW0pXG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdC8vc3RyaW5nXG5cdFx0XHRcdFx0bGV0IHRleHROb2RlID0gbmV3IFRleHROb2RlKG5vZGUsIGl0ZW0pXG5cdFx0XHRcdFx0bm9kZS5jaGlsZHJlbi5wdXNoKHRleHROb2RlKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdFxuXHRcdG5vZGUuYXR0cmlidXRlID0gYXR0cnNcblxuXHRcdHJldHVybiBub2RlXG5cdH1cbn1cblxuLypcbiAqIHNlcXVlbmNlIHRhZ3NcbiAqIEBwYXJhbXMge3RhZyBuYW1lIHwgYXJyYXl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZSgpe1xuXHRpZihhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gJydcblxuXHRpZihhcmd1bWVudHMubGVuZ3RoID49IDEpe1xuXG5cdH1cbn1cblxuLypcbiAqIGxvb3AgYW4gdGFnXG4gKiBAcGFyYW1zIHtpdGVtIGluIGl0ZW1zfVxuICovXG5leHBvcnQgY29uc3Qgc2ZvciA9IGZ1bmN0aW9uKCl7XG5cbn1cblxuXG5cblxuXG5cblxuIiwiaW1wb3J0IHtcblx0c2luZ2xlVGFnLFxuXHRkb3VibGVUYWdcbn0gZnJvbSAnLi9wcmltaXRpdmUuanMnXG4vKlxuICogY2xvc2UgdGFnXG4qL1xuY29uc3QgQ0xPU0VfVEFHUyA9IFtcblx0J2hlYWRlcicsXG5cdCdhcnRpY2xlJyxcblx0J2Zvb3RlcicsXG5cdCdzZWN0aW9uJyxcblx0J2RpdicsXG5cdCd1bCcsXG5cdCdsaScsXG5cdCdoMScsICdoMicsICdoMycsICdoNCcsICdoNScsXG5cdCdmb3JtJyxcblx0J2J1dHRvbicsXG5cdCdsYWJlbCcsXG5cdCdhJ1xuXVxuXG5jb25zdCBPUEVOX1RBR1MgPSBbXG5cdCdtZXRhJyxcblx0J2ltZycsXG5cdCdpbnB1dCdcbl1cblxuY29uc3QgaCA9IHt9XG5cbkNMT1NFX1RBR1MuZm9yRWFjaChmdW5jdGlvbih0YWcpe1xuXHRoW3RhZ10gPSBkb3VibGVUYWcodGFnKVxufSlcblxuT1BFTl9UQUdTLmZvckVhY2goZnVuY3Rpb24odGFnKXtcblx0aFt0YWddID0gc2luZ2xlVGFnKHRhZylcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGgiLCJjb25zdCB1dGlscyA9IHtcbiAgICAvKnR5cGVzKi9cbiAgICB0eXBlOiBmdW5jdGlvbihvYmope1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikucmVwbGFjZSgvXlxcW29iamVjdCAoLispXFxdJC8sICckMScpLnRvTG93ZXJDYXNlKCk7XG4gICAgfSxcbiAgICBpc0FycmF5OiBmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKTtcbiAgICB9LFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gW10uc2xpY2UuY2FsbChvYmopO1xuICAgIH0sXG4gICAgaXNPYmplY3Q6IGZ1bmN0aW9uKG9iail7XG4gICAgICAgIGlmKHV0aWxzLnR5cGUob2JqKSA9PT0gJ29iamVjdCcpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBpc051bWJlcjogZnVuY3Rpb24obnVtKXtcbiAgICAgICAgcmV0dXJuIHV0aWxzLnR5cGUobnVtKSA9PT0gJ251bWJlcicgPyB0cnVlIDogZmFsc2U7XG4gICAgfSxcbiAgICBpc1N0cmluZzogZnVuY3Rpb24oc3RyKXtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0sXG4gICAgaXNGdW5jOiBmdW5jdGlvbihmbil7XG4gICAgICAgIHJldHVybiB1dGlscy50eXBlKGZuKSA9PT0gJ2Z1bmN0aW9uJyA/IHRydWUgOiBmYWxzZTtcbiAgICB9LFxuICAgIC8qXG4gICAgICogZXh0ZW5kIGFuIG9iamVjdFxuICAgICAqL1xuICAgIGV4dGVuZChvbGRPYmogPSB7fSwgbmV3T2JqID0ge30pIHtcbiAgICAgICAgZm9yIChsZXQgbyBpbiBuZXdPYmopIHtcbiAgICAgICAgICAgIGlmIChuZXdPYmouaGFzT3duUHJvcGVydHkobykpIHtcbiAgICAgICAgICAgICAgICBvbGRPYmpbb10gPSBuZXdPYmpbb11cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2xkT2JqXG4gICAgfSxcbiAgICAvKlxuICAgICAqIOmaj+acuuaVsOeUn+aIkFxuICAgICAqL1xuICAgIHJhbmRvbVN0cigpe1xuICAgICAgICBjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpICsgTnVtYmVyKG5ldyBEYXRlKCkpXG4gICAgXHRyZXR1cm4gcmFuZG9tXG4gICAgfSxcbiAgICBoYXNoKCl7XG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgfSxcbiAgICBmb3JtYXRTdHIob2JqKXtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgJ1xcdCcpXG4gICAgfSxcbiAgICBub3JtYWxpemUocGF0aCA9ICcnLCBvYmogPSB7fSkge1xuICAgIGxldCBwQXJyID0gbnVsbCxcbiAgICAgICAgdmFsdWUgPSBvYmpcbiAgICBpZiAocGF0aCAmJiBvYmopIHtcbiAgICAgICAgaWYgKHBhdGhbMF0gPT0gJy4nKSBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMSlcbiAgICAgICAgaWYgKHBhdGhbcGF0aC5sZW5ndGggLSAxXSA9PSAnLicpIHtcbiAgICAgICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cigwLCAtMilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXRoLmluZGV4T2YoJy4nKSAhPSAtMSkge1xuICAgICAgICAgICAgcEFyciA9IHBhdGguc3BsaXQoJy4nKVxuXG4gICAgICAgICAgICBwQXJyLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtrZXldXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmVycm9yKG9iaiwgJ3RoZSB2YWx1ZSBvZiAnICsgcGF0aCArICcgaXMgdW5kZWZpbmVkLicpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxufVxufVxuZXhwb3J0IGRlZmF1bHQgdXRpbHNcbiIsImltcG9ydCBOb2RlIGZyb20gJy4vbm9kZS5qcydcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZvaWROb2RlIGV4dGVuZHMgTm9kZXtcblx0Y29uc3RydWN0b3IodGFnTmFtZSwgcGFyZW50PW51bGwpe1xuXHRcdHN1cGVyKHRhZ05hbWUsIHBhcmVudClcblx0fVxuXG5cdGdldCBpbm5lckhUTUwoKXtcblx0XHRyZXR1cm4gJydcblx0fVxuXHRzZXQgaW5uZXJIVE1MKHZhbCl7XG5cdFx0bG9nLndhcm4oJ3ZvaWQgZWxlbWVudCBjYW4gbm90IHNldCBpbm5lckhUTUwuJylcblx0fVxuXG5cdGdldCBvdXRlckhUTUwoKXtcblx0XHRsZXQgYXR0ckRvbSA9ICcnXG5cdFx0bGV0IGF0dHJzID0gdGhpcy5hdHRyaWJ1dGVcblx0XHRsZXQgdGFnID0gdGhpcy5ub2RlTmFtZVxuXG5cdFx0YXR0ckRvbSArPSBgIGlkPVwiJHt0aGlzLmlkfVwiYFxuXHRcdGZvcihsZXQgYXR0ciBpbiBhdHRycyl7XG5cdFx0XHRhdHRyRG9tICs9IGAke2F0dHJ9PVwiJHthdHRyc1thdHRyXX1cImBcblx0XHR9XG5cdFx0cmV0dXJuIGA8JHt0YWd9ICR7YXR0ckRvbX0+YFxuXHR9XG59XG5cbiJdfQ==
