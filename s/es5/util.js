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