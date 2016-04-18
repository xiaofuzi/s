'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*
 * html in js
*/

//primitive
function singleTag(tag) {
	return function (attrs) {
		var attrDom = '';
		for (var attr in attrs) {
			attrDom += attr + '="' + attrs[attr] + '"';
		}
		return '<' + tag + ' ' + attrDom + '>';
	};
}

function doubleTag(tag) {
	return function (html) {
		return '<' + tag + '>' + html + '</' + tag + '>';
	};
}

/*
 * doctype
*/
var doctype = exports.doctype = function doctype() {
	return '<!DOCTYPE html>';
};

/*
 * meta
*/
var meta = exports.meta = function meta() {
	return '<meta charset="UTF-8">';
};

/*
 * title
*/
var title = exports.title = function title(text) {
	return '<title>' + text + '</title>';
};

/*
 * body
*/
var body = exports.body = function body(dom) {
	return '<body>' + dom + '</body>';
};

/*
 * html
*/
var html = exports.html = function html(dom) {
	return '<html>' + dom + '</html>';
};