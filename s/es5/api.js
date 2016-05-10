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
		key: 'updateDom',
		value: function updateDom() {
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
				this.updateDom();
			}
			return this.$dom.outerHTML;
		}

		/*
   * view
   */

	}, {
		key: 'update',
		value: function update() {
			this.updateDom();
			console.log('html: ', this.html());
			//this._init()
			//this.init()
			//this.create()
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
	}, _tag2.default.header(_tag2.default.div('hello world!')), _tag2.default.article(_tag2.default.div(function () {
		return this.paragraph + this.name + this.age;
	})), _tag2.default.footer(_tag2.default.input({
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
	return function mkTag() {
		var node = new _node2.default(tag);
		var attrs = hash();

		/*
   * callee
   */
		//const _callee_ = arguments.callee
		console.log('_callee_: ', mkTag.toString());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9UZXh0Tm9kZS5qcyIsImxpYi9hcGkuanMiLCJsaWIvYnJvd3NlckV2ZW50LmpzIiwibGliL2xvZy5qcyIsImxpYi9ub2RlLmpzIiwibGliL29ic2VydmVyL29ic2VydmVyLmpzIiwibGliL3ByaW1pdGl2ZS5qcyIsImxpYi90YWcuanMiLCJsaWIvdXRpbC5qcyIsImxpYi92b2lkTm9kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR3FCOzs7QUFDcEIsVUFEb0IsUUFDcEIsQ0FBWSxNQUFaLEVBQThCO01BQVYsNkRBQU8sa0JBQUc7O3dCQURWLFVBQ1U7O3FFQURWLHFCQUViLFNBQVMsU0FEYzs7QUFFN0IsUUFBSyxJQUFMLEdBQVksSUFBWixDQUY2Qjs7RUFBOUI7O2NBRG9COztzQkFNTDtBQUNkLFVBQU8sS0FBSyxJQUFMLENBRE87O29CQUdELE1BQUs7QUFDbEIsUUFBSyxJQUFMLEdBQVksSUFBWixDQURrQjs7OztzQkFJSjtBQUNkLFVBQU8sS0FBSyxTQUFMLENBRE87Ozs7UUFiSzs7Ozs7Ozs7Ozs7Ozs7a0JDcUxOLFlBQVU7QUFDeEIsS0FBTSxPQUFPLE1BQVAsQ0FEa0I7QUFFeEIsTUFBSyxHQUFMLEdBQVcsSUFBWCxDQUZ3Qjs7QUFJeEIsTUFBSyxlQUFMLEdBQXVCLFlBQTBCO01BQWpCLGdFQUFVLHNCQUFPOztBQUNoRCxPQUFLLEdBQUwsR0FBVyxJQUFJLFNBQUosQ0FBYyxPQUFkLENBQVgsQ0FEZ0Q7RUFBMUIsQ0FKQztBQU94QixNQUFLLE1BQUwsR0FBYyxVQUFTLFFBQVQsRUFBa0I7QUFDL0IsTUFBSSxZQUFZLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFaLENBRDJCO0FBRS9C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QkFEYixVQUNhOztnRUFEYixxQkFFYixTQUFTLFNBRGlCO0VBQWpDOztjQURvQjs7c0JBS0w7QUFDZCxVQUFPLEVBQVAsQ0FEYzs7b0JBR0QsS0FBSTtBQUNqQixpQkFBSSxJQUFKLENBQVMscUNBQVQsRUFEaUI7Ozs7c0JBSUg7QUFDZCxPQUFJLFVBQVUsRUFBVixDQURVO0FBRWQsT0FBSSxRQUFRLEtBQUssU0FBTCxDQUZFO0FBR2QsT0FBSSxNQUFNLEtBQUssUUFBTCxDQUhJOztBQUtkLHdCQUFtQixLQUFLLEVBQUwsTUFBbkIsQ0FMYztBQU1kLFFBQUksSUFBSSxJQUFKLElBQVksS0FBaEIsRUFBc0I7QUFDckIsZUFBYyxjQUFTLE1BQU0sSUFBTixPQUF2QixDQURxQjtJQUF0QjtBQUdBLGdCQUFXLFlBQU8sYUFBbEIsQ0FUYzs7OztRQVpLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBOb2RlIGZyb20gJy4vbm9kZS5qcydcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cuanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dE5vZGUgZXh0ZW5kcyBOb2RlIHtcblx0Y29uc3RydWN0b3IocGFyZW50LCB0ZXh0ID0gJycpe1xuXHRcdHN1cGVyKCcjdGV4dCcsIHBhcmVudClcblx0XHR0aGlzLnRleHQgPSB0ZXh0XG5cdH1cblxuXHRnZXQgaW5uZXJIVE1MKCl7XG5cdFx0cmV0dXJuIHRoaXMudGV4dFxuXHR9XG5cdHNldCBpbm5lckhUTUwodGV4dCl7XG5cdFx0dGhpcy50ZXh0ID0gdGV4dFxuXHR9XG5cblx0Z2V0IG91dGVySFRNTCgpe1xuXHRcdHJldHVybiB0aGlzLmlubmVySFRNTFxuXHR9XG59IiwiaW1wb3J0IF8gZnJvbSAnLi91dGlsLmpzJ1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZy5qcydcbmltcG9ydCBOb2RlIGZyb20gJy4vbm9kZS5qcydcbmltcG9ydCBoIGZyb20gJy4vdGFnLmpzJ1xuaW1wb3J0IGJyb3dzZXJFdmVudCBmcm9tICcuL2Jyb3dzZXJFdmVudC5qcydcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuL29ic2VydmVyL29ic2VydmVyLmpzJ1xuXG5jb25zdCBoYXNoID0gXy5oYXNoXG5jb25zdCBub3JtYWxpemUgPSBfLm5vcm1hbGl6ZVxuY29uc3QgZXh0ZW5kID0gXy5leHRlbmRcbmNvbnN0IGlzRnVuYyA9IF8uaXNGdW5jXG5jb25zdCBpc09iamVjdCA9IF8uaXNPYmplY3RcblxuY2xhc3MgQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihkb21Gbj1mdW5jdGlvbigpe3JldHVybiAnJ30sIHtkYXRhPWhhc2goKSwgY29tcG9uZW50cz1oYXNoKCksIG1ldGhvZHM9aGFzaCgpLCBpbml0PWhhc2goKSwgY3JlYXRlPWhhc2goKSwgcmVhZHk9aGFzaCgpfSl7XG5cdFx0dGhpcy4kZGF0YSA9IGRhdGFcblx0XHR0aGlzLiRkb21GbiA9IGRvbUZuXG5cdFx0dGhpcy4kY29tcG9uZW50cyA9IGNvbXBvbmVudHNcblx0XHR0aGlzLiRtZXRob2RzID0gbWV0aG9kc1xuXHRcdC8qXG5cdFx0ICogbGlmZSBjaXJjbGVcblx0XHQgKi9cblx0XHR0aGlzLiRpbml0ID0gaW5pdFxuXHRcdHRoaXMuJGNyZWF0ZSA9IGNyZWF0ZVxuXHRcdHRoaXMuJHJlYWR5ID0gcmVhZHlcblxuXHRcdHRoaXMuJHNjb3BlID0gaGFzaCgpXG5cdFx0dGhpcy4kb2JzZXJ2ZXIgPSBbXVxuXHRcdHRoaXMuJHBhcmVudCA9IG51bGxcblx0XHR0aGlzLiRjaGlsZHJlbiA9IFtdXG5cblx0XHR0aGlzLl9pbml0KClcblx0XHR0aGlzLiRkb20gPSBudWxsXG5cblx0XHQvKlxuXHRcdCAqIHZpZXdcblx0XHQgKi9cblx0XHR0aGlzLiRjb250YWluZXIgPSBudWxsXG5cdFx0dGhpcy4kc2VsZWN0b3IgPSAnJ1xuXHR9XG5cblx0dXBkYXRlRG9tKCl7XG5cdFx0dGhpcy4kZG9tID1cdHRoaXMuJGRvbUZuLmNhbGwodGhpcy4kc2NvcGUpXG5cdH1cblx0Lypcblx0ICogcHJpdmF0ZVxuXHQgKi9cblx0X2luaXQoKXtcblx0XHR0aGlzLmluaXQoKVxuXHRcdFxuXHRcdGV4dGVuZCh0aGlzLiRzY29wZSwgdGhpcy4kZGF0YSlcblx0XHRleHRlbmQodGhpcy4kc2NvcGUsIHRoaXMuJG1ldGhvZHMpXG5cblx0XHQvL2NvbXBvbmVudHMgaW5pdGlhbFxuXHRcdE9iamVjdC5rZXlzKHRoaXMuJGNvbXBvbmVudHMpLmZvckVhY2goKGNvbXBvbmVudE5hbWUpPT57XG5cdFx0XHR0aGlzLiRjaGlsZHJlbi5wdXNoKHtcblx0XHRcdFx0cGFyZW50OiB0aGlzLiRwYXJlbnQsXG5cdFx0XHRcdG5hbWU6IGNvbXBvbmVudE5hbWUsXG5cdFx0XHRcdGJvZHk6IHRoaXMuJGNvbXBvbmVudHNbY29tcG9uZW50TmFtZV1cblx0XHRcdH0pXG5cdFx0fSlcblx0XHR0aGlzLmNyZWF0ZSgpXG5cdH1cblxuXHQvKlxuICAgICAqIGxpZmUgY2lyY2xlXG5cdCAqL1xuXHRfY2FsbChvYmo9aGFzaCgpKXtcblx0XHRpZighb2JqKSByZXR1cm4gO1xuXHRcdGZvcihsZXQgZm5OYW1lIGluIG9iail7XG5cdFx0XHRvYmpbZm5OYW1lXS5jYWxsKHRoaXMuJHNjb3BlKVxuXHRcdH1cblx0fVxuXHRpbml0KCl7XG5cdFx0dGhpcy5fY2FsbCh0aGlzLiRpbml0KVxuXHR9XG5cdGNyZWF0ZSgpe1xuXHRcdHRoaXMuX2RlZmluZVJlYWN0aXZlKHRoaXMuJHNjb3BlKVxuXHRcdHRoaXMuX2NhbGwodGhpcy4kY3JlYXRlKVxuXHR9XG5cdHJlYWR5KCl7XG5cdFx0Lypcblx0XHQgKiBiaW5kIGJyb3dzZXIgZXZlbnQgYWZ0ZXIgZG9tIGlzIHJlYWR5XG5cdFx0ICovXG5cdFx0bGV0IHNlbGYgPSB0aGlzXG5cdFx0d2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRzZWxmLiRlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYuJGRvbS5pZClcblx0XHRcdHNlbGYuX2JpbmRCcm93ZXJFdmVudCgpXG5cdFx0XHRzZWxmLl9jYWxsKHNlbGYuJHJlYWR5KVxuXHRcdH1cblx0XHRzZWxmLiRlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYuJGRvbS5pZClcblx0XHRzZWxmLl9iaW5kQnJvd2VyRXZlbnQoKVxuXHRcdHNlbGYuX2NhbGwoc2VsZi4kcmVhZHkpXG5cdH1cblxuXHQvKlxuXHQgKiBwcml2YXRlXG5cdCAqIHR1cm4gYW4gb2JqZWN0IHRvIHJlYWN0aXZlXG5cdCAqL1xuXHRfZGVmaW5lUmVhY3RpdmUob2JqPWhhc2goKSl7XG5cdFx0bGV0IF9fb2JfXyA9IGhhc2goKVxuXHRcdF9fb2JfXyA9IHRvUmVhY3RpdmUuY2FsbCh0aGlzLCBvYmopXG5cblx0XHRmdW5jdGlvbiB0b1JlYWN0aXZlKG9iail7XG5cdFx0XHRpZihpc09iamVjdChvYmopKXtcblx0XHRcdFx0bGV0IG9ic2VydmVyID0gaGFzaCgpXG5cdFx0XHRcdGZvcihsZXQgbyBpbiBvYmope1xuXHRcdFx0XHRcdGlmKGlzT2JqZWN0KG9ialtvXSkpe1xuXHRcdFx0XHRcdFx0b2JzZXJ2ZXJbb10gPSB0b1JlYWN0aXZlKG9ialtvXSlcblx0XHRcdFx0XHR9ZWxzZSBpZighaXNGdW5jKG9ialtvXSkpe1xuXHRcdFx0XHRcdFx0b2JzZXJ2ZXJbb10gPSBuZXcgT2JzZXJ2ZXIob2JqLCBvLCBvYmpbb10pXG5cdFx0XHRcdFx0XHRvYnNlcnZlcltvXS5hZGRTdWIoKCk9Pntcblx0XHRcdFx0XHRcdFx0dGhpcy51cGRhdGUoKVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9ic2VydmVyXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuJG9ic2VydmVyLnB1c2goX19vYl9fKVxuXHR9XG5cblx0LypcbiAgICAgKue7keWumua1j+iniOWZqOS6i+S7tlxuXHQgKi9cblx0X2JpbmRCcm93ZXJFdmVudCgpe1xuXHRcdGxldCBlbCA9IHRoaXMuJGVsLFxuXHRcdFx0ZXZlbnRzID0gdGhpcy4kZG9tLmV2ZW50c1xuXG5cdFx0Lypcblx0XHQgKiDlop7liqDkuovku7blip/og71cblx0XHQgKi9cblx0XHRjb25zdCAkZG9tID0gYnJvd3NlckV2ZW50KGVsKVxuXHRcdGZvcihsZXQgZVR5cGUgaW4gZXZlbnRzKXtcblx0XHRcdGxldCBlQXJyYXkgPSBldmVudHNbZVR5cGVdXG5cdFx0XHRlQXJyYXkuZm9yRWFjaCgoZUNiTmFtZSk9Pntcblx0XHRcdFx0aWYoaXNGdW5jKHRoaXMuJHNjb3BlW2VDYk5hbWVdKSl7XG5cdFx0XHRcdFx0bG9nLmluZm8odGhpcy4kc2NvcGVbZUNiTmFtZV0udG9TdHJpbmcoKSlcblx0XHRcdFx0XHQkZG9tLm9uKGVUeXBlLCAoKT0+e1xuXHRcdFx0XHRcdFx0dGhpcy4kc2NvcGVbZUNiTmFtZV0oKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGxvZy53YXJuKCdNaXNzaW5nICcgKyBlQ2JOYW1lICsgJ21ldGhvZC4nKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRcblx0fVxuXG5cdGh0bWwoKXtcblx0XHRpZighdGhpcy4kZG9tKXtcblx0XHRcdHRoaXMudXBkYXRlRG9tKClcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuJGRvbS5vdXRlckhUTUxcblx0fVxuXG5cdC8qXG5cdCAqIHZpZXdcblx0ICovXG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMudXBkYXRlRG9tKClcblx0XHRjb25zb2xlLmxvZygnaHRtbDogJywgdGhpcy5odG1sKCkpXG5cdFx0Ly90aGlzLl9pbml0KClcblx0XHQvL3RoaXMuaW5pdCgpXG5cdFx0Ly90aGlzLmNyZWF0ZSgpXG5cdFx0dGhpcy5yZW5kZXIoJ2FwcCcpXG5cdFx0dGhpcy5yZWFkeSgpXG5cdH1cblxuXHRyZW5kZXIoc2VsZWN0b3Ipe1xuXHRcdGxldCBjb250YWluZXIgPSBudWxsXG5cdFx0aWYoc2VsZWN0b3IgJiYgdGhpcy4kc2VsZWN0b3IgJiYgdGhpcy4kc2VsZWN0b3IgPT0gc2VsZWN0b3Ipe1xuXHRcdFx0Y29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyXG5cdFx0fWVsc2UgaWYoc2VsZWN0b3Ipe1xuXHRcdFx0Y29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpXG5cdFx0XHR0aGlzLiRzZWxlY3RvciA9IHNlbGVjdG9yXG5cdFx0XHR0aGlzLiRjb250YWluZXIgPSBjb250YWluZXJcdFx0XHRcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5XG5cdFx0fVxuXG5cdFx0Y29udGFpbmVyLmlubmVySFRNTCA9IHRoaXMuaHRtbCgpXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKXtcblx0Y29uc3QgcGxleCA9IGhhc2goKVxuXHRwbGV4LmFwcCA9IG51bGxcblxuXHRwbGV4LmNyZWF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uKG9wdGlvbnMgPSBoYXNoKCkpe1xuXHRcdHRoaXMuYXBwID0gbmV3IENvbXBvbmVudChvcHRpb25zKVxuXHR9XG5cdHBsZXgucmVuZGVyID0gZnVuY3Rpb24oc2VsZWN0b3Ipe1xuXHRcdGxldCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3Rvcilcblx0XHRjb250YWluZXIuaW5uZXJIVE1MID0gdGhpcy5hcHAuaHRtbCgpXG5cdH1cbn1cblxuLypcbiAqIGRlbW9cbiAqL1xubGV0IE15Q29tcG9uZW50ID0gZnVuY3Rpb24oc3RyID0gJ3d3dy5pd2FpbWFpLmNvbScpe1xuXHRyZXR1cm4gaC5kaXYoXG5cdFx0XHR7IFxuXHRcdFx0XHRjbGFzczogJ2NvbnRhaW5lcicsXG5cdFx0XHRcdG9uQ2xpY2s6ICdjaGFuZ2VBZ2UnXG5cdFx0XHR9LFxuXHRcdFx0aC5oZWFkZXIoXG5cdFx0XHRcdFx0aC5kaXYoJ2hlbGxvIHdvcmxkIScpXG5cdFx0XHRcdCksXG5cdFx0XHRoLmFydGljbGUoXG5cdFx0XHRcdGguZGl2KFxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucGFyYWdyYXBoICsgdGhpcy5uYW1lICsgdGhpcy5hZ2Vcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpXG5cdFx0XHRcdCksXG5cdFx0XHRoLmZvb3Rlcihcblx0XHRcdFx0aC5pbnB1dCh7XG5cdFx0XHRcdFx0dHlwZTogJ3RleHQnXG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRoLmEoe1xuXHRcdFx0XHRcdFx0aHJlZjogc3RyXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0aGlzLm5hbWVcblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0KVxufVxuXG5sZXQgcm9vdEFwcCA9IG5ldyBDb21wb25lbnQoTXlDb21wb25lbnQse1xuXHRcdGRhdGE6IHtcblx0XHRcdG5hbWU6ICdiYWlkdScsXG5cdFx0XHRhZ2U6IDE4LFxuXHRcdFx0cGFyYWdyYXBoOiAnbXkgbmFtZSBpcyB5YW5neGlhb2Z1J1xuXHRcdH0sXG5cdFx0bWV0aG9kczoge1xuXHRcdFx0Y2hhbmdlQWdlKCl7XG5cdFx0XHRcdHRoaXMuYWdlID0gMSBcblx0XHRcdFx0Y29uc29sZS5sb2coJ2FnZTogJywgdGhpcy5hZ2UpXG5cdFx0XHR9XG5cdFx0fVx0XG5cdH0pXG5cbnJvb3RBcHAucmVuZGVyKCdhcHAnKVxucm9vdEFwcC5yZWFkeSgpXG4vLyBsZXQgYXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4vLyAvLyBhcHAuaW5uZXJIVE1MID0gKE15Q29tcG9uZW50LmlubmVySFRNTClcbi8vIGFwcC5pbm5lckhUTUwgPSAocm9vdEFwcC4kZG9tLm91dGVySFRNTClcbi8vIHJvb3RBcHAucmVhZHkoKVxuXG4vLyBjb25zdCBwZXJzb24gPSB7XG4vLyBcdG5hbWU6ICd5c2YnLFxuLy8gXHRhZ2U6IDE4XG4vLyB9XG5cbi8vIGxldCByZWFjdGl2ZVBlcnNvbiA9IG5ldyBPYnNlcnZlcihwZXJzb24sICduYW1lJywgcGVyc29uLm5hbWUpXG4vLyByZWFjdGl2ZVBlcnNvbi5hZGRTdWIoZnVuY3Rpb24oKXtcbi8vIFx0Y29uc29sZS5sb2coJ3BlcnNvbi5uYW1lJywgcGVyc29uLm5hbWUpXG4vLyBcdHBlcnNvbi5uYW1lID0gJ3hpYW9mdSdcbi8vIH0pXG4vLyBwZXJzb24ubmFtZSA9ICd5YW5neGlhb2Z1J1xuXG4vL2NvbnNvbGUubG9nKCdodG1sJywgTXlDb21wb25lbnQsIE15Q29tcG9uZW50LmlubmVySFRNTClcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbCkge1xuICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgZWxlbWVudDogJGVsLFxuICAgICAgICBldmVudEhhbmRsZXI6IHtcbiAgICAgICAgICAgIGV2ZW50czoge30sXG4gICAgICAgICAgICBiaW5kRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaywgdGFyZ2V0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vYmluZCBldmVudCBsaXN0ZW5lciB0byBET00gZWxlbWVudFxuICAgICAgICAgICAgICAgIC8v5Zyo5YaS5rOh6Zi25q616Kem5Y+RXG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IHRoaXMuZXZlbnRzW2V2ZW50XS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SWQ6IGNvdW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRJZDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmRFdmVudDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50c1tldmVudF1bMF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogcmV0dXJuIGFsbCBsaXN0ZW4gZXZlbnRzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGFsbDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50c1tldmVudF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bmJpbmRFdmVudDogZnVuY3Rpb24oZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm91bmRFdmVudCA9IHRoaXMuZmluZEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBpZiAoZm91bmRFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZvdW5kRXZlbnQuZXZlbnQsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBldmVudHMgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHMgPSB0aGlzLmV2ZW50c1tldmVudF0uZmlsdGVyKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlLmNvdW50ZXIgIT09IGV2ZW50LmNvdW50ZXI7XG4gICAgICAgICAgICAgICAgICAgIH0sIGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbihldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5hbGwoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi51bmJpbmRFdmVudChlLCB0YXJnZXRFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIOajgOafpeivpeS6i+S7tuexu+Wei+aYr+WQpuiiq+e7keWumlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpc0JpbmRpbmc6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmluZEV2ZW50KGV2ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbjogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5iaW5kRXZlbnQoZXZlbnQsIGNhbGxiYWNrLCB0aGlzLmVsZW1lbnQpO1xuICAgICAgICB9LFxuICAgICAgICAvKlxuICAgICAgICAgKiBiaW5kIG9uY2VcbiAgICAgICAgICovXG4gICAgICAgIG9uY2U6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIucmVtb3ZlKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIGNhbGxiYWNrKTtcbiAgICAgICAgfSxcbiAgICAgICAgb2ZmOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIudW5iaW5kRXZlbnQoZXZlbnQsIHRoaXMuZWxlbWVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qXG4gICAgICAgICAqIGRlbGVnYXRlIOS6i+S7tiznu5nliqjmgIHmt7vliqDlhYPntKDnu5Hlrprnm5HlkKzkuovku7ZcbiAgICAgICAgICovXG4gICAgICAgIC8vIGRlbGVnYXRlOiBmdW5jdGlvbihzZWxlY3RvciwgZXZlbnQsIGZuKSB7XG4gICAgICAgIC8vICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vICAgICBzZWxmLm9uKGV2ZW50LCBmdW5jdGlvbihlKSB7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAvLyAgICAgICAgIHZhciBjaGlsZHJlbiA9IHNlbGYuY3JlYXRlKHNlbGYuc2VsZWN0b3IgKyAnICcgKyBzZWxlY3RvcikuZWxlbWVudHM7XG4gICAgICAgIC8vICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICBpZiAoZS50YXJnZXQgPT0gY2hpbGQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGZuLmNhbGwoY29udGV4dCwgZSk7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9KVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLypcbiAgICAgICAgICog6Kem5Y+R5oyH5a6a5LqL5Lu2XG4gICAgICAgICAqL1xuICAgICAgICAvL+a1j+iniOWZqOS6i+S7tu+8jOm7mOiupOWGkuazoVxuICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgICAgICAgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV2ZW50XG59XG4iLCIvKlxuKiBkZWJ1Z1xuKi9cbmNvbnN0IENvbmZpZyA9IHtcblx0ZGVidWc6IHRydWVcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRlcnJvcigpe1xuXHRcdGlmKENvbmZpZy5kZWJ1Zyl7XG5cdFx0XHRjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcblx0XHR9XG5cdH0sXG5cdGluZm8oKXtcblx0XHRpZihDb25maWcuZGVidWcpe1xuXHRcdFx0Y29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKVxuXHRcdH1cblx0fSxcblx0d2Fybigpe1xuXHRcdGlmKENvbmZpZy5kZWJ1Zyl7XG5cdFx0XHRjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKVxuXHRcdH1cblx0fVxufSIsImltcG9ydCBfIGZyb20gJy4vdXRpbC5qcydcblxuY29uc3QgcmFuZG9tU3RyID0gXy5yYW5kb21TdHJcbmNvbnN0IGhhc2ggPSBfLmhhc2hcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZXtcblx0Y29uc3RydWN0b3IodGFnTmFtZSA9ICcnLCBwYXJlbnQgPSBudWxsKXtcblx0XHR0aGlzLmlkID0gcmFuZG9tU3RyKClcblx0XHR0aGlzLmh0bWwgPSAnJ1xuXHRcdHRoaXMuYXR0cmlidXRlID0gaGFzaCgpXG5cdFx0dGhpcy5ub2RlVHlwZSA9ICcnXG5cdFx0dGhpcy5ub2RlTmFtZSA9IHRhZ05hbWVcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudFxuXHRcdHRoaXMuY2hpbGRyZW4gPSBbXVxuXHRcdHRoaXMuc2NvcGUgPSBoYXNoKClcblx0XHR0aGlzLmV2ZW50cyA9IGhhc2goKVxuXHR9XG5cblx0Z2V0IGlubmVySFRNTCgpe1xuXHRcdGxldCBfaHRtbCA9ICcnXG5cdFx0aWYodGhpcy5jaGlsZHJlbil7XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpe1xuXHRcdFx0XHRpZihjaGlsZCBpbnN0YW5jZW9mIE5vZGUpe1xuXHRcdFx0XHRcdF9odG1sICs9IGNoaWxkLm91dGVySFRNTFx0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9ZWxzZXtcblx0XHRcdF9odG1sID0gdGhpcy5pbm5lckhUTUxcblx0XHR9XG5cdFx0cmV0dXJuIF9odG1sXG5cdH1cblx0c2V0IGlubmVySFRNTChfaHRtbCl7XG5cdFx0aWYoX2h0bWwgaW5zdGFuY2VvZiBOb2RlKXtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSBbXVxuXHRcdFx0dGhpcy5jaGlsZHJlbi5wdXNoKF9odG1sKVxuXHRcdH1lbHNlIGlmKEFycmF5LmlzQXJyYXkoX2h0bWwpKXtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSBfaHRtbFxuXHRcdH1cblx0fVxuXG5cdGdldCBvdXRlckhUTUwoKXtcblx0XHRsZXQgYXR0cnMgPSB0aGlzLmF0dHJpYnV0ZVxuXHRcdGxldCBhdHRyRG9tID0gJydcblx0XHRsZXQgdGFnID0gdGhpcy5ub2RlTmFtZVxuXHRcdHRoaXMuZXZlbnRzID0gaGFzaCgpXG5cdFx0YXR0ckRvbSArPSBgIGlkPVwiJHt0aGlzLmlkfVwiYFxuXHRcdGZvcihsZXQgYXR0ciBpbiBhdHRycyl7XG5cdFx0XHQvKlxuXHRcdFx0ICogZXZlbnRzIGNvbGxlY3Rcblx0XHRcdCAqL1xuXHRcdFx0aWYoYXR0ci5zdWJzdHIoMCwgMikgPT09ICdvbicpe1xuXHRcdFx0XHRsZXQgZXZlbnRUeXBlID0gYXR0ci5zdWJzdHIoMilcblx0XHRcdFx0ZXZlbnRUeXBlID0gZXZlbnRUeXBlLnRvTG93ZXJDYXNlKClcblx0XHRcdFx0aWYoIXRoaXMuZXZlbnRzW2V2ZW50VHlwZV0pe1xuXHRcdFx0XHRcdHRoaXMuZXZlbnRzW2V2ZW50VHlwZV0gPSBbXVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuZXZlbnRzW2V2ZW50VHlwZV0ucHVzaChhdHRyc1thdHRyXSlcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRhdHRyRG9tICs9IGAke2F0dHJ9PVwiJHthdHRyc1thdHRyXX1cImBcdFx0XHRcdFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBgPCR7dGFnfSR7YXR0ckRvbX0+JHt0aGlzLmlubmVySFRNTH08LyR7dGFnfT5gXG5cdH1cbn1cbiIsImltcG9ydCBfIGZyb20gJy4uL3V0aWwnXG5cbmNvbnN0IGRlZiA9IF8uZGVmXG5jb25zdCBoYXNPd24gPSBfLmhhc093blxuY29uc3QgaXNPYmplY3QgPSBfLmlzT2JqZWN0XG5jb25zdCBpc0Z1bmMgPSBfLmlzRnVuY1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3Iob2JqID0ge30sIGtleSwgdmFsKSB7XG4gICAgICAgIHRoaXMub2JqID0gb2JqXG4gICAgICAgIHRoaXMua2V5ID0ga2V5XG4gICAgICAgIHRoaXMudmFsID0gdmFsXG4gICAgICAgIHRoaXMuc3VicyA9IFtdXG5cbiAgICAgICAgdGhpcy5kZWZpbmVSZWFjdGl2ZShvYmosIGtleSwgdmFsKVxuICAgIH1cblxuICAgIGFkZFN1YihzdWIpIHtcbiAgICAgICAgdGhpcy5zdWJzLnB1c2goc3ViKVxuICAgIH1cblxuICAgIG5vdGlmeSgpIHtcbiAgICAgICAgbGV0IHN1YnMgPSB0aGlzLnN1YnNcbiAgICAgICAgc3Vicy5mb3JFYWNoKGZ1bmN0aW9uKHN1Yikge1xuICAgICAgICAgICAgaWYoaXNGdW5jKHN1Yikpe1xuICAgICAgICAgICAgXHRzdWIoKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBcdHN1Yi51cGRhdGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRlZmluZVJlYWN0aXZlKG9iaiwga2V5LCB2YWwsIGRvTm90T2JzZXJ2ZSkge1xuICAgIFx0aWYob2JqW2tleV0uX19vYl9fKSByZXR1cm5cblxuICAgIFx0Y29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSlcbiAgICAgICAgaWYgKHByb3BlcnR5ICYmIHByb3BlcnR5LmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2F0ZXIgZm9yIHByZS1kZWZpbmVkIGdldHRlci9zZXR0ZXJzXG4gICAgICAgIGxldCBnZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5nZXRcbiAgICAgICAgbGV0IHNldHRlciA9IHByb3BlcnR5ICYmIHByb3BlcnR5LnNldFxuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gcmVhY3RpdmVHZXR0ZXIoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiByZWFjdGl2ZVNldHRlcihuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBnZXR0ZXIgPyBnZXR0ZXIuY2FsbChvYmopIDogdmFsXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXR0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGVyLmNhbGwob2JqLCBuZXdWYWwpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gbmV3VmFsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYubm90aWZ5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59XG5cblxuIiwiaW1wb3J0IF8gZnJvbSAnLi91dGlsLmpzJ1xuaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlLmpzJ1xuaW1wb3J0IFZvaWROb2RlIGZyb20gJy4vdm9pZE5vZGUuanMnXG5pbXBvcnQgVGV4dE5vZGUgZnJvbSAnLi9UZXh0Tm9kZS5qcydcblxuY29uc3QgZXh0ZW5kID0gXy5leHRlbmRcbmNvbnN0IGhhc2ggPSBfLmhhc2hcbmNvbnN0IGZvcm1hdFN0ciA9IF8uZm9ybWF0U3RyXG5cbi8vcHJpbWl0aXZlXG5leHBvcnQgZnVuY3Rpb24gc2luZ2xlVGFnKHRhZyl7XG5cdHJldHVybiBmdW5jdGlvbihhdHRycyA9IHt9KXtcblx0XHRsZXQgdm9pZE5vZGUgPSBuZXcgVm9pZE5vZGUodGFnKVxuXHRcdHZvaWROb2RlLmF0dHJpYnV0ZSA9IGF0dHJzXG5cdFxuXHRcdHJldHVybiB2b2lkTm9kZVxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3VibGVUYWcodGFnKXtcblx0Lypcblx0ICogQHBhcmFtcyBhdHRycyB7b2JqZWN0fVxuXHQgKiBAcGFyYW1zIGh0bWwge3N0cmluZ31cblx0ICogQHBhcmFtcyBOb2RlIGluc3RhbmNlIHtjbGFzcyBpbnN0YW5jZX1cblx0ICovXG5cdHJldHVybiBmdW5jdGlvbiBta1RhZygpe1xuXHRcdGxldCBub2RlID0gbmV3IE5vZGUodGFnKVxuXHRcdGxldCBhdHRycyA9IGhhc2goKVxuXG5cdFx0Lypcblx0XHQgKiBjYWxsZWVcblx0XHQgKi9cblx0XHQvL2NvbnN0IF9jYWxsZWVfID0gYXJndW1lbnRzLmNhbGxlZVxuXHRcdGNvbnNvbGUubG9nKCdfY2FsbGVlXzogJywgbWtUYWcudG9TdHJpbmcoKSlcblxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPiAwKXtcblx0XHRcdGxldCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG5cdFx0XHRhcmdzLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdGlmKGl0ZW0gaW5zdGFuY2VvZiBOb2RlKXtcblx0XHRcdFx0XHRub2RlLmNoaWxkcmVuLnB1c2goaXRlbSlcblx0XHRcdFx0XHRpdGVtLnBhcmVudCA9IG5vZGVcblx0XHRcdFx0fWVsc2UgaWYodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKXtcblx0XHRcdFx0XHRhdHRycyA9IGV4dGVuZChhdHRycywgaXRlbSlcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0Ly9zdHJpbmdcblx0XHRcdFx0XHRsZXQgdGV4dE5vZGUgPSBuZXcgVGV4dE5vZGUobm9kZSwgaXRlbSlcblx0XHRcdFx0XHRub2RlLmNoaWxkcmVuLnB1c2godGV4dE5vZGUpXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0XG5cdFx0bm9kZS5hdHRyaWJ1dGUgPSBhdHRyc1xuXG5cdFx0cmV0dXJuIG5vZGVcblx0fVxufVxuXG4vKlxuICogc2VxdWVuY2UgdGFnc1xuICogQHBhcmFtcyB7dGFnIG5hbWUgfCBhcnJheX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKCl7XG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuXG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPj0gMSl7XG5cblx0fVxufVxuXG4vKlxuICogbG9vcCBhbiB0YWdcbiAqIEBwYXJhbXMge2l0ZW0gaW4gaXRlbXN9XG4gKi9cbmV4cG9ydCBjb25zdCBzZm9yID0gZnVuY3Rpb24oKXtcblxufVxuXG5cblxuXG5cblxuXG4iLCJpbXBvcnQge1xuXHRzaW5nbGVUYWcsXG5cdGRvdWJsZVRhZ1xufSBmcm9tICcuL3ByaW1pdGl2ZS5qcydcbi8qXG4gKiBjbG9zZSB0YWdcbiovXG5jb25zdCBDTE9TRV9UQUdTID0gW1xuXHQnaGVhZGVyJyxcblx0J2FydGljbGUnLFxuXHQnZm9vdGVyJyxcblx0J3NlY3Rpb24nLFxuXHQnZGl2Jyxcblx0J3VsJyxcblx0J2xpJyxcblx0J2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1Jyxcblx0J2Zvcm0nLFxuXHQnYnV0dG9uJyxcblx0J2xhYmVsJyxcblx0J2EnXG5dXG5cbmNvbnN0IE9QRU5fVEFHUyA9IFtcblx0J21ldGEnLFxuXHQnaW1nJyxcblx0J2lucHV0J1xuXVxuXG5jb25zdCBoID0ge31cblxuQ0xPU0VfVEFHUy5mb3JFYWNoKGZ1bmN0aW9uKHRhZyl7XG5cdGhbdGFnXSA9IGRvdWJsZVRhZyh0YWcpXG59KVxuXG5PUEVOX1RBR1MuZm9yRWFjaChmdW5jdGlvbih0YWcpe1xuXHRoW3RhZ10gPSBzaW5nbGVUYWcodGFnKVxufSlcblxuZXhwb3J0IGRlZmF1bHQgaCIsImNvbnN0IHV0aWxzID0ge1xuICAgIC8qdHlwZXMqL1xuICAgIHR5cGU6IGZ1bmN0aW9uKG9iail7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5yZXBsYWNlKC9eXFxbb2JqZWN0ICguKylcXF0kLywgJyQxJykudG9Mb3dlckNhc2UoKTtcbiAgICB9LFxuICAgIGlzQXJyYXk6IGZ1bmN0aW9uKGFycikge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuICAgIH0sXG4gICAgdG9BcnJheTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBbXS5zbGljZS5jYWxsKG9iaik7XG4gICAgfSxcbiAgICBpc09iamVjdDogZnVuY3Rpb24ob2JqKXtcbiAgICAgICAgaWYodXRpbHMudHlwZShvYmopID09PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGlzTnVtYmVyOiBmdW5jdGlvbihudW0pe1xuICAgICAgICByZXR1cm4gdXRpbHMudHlwZShudW0pID09PSAnbnVtYmVyJyA/IHRydWUgOiBmYWxzZTtcbiAgICB9LFxuICAgIGlzU3RyaW5nOiBmdW5jdGlvbihzdHIpe1xuICAgICAgICByZXR1cm4gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyB0cnVlIDogZmFsc2U7XG4gICAgfSxcbiAgICBpc0Z1bmM6IGZ1bmN0aW9uKGZuKXtcbiAgICAgICAgcmV0dXJuIHV0aWxzLnR5cGUoZm4pID09PSAnZnVuY3Rpb24nID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0sXG4gICAgLypcbiAgICAgKiBleHRlbmQgYW4gb2JqZWN0XG4gICAgICovXG4gICAgZXh0ZW5kKG9sZE9iaiA9IHt9LCBuZXdPYmogPSB7fSkge1xuICAgICAgICBmb3IgKGxldCBvIGluIG5ld09iaikge1xuICAgICAgICAgICAgaWYgKG5ld09iai5oYXNPd25Qcm9wZXJ0eShvKSkge1xuICAgICAgICAgICAgICAgIG9sZE9ialtvXSA9IG5ld09ialtvXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvbGRPYmpcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYW4gQXJyYXktbGlrZSBvYmplY3QgdG8gYSByZWFsIEFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheS1saWtlfSBsaXN0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtzdGFydF0gLSBzdGFydCBpbmRleFxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuXG4gICAgdG9BcnJheSAobGlzdCwgc3RhcnQpIHtcbiAgICAgIHN0YXJ0ID0gc3RhcnQgfHwgMFxuICAgICAgdmFyIGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0XG4gICAgICB2YXIgcmV0ID0gbmV3IEFycmF5KGkpXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHJldFtpXSA9IGxpc3RbaSArIHN0YXJ0XVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJldFxuICAgIH0sXG4gICAgLyoqXG4gICAgICogRGVmaW5lIGEgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZW51bWVyYWJsZV1cbiAgICAgKi9cblxuICAgIGRlZiAob2JqLCBrZXksIHZhbCwgZW51bWVyYWJsZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIHZhbHVlOiB2YWwsXG4gICAgICAgIGVudW1lcmFibGU6ICEhZW51bWVyYWJsZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSlcbiAgICB9LFxuICAgIC8qXG4gICAgICog6ZqP5py65pWw55Sf5oiQXG4gICAgICovXG4gICAgcmFuZG9tU3RyKCl7XG4gICAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMikgKyBOdW1iZXIobmV3IERhdGUoKSlcbiAgICBcdHJldHVybiByYW5kb21cbiAgICB9LFxuICAgIGhhc2goKXtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB9LFxuICAgIGZvcm1hdFN0cihvYmope1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCAnXFx0JylcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBvYmplY3QgcmVsYXRpdmVcbiAgICAgKi9cbiAgICAvKipcbiAgICAgKiBDaGVjayB3aGV0aGVyIHRoZSBvYmplY3QgaGFzIHRoZSBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNPd24gKG9iaiwga2V5KSB7XG4gICAgICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgICAgICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpXG4gICAgfSxcbiAgICBub3JtYWxpemUocGF0aCA9ICcnLCBvYmogPSB7fSkge1xuICAgIGxldCBwQXJyID0gbnVsbCxcbiAgICAgICAgdmFsdWUgPSBvYmpcbiAgICBpZiAocGF0aCAmJiBvYmopIHtcbiAgICAgICAgaWYgKHBhdGhbMF0gPT0gJy4nKSBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMSlcbiAgICAgICAgaWYgKHBhdGhbcGF0aC5sZW5ndGggLSAxXSA9PSAnLicpIHtcbiAgICAgICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cigwLCAtMilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXRoLmluZGV4T2YoJy4nKSAhPSAtMSkge1xuICAgICAgICAgICAgcEFyciA9IHBhdGguc3BsaXQoJy4nKVxuXG4gICAgICAgICAgICBwQXJyLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtrZXldXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmVycm9yKG9iaiwgJ3RoZSB2YWx1ZSBvZiAnICsgcGF0aCArICcgaXMgdW5kZWZpbmVkLicpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxufVxufVxuZXhwb3J0IGRlZmF1bHQgdXRpbHNcbiIsImltcG9ydCBOb2RlIGZyb20gJy4vbm9kZS5qcydcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZvaWROb2RlIGV4dGVuZHMgTm9kZXtcblx0Y29uc3RydWN0b3IodGFnTmFtZSwgcGFyZW50PW51bGwpe1xuXHRcdHN1cGVyKHRhZ05hbWUsIHBhcmVudClcblx0fVxuXG5cdGdldCBpbm5lckhUTUwoKXtcblx0XHRyZXR1cm4gJydcblx0fVxuXHRzZXQgaW5uZXJIVE1MKHZhbCl7XG5cdFx0bG9nLndhcm4oJ3ZvaWQgZWxlbWVudCBjYW4gbm90IHNldCBpbm5lckhUTUwuJylcblx0fVxuXG5cdGdldCBvdXRlckhUTUwoKXtcblx0XHRsZXQgYXR0ckRvbSA9ICcnXG5cdFx0bGV0IGF0dHJzID0gdGhpcy5hdHRyaWJ1dGVcblx0XHRsZXQgdGFnID0gdGhpcy5ub2RlTmFtZVxuXG5cdFx0YXR0ckRvbSArPSBgIGlkPVwiJHt0aGlzLmlkfVwiYFxuXHRcdGZvcihsZXQgYXR0ciBpbiBhdHRycyl7XG5cdFx0XHRhdHRyRG9tICs9IGAke2F0dHJ9PVwiJHthdHRyc1thdHRyXX1cImBcblx0XHR9XG5cdFx0cmV0dXJuIGA8JHt0YWd9ICR7YXR0ckRvbX0+YFxuXHR9XG59XG5cbiJdfQ==
