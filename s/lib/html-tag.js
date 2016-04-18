/*
 * html in js
*/

//primitive
function singleTag(tag){
	return function(attrs){
		let attrDom = ''
		for(let attr in attrs){
			attrDom += `${attr}="${attrs[attr]}"`
		}
		return `<${tag} ${attrDom}>`
	}
}

function doubleTag(tag){
	return function(html){
		return `<${tag}>${html}</${tag}>`
	}
}


/*
 * doctype
*/
export const doctype = function(){
	return '<!DOCTYPE html>'
}

/*
 * meta
*/
export const meta = function(){
	return '<meta charset="UTF-8">'
}

/*
 * title
*/
export const title = function(text){
	return `<title>${text}</title>`
}


/*
 * body
*/
export const body = function(dom){
	return '<body>' + dom + '</body>'
}

/*
 * html
*/
export const html = function(dom){
	return '<html>' + dom + '</html>'
}