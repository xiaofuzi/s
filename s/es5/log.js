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