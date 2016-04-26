const utils = {
    /*types*/
    type: function(obj){
        return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
    },
    isArray: function(arr) {
        return Array.isArray(arr);
    },
    toArray: function(obj) {
        return [].slice.call(obj);
    },
    isObject: function(obj){
        if(utils.type(obj) === 'object'){
            return true;
        }else{
            return false;
        }
    },
    isNumber: function(num){
        return utils.type(num) === 'number' ? true : false;
    },
    isString: function(str){
        return typeof str === 'string' ? true : false;
    },
    isFunc: function(fn){
        return utils.type(fn) === 'function' ? true : false;
    },
    /*
     * extend an object
     */
    extend(oldObj = {}, newObj = {}) {
        for (let o in newObj) {
            if (newObj.hasOwnProperty(o)) {
                oldObj[o] = newObj[o]
            }
        }
        return oldObj
    },
    /**
     * Convert an Array-like object to a real Array.
     *
     * @param {Array-like} list
     * @param {Number} [start] - start index
     * @return {Array}
     */

    toArray (list, start) {
      start = start || 0
      var i = list.length - start
      var ret = new Array(i)
      while (i--) {
        ret[i] = list[i + start]
      }
      return ret
    },
    /**
     * Define a property.
     *
     * @param {Object} obj
     * @param {String} key
     * @param {*} val
     * @param {Boolean} [enumerable]
     */

    def (obj, key, val, enumerable) {
      Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
      })
    },
    /*
     * 随机数生成
     */
    randomStr(){
        const random = Math.random().toString().substring(2) + Number(new Date())
    	return random
    },
    hash(){
        return Object.create(null)
    },
    formatStr(obj){
        return JSON.stringify(obj, '\t')
    },

    /*
     * object relative
     */
    /**
     * Check whether the object has the property.
     *
     * @param {Object} obj
     * @param {String} key
     * @return {Boolean}
     */
    hasOwn (obj, key) {
        let hasOwnProperty = Object.prototype.hasOwnProperty
        return hasOwnProperty.call(obj, key)
    },
    normalize(path = '', obj = {}) {
    let pArr = null,
        value = obj
    if (path && obj) {
        if (path[0] == '.') path = path.substring(1)
        if (path[path.length - 1] == '.') {
            path = path.substr(0, -2)
        }

        if (path.indexOf('.') != -1) {
            pArr = path.split('.')

            pArr.forEach(function(key) {
                if (value[key]) {
                    value = value[key]
                } else {
                    log.error(obj, 'the value of ' + path + ' is undefined.')
                }
            })
            return value
        }
    }
}
}
export default utils
