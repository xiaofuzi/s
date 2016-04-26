import _ from './util.js'

const randomStr = _.randomStr
const hash = _.hash

export default class Node{
	constructor(tagName = '', parent = null){
		this.id = randomStr()
		this.html = ''
		this.attribute = hash()
		this.nodeType = ''
		this.nodeName = tagName
		this.parent = parent
		this.children = []
		this.scope = hash()
		this.events = hash()

		/*
		 *
		 */
	}

	get innerHTML(){
		let _html = ''
		if(this.children){
			this.children.forEach(function(child){
				if(child instanceof Node){
					_html += child.outerHTML					
				}
			})
		}else{
			_html = this.innerHTML
		}
		return _html
	}
	set innerHTML(_html){
		if(_html instanceof Node){
			this.children = []
			this.children.push(_html)
		}else if(Array.isArray(_html)){
			this.children = _html
		}
	}

	get outerHTML(){
		let attrs = this.attribute
		let attrDom = ''
		let tag = this.nodeName
		this.events = hash()
		attrDom += ` id="${this.id}"`
		for(let attr in attrs){
			/*
			 * events collect
			 */
			if(attr.substr(0, 2) === 'on'){
				let eventType = attr.substr(2)
				eventType = eventType.toLowerCase()
				if(!this.events[eventType]){
					this.events[eventType] = []
				}
				this.events[eventType].push(attrs[attr])
			}else{
				attrDom += `${attr}="${attrs[attr]}"`				
			}
		}

		return `<${tag}${attrDom}>${this.innerHTML}</${tag}>`
	}
}
