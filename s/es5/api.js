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
	plex.app = null;

	plex.createComponent = function () {
		var options = arguments.length <= 0 || arguments[0] === undefined ? hash() : arguments[0];

		this.app = new Component(options);
	};
	plex.render = function (selector) {
		var container = document.getElementById(selector);
		container.innerHTML = this.app.html();
	};
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

var _observer = require('./observer/observer.js');

var _observer2 = _interopRequireDefault(_observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hash = _util2.default.hash;
var normalize = _util2.default.normalize;
var extend = _util2.default.extend;
var isFunc = _util2.default.isFunc;
var isObject = _util2.default.isObject;

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
		this.$observer = [];
		this.$parent = null;
		this.$children = [];

		this._init();
		this.$dom = null;

		/*
   * view
   */
		this.$container = null;
		this.$selector = '';
	}

	_createClass(Component, [{
		key: 'setDom',
		value: function setDom() {
			this.$dom = this.$domFn.call(this.$scope);
		}
		/*
   * private
   */

	}, {
		key: '_init',
		value: function _init() {
			var _this = this;

			this.init();

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
		value: function create() {
			this._defineReactive(this.$scope);
			this._call(this.$create);
		}
	}, {
		key: 'ready',
		value: function ready() {
			/*
    * bind browser event after dom is ready
    */
			var self = this;
			window.onload = function () {
				self.$el = document.getElementById(self.$dom.id);
				self._bindBrowerEvent();
				self._call(self.$ready);
			};
			self.$el = document.getElementById(self.$dom.id);
			self._bindBrowerEvent();
			self._call(self.$ready);
		}

		/*
   * private
   * turn an object to reactive
   */

	}, {
		key: '_defineReactive',
		value: function _defineReactive() {
			var obj = arguments.length <= 0 || arguments[0] === undefined ? hash() : arguments[0];

			var __ob__ = hash();
			__ob__ = toReactive.call(this, obj);

			function toReactive(obj) {
				var _this2 = this;

				if (isObject(obj)) {
					var observer = hash();
					for (var o in obj) {
						if (isObject(obj[o])) {
							observer[o] = toReactive(obj[o]);
						} else if (!isFunc(obj[o])) {
							observer[o] = new _observer2.default(obj, o, obj[o]);
							observer[o].addSub(function () {
								_this2.update();
							});
						}
					}
					return observer;
				}
			}
			this.$observer.push(__ob__);
		}

		/*
      *绑定浏览器事件
   */

	}, {
		key: '_bindBrowerEvent',
		value: function _bindBrowerEvent() {
			var _this3 = this;

			var el = this.$el,
			    events = this.$dom.events;

			/*
    * 增加事件功能
    */
			var $dom = (0, _browserEvent2.default)(el);

			var _loop = function _loop(eType) {
				var eArray = events[eType];
				eArray.forEach(function (eCbName) {
					if (isFunc(_this3.$scope[eCbName])) {
						_log2.default.info(_this3.$scope[eCbName].toString());
						$dom.on(eType, function () {
							_this3.$scope[eCbName]();
						});
					} else {
						_log2.default.warn('Missing ' + eCbName + 'method.');
					}
				});
			};

			for (var eType in events) {
				_loop(eType);
			}
		}
	}, {
		key: 'html',
		value: function html() {
			if (!this.$dom) {
				this.setDom();
			}
			return this.$dom.outerHTML;
		}

		/*
   * view
   */

	}, {
		key: 'update',
		value: function update() {
			this.setDom();
			console.log('html: ', this.html());
			//this._init()
			this.init();
			this.create();
			this.render('app');
			this.ready();
		}
	}, {
		key: 'render',
		value: function render(selector) {
			var container = null;
			if (selector && this.$selector && this.$selector == selector) {
				container = this.$container;
			} else if (selector) {
				container = document.getElementById(selector);
				this.$selector = selector;
				this.$container = container;
			} else {
				container = this.$container || document.body;
			}

			container.innerHTML = this.html();
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
		onClick: 'changeAge'
	}, _tag2.default.header(_tag2.default.div('hello world!')), _tag2.default.article(_tag2.default.div(this.paragraph + this.name + this.age)), _tag2.default.footer(_tag2.default.input({
		type: 'text'
	}), _tag2.default.a({
		href: str
	}, this.name)));
};

var rootApp = new Component(MyComponent, {
	data: {
		name: 'baidu',
		age: 18,
		paragraph: 'my name is yangxiaofu'
	},
	methods: {
		changeAge: function changeAge() {
			this.age = 1;
			console.log('age: ', this.age);
		}
	}
});

rootApp.render('app');
rootApp.ready();
// let app = document.getElementById('app')
// // app.innerHTML = (MyComponent.innerHTML)
// app.innerHTML = (rootApp.$dom.outerHTML)
// rootApp.ready()

// const person = {
// 	name: 'ysf',
// 	age: 18
// }

// let reactivePerson = new Observer(person, 'name', person.name)
// reactivePerson.addSub(function(){
// 	console.log('person.name', person.name)
// 	person.name = 'xiaofu'
// })
// person.name = 'yangxiaofu'

//console.log('html', MyComponent, MyComponent.innerHTML)

},{"./browserEvent.js":3,"./log.js":4,"./node.js":5,"./observer/observer.js":6,"./tag.js":8,"./util.js":9}],3:[function(require,module,exports){
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
			this.events = hash();
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

},{"./util.js":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var def = _util2.default.def;
var hasOwn = _util2.default.hasOwn;
var isObject = _util2.default.isObject;
var isFunc = _util2.default.isFunc;

var Observer = function () {
    function Observer() {
        var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var key = arguments[1];
        var val = arguments[2];

        _classCallCheck(this, Observer);

        this.obj = obj;
        this.key = key;
        this.val = val;
        this.subs = [];

        this.defineReactive(obj, key, val);
    }

    _createClass(Observer, [{
        key: 'addSub',
        value: function addSub(sub) {
            this.subs.push(sub);
        }
    }, {
        key: 'notify',
        value: function notify() {
            var subs = this.subs;
            subs.forEach(function (sub) {
                if (isFunc(sub)) {
                    sub();
                } else {
                    sub.update();
                }
            });
        }
    }, {
        key: 'defineReactive',
        value: function defineReactive(obj, key, val, doNotObserve) {
            if (obj[key].__ob__) return;

            var self = this;
            var property = Object.getOwnPropertyDescriptor(obj, key);
            if (property && property.configurable === false) {
                return;
            }

            // cater for pre-defined getter/setters
            var getter = property && property.get;
            var setter = property && property.set;

            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get: function reactiveGetter() {
                    var value = getter ? getter.call(obj) : val;

                    return value;
                },
                set: function reactiveSetter(newVal) {
                    var value = getter ? getter.call(obj) : val;
                    if (newVal === value) {
                        return;
                    }
                    if (setter) {
                        setter.call(obj, newVal);
                    } else {
                        val = newVal;
                    }
                    self.notify();
                }
            });
        }
    }]);

    return Observer;
}();

