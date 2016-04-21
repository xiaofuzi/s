import { randomStr } from './util.js'

export class Node{
	constructor(tagName = '', source, parent = null){
		this.id = randomStr()
		this.source = source
		this.nodeType = ''
		this.nodeName = tagName
		this.parent = parent
		this.children = []
	}

	get innerHTML(){
		let _html = ''
		if(this.children){
			this.children.forEach(function(child){
				if(instanceof child == 'Node'){
					_html += child.innerHTML					
				}
			})
		}
		return _html
	}
	set innerHTML(_html){
		if(instanceof _html == 'Node'){
			this.children = []
			this.children.push(_html)
		}else if(Array.isArray(_html)){
			this.children = _html
		}
	}

	get outerHTML(){
		if(isVoid){
			return `<${this.nodeName} >`
		}else{

		}
	}
}



export class TextNode extends Node {
	constructor(source, parent, text){
		super(source, parent)
		this.text = text
	}
}