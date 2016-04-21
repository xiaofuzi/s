/*
 * sugar
*/
const Config = {
	prefix: 's_'
}
export default function(){
	const api = {}
}

/*
 * directive
 */
function forEach(array, cb){
	const newArr = array.map(function(item, index){
		return cb(item, index)
	})
	return newArr.join()
}