import Node from './node.js'
import log from './log.js'

export default class VoidNode extends Node{
	constructor(tagName, parent=null){
		super(tagName, parent)
	}

	get innerHTML(){
		return ''
	}
	set innerHTML(val){
		log.warn('void element can not set innerHTML.')
	}

	get outerHTML(){
		let attrDom = ''
		let attrs = this.attribute
		let tag = this.nodeName

		attrDom += ` id="${this.id}"`
		for(let attr in attrs){
			attrDom += `${attr}="${attrs[attr]}"`
		}
		return `<${tag} ${attrDom}>`
	}
}

