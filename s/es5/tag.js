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