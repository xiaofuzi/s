import Node from './node.js'
import log from './log.js'

export class VoidNode extends Node{
	constructor(tagName, source, parent){
		super(tagName, source, parent)
	}

	get innerHTML(){
		return ''
	}
	set innerHTML(){
		log.warn('void element can not set innerHTML.')
	}
}