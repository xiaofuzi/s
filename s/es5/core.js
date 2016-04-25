'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var api = {};
};

/*
 * sugar
*/
var Config = {
	prefix: 's_'
};


/*
 * directive
 */
function forEach(array, cb) {
	var newArr = array.map(function (item, index) {
		return cb(item, index);
	});
	return newArr.join();
}