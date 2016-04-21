export default {
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
    /*
     * 随机数生成
     */
    randomStr(){
    	return Math.random().toString().substring(2) + Number(new Date())
    }
}
