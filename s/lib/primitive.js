//primitive
export function singleTag(tag){
	return function(attrs = {}){
		let attrDom = ''
		for(let attr in attrs){
			attrDom += `${attr}="${attrs[attr]}"`
		}
		return `<${tag} ${attrDom}>`
	}
}

export function doubleTag(tag){
	/*
	 * @params attrs {object}
	 * @params html {string}
	 */
	return function(){
		let _html = ''
		let attrs = {}
		if(arguments.length > 0){
			let args = [].slice.call(arguments, 0)
			args.forEach(function(item){
				if(typeof item === 'object'){
					attrs = extend(attrs, item)
				}else{
					_html += item
				}
			})
		}else{
			_html = html
		}
		//attribute
		let attrDom = ''
		for(let attr in attrs){
			attrDom += `${attr}="${attrs[attr]}"`
		}
		return `<${tag} ${attrDom}>${_html}</${tag}>`
	}
}

/*
 * sequence tags
 * @params {tag name | array}
 */
export function sequence(){
	if(arguments.length === 0) return ''

	if(arguments.length >= 1){

	}
}
/*
 *
 */
function extend(oldObj = {}, newObj = {}){
	for(let o in newObj){
		if(newObj.hasOwnProperty(o)){
			oldObj[o] = newObj[o]
		}
	}
	return oldObj
}












