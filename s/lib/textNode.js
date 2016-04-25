import Node from './node.js'
import log from './log.js'


export default class TextNode extends Node {
	constructor(parent, text = ''){
		super('#text', parent)
		this.text = text
	}

	get innerHTML(){
		return this.text
	}
	set innerHTML(text){
		this.text = text
	}

	get outerHTML(){
		return this.innerHTML
	}
}