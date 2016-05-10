import _ from './util.js'
import Node from './node.js'
import VoidNode from './voidNode.js'
import TextNode from './TextNode.js'

const extend = _.extend
const hash = _.hash
const formatStr = _.formatStr
const isObject = _.isObject
const isFunc = _.isFunc

//primitive
export function singleTag(tag){
	return function(attrs = {}){
		let voidNode = new VoidNode(tag)
		voidNode.attribute = attrs
	
		return voidNode
	}
}

export function doubleTag(tag){

	/*
	 * Node diff
	 * diff type: attrs object text node dom
	 */
	function diff(oldArg, newArg){
		const diff = hash()
		//dom change, update all
		if(oldArg.length != newArg.length){

		}else{
			
		}
	}

	/*
	 * @params attrs {object}
	 * @params html {string}
	 * @params Node instance {class instance}
	 */
	return function mkTag(){
		let node = new Node(tag)
		let attrs = hash()

		if(arguments.length > 0){
			let args = [].slice.call(arguments, 0)
			args.forEach(function(item){
				if(item instanceof Node){
					node.children.push(item)
					item.parent = node
				}else if(isObject(item)){
					attrs = extend(attrs, item)
				}else if(isFunc(item)){
					//args.push(item())
				}else{
					//string
					let textNode = new TextNode(node, item)
					node.children.push(textNode)
				}
			})
		}

		
		node.attribute = attrs

		return node
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
 * loop an tag
 * @params {item in items}
 */
export const sfor = function(){

}