exports.default = Observer;

},{"../util":9}],7:[function(require,module,exports){
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

},{"./TextNode.js":1,"./node.js":5,"./util.js":9,"./voidNode.js":10}],8:[function(require,module,exports){
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

},{"./primitive.js":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var utils = (_utils = {
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
    }
}, _defineProperty(_utils, 'toArray', function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
        ret[i] = list[i + start];
    }
    return ret;
}), _defineProperty(_utils, 'def', function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}), _defineProperty(_utils, 'randomStr', function randomStr() {
    var random = Math.random().toString().substring(2) + Number(new Date());
    return random;
}), _defineProperty(_utils, 'hash', function hash() {
    return Object.create(null);
}), _defineProperty(_utils, 'formatStr', function formatStr(obj) {
    return JSON.stringify(obj, '\t');
}), _defineProperty(_utils, 'hasOwn', function hasOwn(obj, key) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    return hasOwnProperty.call(obj, key);
}), _defineProperty(_utils, 'normalize', function normalize() {
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
}), _utils);
exports.default = utils;

},{}],10:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9UZXh0Tm9kZS5qcyIsImxpYi9hcGkuanMiLCJsaWIvYnJvd3NlckV2ZW50LmpzIiwibGliL2xvZy5qcyIsImxpYi9ub2RlLmpzIiwibGliL29ic2VydmVyL29ic2VydmVyLmpzIiwibGliL3ByaW1pdGl2ZS5qcyIsImxpYi90YWcuanMiLCJsaWIvdXRpbC5qcyIsImxpYi92b2lkTm9kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR3FCOzs7QUFDcEIsVUFEb0IsUUFDcEIsQ0FBWSxNQUFaLEVBQThCO01BQVYsNkRBQU8sa0JBQUc7O3dCQURWLFVBQ1U7O3FFQURWLHFCQUViLFNBQVMsU0FEYzs7QUFFN0IsUUFBSyxJQUFMLEdBQVksSUFBWixDQUY2Qjs7RUFBOUI7O2NBRG9COztzQkFNTDtBQUNkLFVBQU8sS0FBSyxJQUFMLENBRE87O29CQUdELE1BQUs7QUFDbEIsUUFBSyxJQUFMLEdBQVksSUFBWixDQURrQjs7OztzQkFJSjtBQUNkLFVBQU8sS0FBSyxTQUFMLENBRE87Ozs7UUFiSzs7Ozs7Ozs7Ozs7Ozs7a0JDcUxOLFlBQVU7QUFDeEIsS0FBTSxPQUFPLE1BQVAsQ0FEa0I7QUFFeEIsTUFBSyxHQUFMLEdBQVcsSUFBWCxDQUZ3Qjs7QUFJeEIsTUFBSyxlQUFMLEdBQXVCLFlBQTBCO01BQWpCLGdFQUFVLHNCQUFPOztBQUNoRCxPQUFLLEdBQUwsR0FBVyxJQUFJLFNBQUosQ0FBYyxPQUFkLENBQVgsQ0FEZ0Q7RUFBMUIsQ0FKQztBQU94QixNQUFLLE1BQUwsR0FBYyxVQUFTLFFBQVQsRUFBa0I7QUFDL0IsTUFBSSxZQUFZLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFaLENBRDJCO0FBRS9C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QUFPLEVBQVAsQ0FEYzs7b0JBR0QsS0FBSTtBQUNqQixpQkFBSSxJQUFKLENBQVMscUNBQVQsRUFEaUI7Ozs7c0JBSUg7QUFDZCxPQUFJLFVBQVUsRUFBVixDQURVO0FBRWQsT0FBSSxRQUFRLEtBQUssU0FBTCxDQUZFO0FBR2QsT0FBSSxNQUFNLEtBQUssUUFBTCxDQUhJOztBQUtkLHdCQUFtQixLQUFLLEVBQUwsTUFBbkIsQ0FMYztBQU1kLFFBQUksSUFBSSxJQUFKLElBQVksS0FBaEIsRUFBc0I7QUFDckIsZUFBYyxjQUFTLE1BQU0sSUFBTixPQUF2QixDQURxQjtJQUF0QjtBQUdBLGdCQUFXLFlBQU8sYUFBbEIsQ0FUYzs7OztRQVpLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBOb2RlIGZyb20gJy4vbm9kZS5qcydcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cuanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dE5vZGUgZXh0ZW5kcyBOb2RlIHtcblx0Y29uc3RydWN0b3IocGFyZW50LCB0ZXh0ID0gJycpe1xuXHRcdHN1cGVyKCcjdGV4dCcsIHBhcmVudClcblx0XHR0aGlzLnRleHQgPSB0ZXh0XG5cdH1cblxuXHRnZXQgaW5uZXJIVE1MKCl7XG5cdFx0cmV0dXJuIHRoaXMudGV4dFxuXHR9XG5cdHNldCBpbm5lckhUTUwodGV4dCl7XG5cdFx0dGhpcy50ZXh0ID0gdGV4dFxuXHR9XG5cblx0Z2V0IG91dGVySFRNTCgpe1xuXHRcdHJldHVybiB0aGlzLmlubmVySFRNTFxuXHR9XG59IiwiaW1wb3J0IF8gZnJvbSAnLi91dGlsLmpzJ1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZy5qcydcbmltcG9ydCBOb2RlIGZyb20gJy4vbm9kZS5qcydcbmltcG9ydCBoIGZyb20gJy4vdGFnLmpzJ1xuaW1wb3J0IGJyb3dzZXJFdmVudCBmcm9tICcuL2Jyb3dzZXJFdmVudC5qcydcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuL29ic2VydmVyL29ic2VydmVyLmpzJ1xuXG5jb25zdCBoYXNoID0gXy5oYXNoXG5jb25zdCBub3JtYWxpemUgPSBfLm5vcm1hbGl6ZVxuY29uc3QgZXh0ZW5kID0gXy5leHRlbmRcbmNvbnN0IGlzRnVuYyA9IF8uaXNGdW5jXG5jb25zdCBpc09iamVjdCA9IF8uaXNPYmplY3RcblxuY2xhc3MgQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihkb21Gbj1mdW5jdGlvbigpe3JldHVybiAnJ30sIHtkYXRhPWhhc2goKSwgY29tcG9uZW50cz1oYXNoKCksIG1ldGhvZHM9aGFzaCgpLCBpbml0PWhhc2goKSwgY3JlYXRlPWhhc2goKSwgcmVhZHk9aGFzaCgpfSl7XG5cdFx0dGhpcy4kZGF0YSA9IGRhdGFcblx0XHR0aGlzLiRkb21GbiA9IGRvbUZuXG5cdFx0dGhpcy4kY29tcG9uZW50cyA9IGNvbXBvbmVudHNcblx0XHR0aGlzLiRtZXRob2RzID0gbWV0aG9kc1xuXHRcdC8qXG5cdFx0ICogbGlmZSBjaXJjbGVcblx0XHQgKi9cblx0XHR0aGlzLiRpbml0ID0gaW5pdFxuXHRcdHRoaXMuJGNyZWF0ZSA9IGNyZWF0ZVxuXHRcdHRoaXMuJHJlYWR5ID0gcmVhZHlcblxuXHRcdHRoaXMuJHNjb3BlID0gaGFzaCgpXG5cdFx0dGhpcy4kb2JzZXJ2ZXIgPSBbXVxuXHRcdHRoaXMuJHBhcmVudCA9IG51bGxcblx0XHR0aGlzLiRjaGlsZHJlbiA9IFtdXG5cblx0XHR0aGlzLl9pbml0KClcblx0XHR0aGlzLiRkb20gPSBudWxsXG5cblx0XHQvKlxuXHRcdCAqIHZpZXdcblx0XHQgKi9cblx0XHR0aGlzLiRjb250YWluZXIgPSBudWxsXG5cdFx0dGhpcy4kc2VsZWN0b3IgPSAnJ1xuXHR9XG5cblx0c2V0RG9tKCl7XG5cdFx0dGhpcy4kZG9tID1cdHRoaXMuJGRvbUZuLmNhbGwodGhpcy4kc2NvcGUpXG5cdH1cblx0Lypcblx0ICogcHJpdmF0ZVxuXHQgKi9cblx0X2luaXQoKXtcblx0XHR0aGlzLmluaXQoKVxuXHRcdFxuXHRcdGV4dGVuZCh0aGlzLiRzY29wZSwgdGhpcy4kZGF0YSlcblx0XHRleHRlbmQodGhpcy4kc2NvcGUsIHRoaXMuJG1ldGhvZHMpXG5cblx0XHQvL2NvbXBvbmVudHMgaW5pdGlhbFxuXHRcdE9iamVjdC5rZXlzKHRoaXMuJGNvbXBvbmVudHMpLmZvckVhY2goKGNvbXBvbmVudE5hbWUpPT57XG5cdFx0XHR0aGlzLiRjaGlsZHJlbi5wdXNoKHtcblx0XHRcdFx0cGFyZW50OiB0aGlzLiRwYXJlbnQsXG5cdFx0XHRcdG5hbWU6IGNvbXBvbmVudE5hbWUsXG5cdFx0XHRcdGJvZHk6IHRoaXMuJGNvbXBvbmVudHNbY29tcG9uZW50TmFtZV1cblx0XHRcdH0pXG5cdFx0fSlcblx0XHR0aGlzLmNyZWF0ZSgpXG5cdH1cblxuXHQvKlxuICAgICAqIGxpZmUgY2lyY2xlXG5cdCAqL1xuXHRfY2FsbChvYmo9aGFzaCgpKXtcblx0XHRpZighb2JqKSByZXR1cm4gO1xuXHRcdGZvcihsZXQgZm5OYW1lIGluIG9iail7XG5cdFx0XHRvYmpbZm5OYW1lXS5jYWxsKHRoaXMuJHNjb3BlKVxuXHRcdH1cblx0fVxuXHRpbml0KCl7XG5cdFx0dGhpcy5fY2FsbCh0aGlzLiRpbml0KVxuXHR9XG5cdGNyZWF0ZSgpe1xuXHRcdHRoaXMuX2RlZmluZVJlYWN0aXZlKHRoaXMuJHNjb3BlKVxuXHRcdHRoaXMuX2NhbGwodGhpcy4kY3JlYXRlKVxuXHR9XG5cdHJlYWR5KCl7XG5cdFx0Lypcblx0XHQgKiBiaW5kIGJyb3dzZXIgZXZlbnQgYWZ0ZXIgZG9tIGlzIHJlYWR5XG5cdFx0ICovXG5cdFx0bGV0IHNlbGYgPSB0aGlzXG5cdFx0d2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRzZWxmLiRlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYuJGRvbS5pZClcblx0XHRcdHNlbGYuX2JpbmRCcm93ZXJFdmVudCgpXG5cdFx0XHRzZWxmLl9jYWxsKHNlbGYuJHJlYWR5KVxuXHRcdH1cblx0XHRzZWxmLiRlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYuJGRvbS5pZClcblx0XHRzZWxmLl9iaW5kQnJvd2VyRXZlbnQoKVxuXHRcdHNlbGYuX2NhbGwoc2VsZi4kcmVhZHkpXG5cdH1cblxuXHQvKlxuXHQgKiBwcml2YXRlXG5cdCAqIHR1cm4gYW4gb2JqZWN0IHRvIHJlYWN0aXZlXG5cdCAqL1xuXHRfZGVmaW5lUmVhY3RpdmUob2JqPWhhc2goKSl7XG5cdFx0bGV0IF9fb2JfXyA9IGhhc2goKVxuXHRcdF9fb2JfXyA9IHRvUmVhY3RpdmUuY2FsbCh0aGlzLCBvYmopXG5cblx0XHRmdW5jdGlvbiB0b1JlYWN0aXZlKG9iail7XG5cdFx0XHRpZihpc09iamVjdChvYmopKXtcblx0XHRcdFx0bGV0IG9ic2VydmVyID0gaGFzaCgpXG5cdFx0XHRcdGZvcihsZXQgbyBpbiBvYmope1xuXHRcdFx0XHRcdGlmKGlzT2JqZWN0KG9ialtvXSkpe1xuXHRcdFx0XHRcdFx0b2JzZXJ2ZXJbb10gPSB0b1JlYWN0aXZlKG9ialtvXSlcblx0XHRcdFx0XHR9ZWxzZSBpZighaXNGdW5jKG9ialtvXSkpe1xuXHRcdFx0XHRcdFx0b2JzZXJ2ZXJbb10gPSBuZXcgT2JzZXJ2ZXIob2JqLCBvLCBvYmpbb10pXG5cdFx0XHRcdFx0XHRvYnNlcnZlcltvXS5hZGRTdWIoKCk9Pntcblx0XHRcdFx0XHRcdFx0dGhpcy51cGRhdGUoKVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9ic2VydmVyXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuJG9ic2VydmVyLnB1c2goX19vYl9fKVxuXHR9XG5cblx0LypcbiAgICAgKue7keWumua1j+iniOWZqOS6i+S7tlxuXHQgKi9cblx0X2JpbmRCcm93ZXJFdmVudCgpe1xuXHRcdGxldCBlbCA9IHRoaXMuJGVsLFxuXHRcdFx0ZXZlbnRzID0gdGhpcy4kZG9tLmV2ZW50c1xuXG5cdFx0Lypcblx0XHQgKiDlop7liqDkuovku7blip/og71cblx0XHQgKi9cblx0XHRjb25zdCAkZG9tID0gYnJvd3NlckV2ZW50KGVsKVxuXHRcdGZvcihsZXQgZVR5cGUgaW4gZXZlbnRzKXtcblx0XHRcdGxldCBlQXJyYXkgPSBldmVudHNbZVR5cGVdXG5cdFx0XHRlQXJyYXkuZm9yRWFjaCgoZUNiTmFtZSk9Pntcblx0XHRcdFx0aWYoaXNGdW5jKHRoaXMuJHNjb3BlW2VDYk5hbWVdKSl7XG5cdFx0XHRcdFx0bG9nLmluZm8odGhpcy4kc2NvcGVbZUNiTmFtZV0udG9TdHJpbmcoKSlcblx0XHRcdFx0XHQkZG9tLm9uKGVUeXBlLCAoKT0+e1xuXHRcdFx0XHRcdFx0dGhpcy4kc2NvcGVbZUNiTmFtZV0oKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGxvZy53YXJuKCdNaXNzaW5nICcgKyBlQ2JOYW1lICsgJ21ldGhvZC4nKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRcblx0fVxuXG5cdGh0bWwoKXtcblx0XHRpZighdGhpcy4kZG9tKXtcblx0XHRcdHRoaXMuc2V0RG9tKClcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuJGRvbS5vdXRlckhUTUxcblx0fVxuXG5cdC8qXG5cdCAqIHZpZXdcblx0ICovXG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMuc2V0RG9tKClcblx0XHRjb25zb2xlLmxvZygnaHRtbDogJywgdGhpcy5odG1sKCkpXG5cdFx0Ly90aGlzLl9pbml0KClcblx0XHR0aGlzLmluaXQoKVxuXHRcdHRoaXMuY3JlYXRlKClcblx0XHR0aGlzLnJlbmRlcignYXBwJylcblx0XHR0aGlzLnJlYWR5KClcblx0fVxuXG5cdHJlbmRlcihzZWxlY3Rvcil7XG5cdFx0bGV0IGNvbnRhaW5lciA9IG51bGxcblx0XHRpZihzZWxlY3RvciAmJiB0aGlzLiRzZWxlY3RvciAmJiB0aGlzLiRzZWxlY3RvciA9PSBzZWxlY3Rvcil7XG5cdFx0XHRjb250YWluZXIgPSB0aGlzLiRjb250YWluZXJcblx0XHR9ZWxzZSBpZihzZWxlY3Rvcil7XG5cdFx0XHRjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3Rvcilcblx0XHRcdHRoaXMuJHNlbGVjdG9yID0gc2VsZWN0b3Jcblx0XHRcdHRoaXMuJGNvbnRhaW5lciA9IGNvbnRhaW5lclx0XHRcdFxuXHRcdH1lbHNle1xuXHRcdFx0Y29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyIHx8IGRvY3VtZW50LmJvZHlcblx0XHR9XG5cblx0XHRjb250YWluZXIuaW5uZXJIVE1MID0gdGhpcy5odG1sKClcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpe1xuXHRjb25zdCBwbGV4ID0gaGFzaCgpXG5cdHBsZXguYXBwID0gbnVsbFxuXG5cdHBsZXguY3JlYXRlQ29tcG9uZW50ID0gZnVuY3Rpb24ob3B0aW9ucyA9IGhhc2goKSl7XG5cdFx0dGhpcy5hcHAgPSBuZXcgQ29tcG9uZW50KG9wdGlvbnMpXG5cdH1cblx0cGxleC5yZW5kZXIgPSBmdW5jdGlvbihzZWxlY3Rvcil7XG5cdFx0bGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9yKVxuXHRcdGNvbnRhaW5lci5pbm5lckhUTUwgPSB0aGlzLmFwcC5odG1sKClcblx0fVxufVxuXG4vKlxuICogZGVtb1xuICovXG5sZXQgTXlDb21wb25lbnQgPSBmdW5jdGlvbihzdHIgPSAnd3d3Lml3YWltYWkuY29tJyl7XG5cdHJldHVybiBoLmRpdihcblx0XHRcdHsgXG5cdFx0XHRcdGNsYXNzOiAnY29udGFpbmVyJyxcblx0XHRcdFx0b25DbGljazogJ2NoYW5nZUFnZSdcblx0XHRcdH0sXG5cdFx0XHRoLmhlYWRlcihcblx0XHRcdFx0XHRoLmRpdignaGVsbG8gd29ybGQhJylcblx0XHRcdFx0KSxcblx0XHRcdGguYXJ0aWNsZShcblx0XHRcdFx0aC5kaXYoXG5cdFx0XHRcdFx0XHR0aGlzLnBhcmFncmFwaCArIHRoaXMubmFtZSArIHRoaXMuYWdlXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpLFxuXHRcdFx0aC5mb290ZXIoXG5cdFx0XHRcdGguaW5wdXQoe1xuXHRcdFx0XHRcdHR5cGU6ICd0ZXh0J1xuXHRcdFx0XHR9KSxcblx0XHRcdFx0aC5hKHtcblx0XHRcdFx0XHRcdGhyZWY6IHN0clxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0dGhpcy5uYW1lXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdClcbn1cblxubGV0IHJvb3RBcHAgPSBuZXcgQ29tcG9uZW50KE15Q29tcG9uZW50LHtcblx0XHRkYXRhOiB7XG5cdFx0XHRuYW1lOiAnYmFpZHUnLFxuXHRcdFx0YWdlOiAxOCxcblx0XHRcdHBhcmFncmFwaDogJ215IG5hbWUgaXMgeWFuZ3hpYW9mdSdcblx0XHR9LFxuXHRcdG1ldGhvZHM6IHtcblx0XHRcdGNoYW5nZUFnZSgpe1xuXHRcdFx0XHR0aGlzLmFnZSA9IDEgXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdhZ2U6ICcsIHRoaXMuYWdlKVxuXHRcdFx0fVxuXHRcdH1cdFxuXHR9KVxuXG5yb290QXBwLnJlbmRlcignYXBwJylcbnJvb3RBcHAucmVhZHkoKVxuLy8gbGV0IGFwcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuLy8gLy8gYXBwLmlubmVySFRNTCA9IChNeUNvbXBvbmVudC5pbm5lckhUTUwpXG4vLyBhcHAuaW5uZXJIVE1MID0gKHJvb3RBcHAuJGRvbS5vdXRlckhUTUwpXG4vLyByb290QXBwLnJlYWR5KClcblxuLy8gY29uc3QgcGVyc29uID0ge1xuLy8gXHRuYW1lOiAneXNmJyxcbi8vIFx0YWdlOiAxOFxuLy8gfVxuXG4vLyBsZXQgcmVhY3RpdmVQZXJzb24gPSBuZXcgT2JzZXJ2ZXIocGVyc29uLCAnbmFtZScsIHBlcnNvbi5uYW1lKVxuLy8gcmVhY3RpdmVQZXJzb24uYWRkU3ViKGZ1bmN0aW9uKCl7XG4vLyBcdGNvbnNvbGUubG9nKCdwZXJzb24ubmFtZScsIHBlcnNvbi5uYW1lKVxuLy8gXHRwZXJzb24ubmFtZSA9ICd4aWFvZnUnXG4vLyB9KVxuLy8gcGVyc29uLm5hbWUgPSAneWFuZ3hpYW9mdSdcblxuLy9jb25zb2xlLmxvZygnaHRtbCcsIE15Q29tcG9uZW50LCBNeUNvbXBvbmVudC5pbm5lckhUTUwpXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWwpIHtcbiAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAgIGVsZW1lbnQ6ICRlbCxcbiAgICAgICAgZXZlbnRIYW5kbGVyOiB7XG4gICAgICAgICAgICBldmVudHM6IHt9LFxuICAgICAgICAgICAgYmluZEV2ZW50OiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2ssIHRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAvL2JpbmQgZXZlbnQgbGlzdGVuZXIgdG8gRE9NIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvL+WcqOWGkuazoemYtuauteinpuWPkVxuICAgICAgICAgICAgICAgIHRhcmdldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2ssIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSB0aGlzLmV2ZW50c1tldmVudF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudElkOiBjb3VudGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SWQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ldmVudHNbZXZlbnRdWzBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIHJldHVybiBhbGwgbGlzdGVuIGV2ZW50c1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBhbGw6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ldmVudHNbZXZlbnRdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5iaW5kRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kRXZlbnQgPSB0aGlzLmZpbmRFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmb3VuZEV2ZW50LmV2ZW50LCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy91cGRhdGUgZXZlbnRzIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzID0gdGhpcy5ldmVudHNbZXZlbnRdLmZpbHRlcihmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5jb3VudGVyICE9PSBldmVudC5jb3VudGVyO1xuICAgICAgICAgICAgICAgICAgICB9LCBldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24oZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuYWxsKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudW5iaW5kRXZlbnQoZSwgdGFyZ2V0RWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiDmo4Dmn6Xor6Xkuovku7bnsbvlnovmmK/lkKbooqvnu5HlrppcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaXNCaW5kaW5nOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbmRFdmVudChldmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb246IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIuYmluZEV2ZW50KGV2ZW50LCBjYWxsYmFjaywgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgLypcbiAgICAgICAgICogYmluZCBvbmNlXG4gICAgICAgICAqL1xuICAgICAgICBvbmNlOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLnJlbW92ZShldmVudCk7XG4gICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBjYWxsYmFjayk7XG4gICAgICAgIH0sXG4gICAgICAgIG9mZjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLnVuYmluZEV2ZW50KGV2ZW50LCB0aGlzLmVsZW1lbnQpO1xuICAgICAgICB9LFxuICAgICAgICAvKlxuICAgICAgICAgKiBkZWxlZ2F0ZSDkuovku7Ys57uZ5Yqo5oCB5re75Yqg5YWD57Sg57uR5a6a55uR5ZCs5LqL5Lu2XG4gICAgICAgICAqL1xuICAgICAgICAvLyBkZWxlZ2F0ZTogZnVuY3Rpb24oc2VsZWN0b3IsIGV2ZW50LCBmbikge1xuICAgICAgICAvLyAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyAgICAgc2VsZi5vbihldmVudCwgZnVuY3Rpb24oZSkge1xuICAgICAgICAvLyAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgLy8gICAgICAgICB2YXIgY2hpbGRyZW4gPSBzZWxmLmNyZWF0ZShzZWxmLnNlbGVjdG9yICsgJyAnICsgc2VsZWN0b3IpLmVsZW1lbnRzO1xuICAgICAgICAvLyAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09IGNoaWxkKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBmbi5jYWxsKGNvbnRleHQsIGUpO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfSlcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8qXG4gICAgICAgICAqIOinpuWPkeaMh+WumuS6i+S7tlxuICAgICAgICAgKi9cbiAgICAgICAgLy/mtY/op4jlmajkuovku7bvvIzpu5jorqTlhpLms6FcbiAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICAgICAgdmFyIGVsID0gdGhpcy5lbGVtZW50O1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgICAgICAgIGV2ZW50LmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBldmVudFxufVxuIiwiLypcbiogZGVidWdcbiovXG5jb25zdCBDb25maWcgPSB7XG5cdGRlYnVnOiB0cnVlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZXJyb3IoKXtcblx0XHRpZihDb25maWcuZGVidWcpe1xuXHRcdFx0Y29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpXG5cdFx0fVxuXHR9LFxuXHRpbmZvKCl7XG5cdFx0aWYoQ29uZmlnLmRlYnVnKXtcblx0XHRcdGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcblx0XHR9XG5cdH0sXG5cdHdhcm4oKXtcblx0XHRpZihDb25maWcuZGVidWcpe1xuXHRcdFx0Y29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgXyBmcm9tICcuL3V0aWwuanMnXG5cbmNvbnN0IHJhbmRvbVN0ciA9IF8ucmFuZG9tU3RyXG5jb25zdCBoYXNoID0gXy5oYXNoXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGV7XG5cdGNvbnN0cnVjdG9yKHRhZ05hbWUgPSAnJywgcGFyZW50ID0gbnVsbCl7XG5cdFx0dGhpcy5pZCA9IHJhbmRvbVN0cigpXG5cdFx0dGhpcy5odG1sID0gJydcblx0XHR0aGlzLmF0dHJpYnV0ZSA9IGhhc2goKVxuXHRcdHRoaXMubm9kZVR5cGUgPSAnJ1xuXHRcdHRoaXMubm9kZU5hbWUgPSB0YWdOYW1lXG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnRcblx0XHR0aGlzLmNoaWxkcmVuID0gW11cblx0XHR0aGlzLnNjb3BlID0gaGFzaCgpXG5cdFx0dGhpcy5ldmVudHMgPSBoYXNoKClcblx0fVxuXG5cdGdldCBpbm5lckhUTUwoKXtcblx0XHRsZXQgX2h0bWwgPSAnJ1xuXHRcdGlmKHRoaXMuY2hpbGRyZW4pe1xuXHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKXtcblx0XHRcdFx0aWYoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKXtcblx0XHRcdFx0XHRfaHRtbCArPSBjaGlsZC5vdXRlckhUTUxcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fWVsc2V7XG5cdFx0XHRfaHRtbCA9IHRoaXMuaW5uZXJIVE1MXG5cdFx0fVxuXHRcdHJldHVybiBfaHRtbFxuXHR9XG5cdHNldCBpbm5lckhUTUwoX2h0bWwpe1xuXHRcdGlmKF9odG1sIGluc3RhbmNlb2YgTm9kZSl7XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gW11cblx0XHRcdHRoaXMuY2hpbGRyZW4ucHVzaChfaHRtbClcblx0XHR9ZWxzZSBpZihBcnJheS5pc0FycmF5KF9odG1sKSl7XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gX2h0bWxcblx0XHR9XG5cdH1cblxuXHRnZXQgb3V0ZXJIVE1MKCl7XG5cdFx0bGV0IGF0dHJzID0gdGhpcy5hdHRyaWJ1dGVcblx0XHRsZXQgYXR0ckRvbSA9ICcnXG5cdFx0bGV0IHRhZyA9IHRoaXMubm9kZU5hbWVcblx0XHR0aGlzLmV2ZW50cyA9IGhhc2goKVxuXHRcdGF0dHJEb20gKz0gYCBpZD1cIiR7dGhpcy5pZH1cImBcblx0XHRmb3IobGV0IGF0dHIgaW4gYXR0cnMpe1xuXHRcdFx0Lypcblx0XHRcdCAqIGV2ZW50cyBjb2xsZWN0XG5cdFx0XHQgKi9cblx0XHRcdGlmKGF0dHIuc3Vic3RyKDAsIDIpID09PSAnb24nKXtcblx0XHRcdFx0bGV0IGV2ZW50VHlwZSA9IGF0dHIuc3Vic3RyKDIpXG5cdFx0XHRcdGV2ZW50VHlwZSA9IGV2ZW50VHlwZS50b0xvd2VyQ2FzZSgpXG5cdFx0XHRcdGlmKCF0aGlzLmV2ZW50c1tldmVudFR5cGVdKXtcblx0XHRcdFx0XHR0aGlzLmV2ZW50c1tldmVudFR5cGVdID0gW11cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmV2ZW50c1tldmVudFR5cGVdLnB1c2goYXR0cnNbYXR0cl0pXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0YXR0ckRvbSArPSBgJHthdHRyfT1cIiR7YXR0cnNbYXR0cl19XCJgXHRcdFx0XHRcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gYDwke3RhZ30ke2F0dHJEb219PiR7dGhpcy5pbm5lckhUTUx9PC8ke3RhZ30+YFxuXHR9XG59XG4iLCJpbXBvcnQgXyBmcm9tICcuLi91dGlsJ1xuXG5jb25zdCBkZWYgPSBfLmRlZlxuY29uc3QgaGFzT3duID0gXy5oYXNPd25cbmNvbnN0IGlzT2JqZWN0ID0gXy5pc09iamVjdFxuY29uc3QgaXNGdW5jID0gXy5pc0Z1bmNcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iaiA9IHt9LCBrZXksIHZhbCkge1xuICAgICAgICB0aGlzLm9iaiA9IG9ialxuICAgICAgICB0aGlzLmtleSA9IGtleVxuICAgICAgICB0aGlzLnZhbCA9IHZhbFxuICAgICAgICB0aGlzLnN1YnMgPSBbXVxuXG4gICAgICAgIHRoaXMuZGVmaW5lUmVhY3RpdmUob2JqLCBrZXksIHZhbClcbiAgICB9XG5cbiAgICBhZGRTdWIoc3ViKSB7XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKHN1YilcbiAgICB9XG5cbiAgICBub3RpZnkoKSB7XG4gICAgICAgIGxldCBzdWJzID0gdGhpcy5zdWJzXG4gICAgICAgIHN1YnMuZm9yRWFjaChmdW5jdGlvbihzdWIpIHtcbiAgICAgICAgICAgIGlmKGlzRnVuYyhzdWIpKXtcbiAgICAgICAgICAgIFx0c3ViKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgXHRzdWIudXBkYXRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkZWZpbmVSZWFjdGl2ZShvYmosIGtleSwgdmFsLCBkb05vdE9ic2VydmUpIHtcbiAgICBcdGlmKG9ialtrZXldLl9fb2JfXykgcmV0dXJuXG5cbiAgICBcdGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpXG4gICAgICAgIGlmIChwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5jb25maWd1cmFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhdGVyIGZvciBwcmUtZGVmaW5lZCBnZXR0ZXIvc2V0dGVyc1xuICAgICAgICBsZXQgZ2V0dGVyID0gcHJvcGVydHkgJiYgcHJvcGVydHkuZ2V0XG4gICAgICAgIGxldCBzZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5zZXRcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIHJlYWN0aXZlR2V0dGVyKCkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGdldHRlciA/IGdldHRlci5jYWxsKG9iaikgOiB2YWxcblxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gcmVhY3RpdmVTZXR0ZXIobmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbFxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRlci5jYWxsKG9iaiwgbmV3VmFsKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IG5ld1ZhbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLm5vdGlmeSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5cbiIsImltcG9ydCBfIGZyb20gJy4vdXRpbC5qcydcbmltcG9ydCBOb2RlIGZyb20gJy4vbm9kZS5qcydcbmltcG9ydCBWb2lkTm9kZSBmcm9tICcuL3ZvaWROb2RlLmpzJ1xuaW1wb3J0IFRleHROb2RlIGZyb20gJy4vVGV4dE5vZGUuanMnXG5cbmNvbnN0IGV4dGVuZCA9IF8uZXh0ZW5kXG5jb25zdCBoYXNoID0gXy5oYXNoXG5jb25zdCBmb3JtYXRTdHIgPSBfLmZvcm1hdFN0clxuXG4vL3ByaW1pdGl2ZVxuZXhwb3J0IGZ1bmN0aW9uIHNpbmdsZVRhZyh0YWcpe1xuXHRyZXR1cm4gZnVuY3Rpb24oYXR0cnMgPSB7fSl7XG5cdFx0bGV0IHZvaWROb2RlID0gbmV3IFZvaWROb2RlKHRhZylcblx0XHR2b2lkTm9kZS5hdHRyaWJ1dGUgPSBhdHRyc1xuXHRcblx0XHRyZXR1cm4gdm9pZE5vZGVcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZG91YmxlVGFnKHRhZyl7XG5cdC8qXG5cdCAqIEBwYXJhbXMgYXR0cnMge29iamVjdH1cblx0ICogQHBhcmFtcyBodG1sIHtzdHJpbmd9XG5cdCAqIEBwYXJhbXMgTm9kZSBpbnN0YW5jZSB7Y2xhc3MgaW5zdGFuY2V9XG5cdCAqL1xuXHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRsZXQgbm9kZSA9IG5ldyBOb2RlKHRhZylcblx0XHRsZXQgYXR0cnMgPSBoYXNoKClcblxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPiAwKXtcblx0XHRcdGxldCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG5cdFx0XHRhcmdzLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdGlmKGl0ZW0gaW5zdGFuY2VvZiBOb2RlKXtcblx0XHRcdFx0XHRub2RlLmNoaWxkcmVuLnB1c2goaXRlbSlcblx0XHRcdFx0XHRpdGVtLnBhcmVudCA9IG5vZGVcblx0XHRcdFx0fWVsc2UgaWYodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKXtcblx0XHRcdFx0XHRhdHRycyA9IGV4dGVuZChhdHRycywgaXRlbSlcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0Ly9zdHJpbmdcblx0XHRcdFx0XHRsZXQgdGV4dE5vZGUgPSBuZXcgVGV4dE5vZGUobm9kZSwgaXRlbSlcblx0XHRcdFx0XHRub2RlLmNoaWxkcmVuLnB1c2godGV4dE5vZGUpXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0XG5cdFx0bm9kZS5hdHRyaWJ1dGUgPSBhdHRyc1xuXG5cdFx0cmV0dXJuIG5vZGVcblx0fVxufVxuXG4vKlxuICogc2VxdWVuY2UgdGFnc1xuICogQHBhcmFtcyB7dGFnIG5hbWUgfCBhcnJheX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKCl7XG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuXG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPj0gMSl7XG5cblx0fVxufVxuXG4vKlxuICogbG9vcCBhbiB0YWdcbiAqIEBwYXJhbXMge2l0ZW0gaW4gaXRlbXN9XG4gKi9cbmV4cG9ydCBjb25zdCBzZm9yID0gZnVuY3Rpb24oKXtcblxufVxuXG5cblxuXG5cblxuXG4iLCJpbXBvcnQge1xuXHRzaW5nbGVUYWcsXG5cdGRvdWJsZVRhZ1xufSBmcm9tICcuL3ByaW1pdGl2ZS5qcydcbi8qXG4gKiBjbG9zZSB0YWdcbiovXG5jb25zdCBDTE9TRV9UQUdTID0gW1xuXHQnaGVhZGVyJyxcblx0J2FydGljbGUnLFxuXHQnZm9vdGVyJyxcblx0J3NlY3Rpb24nLFxuXHQnZGl2Jyxcblx0J3VsJyxcblx0J2xpJyxcblx0J2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1Jyxcblx0J2Zvcm0nLFxuXHQnYnV0dG9uJyxcblx0J2xhYmVsJyxcblx0J2EnXG5dXG5cbmNvbnN0IE9QRU5fVEFHUyA9IFtcblx0J21ldGEnLFxuXHQnaW1nJyxcblx0J2lucHV0J1xuXVxuXG5jb25zdCBoID0ge31cblxuQ0xPU0VfVEFHUy5mb3JFYWNoKGZ1bmN0aW9uKHRhZyl7XG5cdGhbdGFnXSA9IGRvdWJsZVRhZyh0YWcpXG59KVxuXG5PUEVOX1RBR1MuZm9yRWFjaChmdW5jdGlvbih0YWcpe1xuXHRoW3RhZ10gPSBzaW5nbGVUYWcodGFnKVxufSlcblxuZXhwb3J0IGRlZmF1bHQgaCIsImNvbnN0IHV0aWxzID0ge1xuICAgIC8qdHlwZXMqL1xuICAgIHR5cGU6IGZ1bmN0aW9uKG9iail7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5yZXBsYWNlKC9eXFxbb2JqZWN0ICguKylcXF0kLywgJyQxJykudG9Mb3dlckNhc2UoKTtcbiAgICB9LFxuICAgIGlzQXJyYXk6IGZ1bmN0aW9uKGFycikge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuICAgIH0sXG4gICAgdG9BcnJheTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBbXS5zbGljZS5jYWxsKG9iaik7XG4gICAgfSxcbiAgICBpc09iamVjdDogZnVuY3Rpb24ob2JqKXtcbiAgICAgICAgaWYodXRpbHMudHlwZShvYmopID09PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGlzTnVtYmVyOiBmdW5jdGlvbihudW0pe1xuICAgICAgICByZXR1cm4gdXRpbHMudHlwZShudW0pID09PSAnbnVtYmVyJyA/IHRydWUgOiBmYWxzZTtcbiAgICB9LFxuICAgIGlzU3RyaW5nOiBmdW5jdGlvbihzdHIpe1xuICAgICAgICByZXR1cm4gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyB0cnVlIDogZmFsc2U7XG4gICAgfSxcbiAgICBpc0Z1bmM6IGZ1bmN0aW9uKGZuKXtcbiAgICAgICAgcmV0dXJuIHV0aWxzLnR5cGUoZm4pID09PSAnZnVuY3Rpb24nID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0sXG4gICAgLypcbiAgICAgKiBleHRlbmQgYW4gb2JqZWN0XG4gICAgICovXG4gICAgZXh0ZW5kKG9sZE9iaiA9IHt9LCBuZXdPYmogPSB7fSkge1xuICAgICAgICBmb3IgKGxldCBvIGluIG5ld09iaikge1xuICAgICAgICAgICAgaWYgKG5ld09iai5oYXNPd25Qcm9wZXJ0eShvKSkge1xuICAgICAgICAgICAgICAgIG9sZE9ialtvXSA9IG5ld09ialtvXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvbGRPYmpcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYW4gQXJyYXktbGlrZSBvYmplY3QgdG8gYSByZWFsIEFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheS1saWtlfSBsaXN0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtzdGFydF0gLSBzdGFydCBpbmRleFxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuXG4gICAgdG9BcnJheSAobGlzdCwgc3RhcnQpIHtcbiAgICAgIHN0YXJ0ID0gc3RhcnQgfHwgMFxuICAgICAgdmFyIGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0XG4gICAgICB2YXIgcmV0ID0gbmV3IEFycmF5KGkpXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHJldFtpXSA9IGxpc3RbaSArIHN0YXJ0XVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJldFxuICAgIH0sXG4gICAgLyoqXG4gICAgICogRGVmaW5lIGEgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZW51bWVyYWJsZV1cbiAgICAgKi9cblxuICAgIGRlZiAob2JqLCBrZXksIHZhbCwgZW51bWVyYWJsZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIHZhbHVlOiB2YWwsXG4gICAgICAgIGVudW1lcmFibGU6ICEhZW51bWVyYWJsZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSlcbiAgICB9LFxuICAgIC8qXG4gICAgICog6ZqP5py65pWw55Sf5oiQXG4gICAgICovXG4gICAgcmFuZG9tU3RyKCl7XG4gICAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMikgKyBOdW1iZXIobmV3IERhdGUoKSlcbiAgICBcdHJldHVybiByYW5kb21cbiAgICB9LFxuICAgIGhhc2goKXtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB9LFxuICAgIGZvcm1hdFN0cihvYmope1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCAnXFx0JylcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBvYmplY3QgcmVsYXRpdmVcbiAgICAgKi9cbiAgICAvKipcbiAgICAgKiBDaGVjayB3aGV0aGVyIHRoZSBvYmplY3QgaGFzIHRoZSBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNPd24gKG9iaiwga2V5KSB7XG4gICAgICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgICAgICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpXG4gICAgfSxcbiAgICBub3JtYWxpemUocGF0aCA9ICcnLCBvYmogPSB7fSkge1xuICAgIGxldCBwQXJyID0gbnVsbCxcbiAgICAgICAgdmFsdWUgPSBvYmpcbiAgICBpZiAocGF0aCAmJiBvYmopIHtcbiAgICAgICAgaWYgKHBhdGhbMF0gPT0gJy4nKSBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMSlcbiAgICAgICAgaWYgKHBhdGhbcGF0aC5sZW5ndGggLSAxXSA9PSAnLicpIHtcbiAgICAgICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cigwLCAtMilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXRoLmluZGV4T2YoJy4nKSAhPSAtMSkge1xuICAgICAgICAgICAgcEFyciA9IHBhdGguc3BsaXQoJy4nKVxuXG4gICAgICAgICAgICBwQXJyLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtrZXldXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmVycm9yKG9iaiwgJ3RoZSB2YWx1ZSBvZiAnICsgcGF0aCArICcgaXMgdW5kZWZpbmVkLicpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxufVxufVxuZXhwb3J0IGRlZmF1bHQgdXRpbHNcbiIsImltcG9ydCBOb2RlIGZyb20gJy4vbm9kZS5qcydcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZvaWROb2RlIGV4dGVuZHMgTm9kZXtcblx0Y29uc3RydWN0b3IodGFnTmFtZSwgcGFyZW50PW51bGwpe1xuXHRcdHN1cGVyKHRhZ05hbWUsIHBhcmVudClcblx0fVxuXG5cdGdldCBpbm5lckhUTUwoKXtcblx0XHRyZXR1cm4gJydcblx0fVxuXHRzZXQgaW5uZXJIVE1MKHZhbCl7XG5cdFx0bG9nLndhcm4oJ3ZvaWQgZWxlbWVudCBjYW4gbm90IHNldCBpbm5lckhUTUwuJylcblx0fVxuXG5cdGdldCBvdXRlckhUTUwoKXtcblx0XHRsZXQgYXR0ckRvbSA9ICcnXG5cdFx0bGV0IGF0dHJzID0gdGhpcy5hdHRyaWJ1dGVcblx0XHRsZXQgdGFnID0gdGhpcy5ub2RlTmFtZVxuXG5cdFx0YXR0ckRvbSArPSBgIGlkPVwiJHt0aGlzLmlkfVwiYFxuXHRcdGZvcihsZXQgYXR0ciBpbiBhdHRycyl7XG5cdFx0XHRhdHRyRG9tICs9IGAke2F0dHJ9PVwiJHthdHRyc1thdHRyXX1cImBcblx0XHR9XG5cdFx0cmV0dXJuIGA8JHt0YWd9ICR7YXR0ckRvbX0+YFxuXHR9XG59XG5cbiJdfQ==
