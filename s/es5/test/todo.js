'use strict';

var _tag = require('../tag.js');

var _ = _interopRequireWildcard(_tag);

var _diff = require('virtual-dom/diff');

var _diff2 = _interopRequireDefault(_diff);

var _createElement = require('virtual-dom/create-element');

var _createElement2 = _interopRequireDefault(_createElement);

var _patch = require('virtual-dom/patch');

var _patch2 = _interopRequireDefault(_patch);

var _h = require('virtual-dom/h');

var _h2 = _interopRequireDefault(_h);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var arr = [0, 1, 2, 3, 4];

var todo = div({ class: 'container' }, li(div(input({ class: 'toggle', type: 'checkbox' }), label('name'), button({ class: 'destroy' })), forEach(arr, function () {
    return input({ class: 'edit', value: 'name' });
})));

var app = document.getElementById('app');
var container = (0, _h2.default)('div');
console.log('todo: ', container, todo);
var todoDom = (0, _createElement2.default)(todo);
var containerDom = (0, _h2.default)('div');
app.innerHTML = todoDom;
app.innerHTML = containerDom;

/*
 * directive
 */
function forEach(array, cb) {
    var newArr = array.map(function (item, index) {
        return cb(item, index);
    });
    return newArr.join('');
}

function createComponent(data) {
    return;
}

function render(component, data) {
    return component;
}