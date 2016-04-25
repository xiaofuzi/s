import _ from './util.js'
import log from './log.js'
import Node from './node.js'
import h from './tag.js'
import browserEvent from './browserEvent.js'

const hash = _.hash
const normalize = _.normalize
const extend = _.extend
const isFunc = _.isFunc

class Component{
	constructor(domFn=function(){return ''}, {data=hash(), components=hash(), methods=hash(), init=hash(), create=hash(), ready=hash()}){
		this.$data = data
		this.$domFn = domFn
		this.$components = components
		this.$methods = methods
		/*
		 * life circle
		 */
		this.$init = init
		this.$create = create
		this.$ready = ready

		this.$scope = hash()
		this.$parent = null
		this.$children = []

		this._init()
		this.$dom = this.getDom()
	}

	getDom(){
		return	this.$domFn.call(this.$scope)
	}
	/*
	 * private
	 */
	_init(){
		this.init()
		//get dom
		extend(this.$scope, this.$data)
		extend(this.$scope, this.$methods)

		//components initial
		Object.keys(this.$components).forEach((componentName)=>{
			this.$children.push({
				parent: this.$parent,
				name: componentName,
				body: this.$components[componentName]
			})
		})
		this.create()
	}

	/*
     * life circle
	 */
	_call(obj=hash()){
		if(!obj) return ;
		for(let fnName in obj){
			obj[fnName].call(this.$scope)
		}
	}
	init(){
		this._call(this.$init)
	}
	create(obj){
		this._call(this.$create)
	}
	ready(obj){
		/*
		 * bind browser event after dom is ready
		 */
		this.$el = document.getElementById(this.$dom.id)

		this._bindBrowerEvent()
		this._call(this.$ready)
	}
	/*
     *绑定浏览器事件
	 */
	_bindBrowerEvent(){
		let el = this.$el,
			events = this.$dom.events

		/*
		 * 增加事件功能
		 */
		const $dom = browserEvent(el)
		for(let eType in events){
			let eArray = events[eType]
			eArray.forEach((eCbName)=>{
				if(isFunc(this.$scope[eCbName])){
					log.info(this.$scope[eCbName].toString())
					$dom.on(eType, this.$scope[eCbName])
				}else{
					log.warn('Missing ' + eCbName + 'method.')
				}
			})
		}
		
	}
}

export default function(){
	let plex = hash()

	plex.createComponent = function(options = hash()){
		return new Component(options)
	}
	plex.render = function(component, data){

	}
}

/*
 * demo
 */
let MyComponent = function(str = 'www.iwaimai.com'){
	return h.div(
			{ 
				class: 'container',
				onClick: 'hello'
			},
			h.header(
					h.div('hello world!')
				),
			h.article(
				h.div(
						this.paragraph + this.name
					)
				),
			h.footer(
				h.input({
					type: 'text'
				}),
				h.a({
						href: str
					},
					this.name
					)
				)
	)
}

let rootApp = new Component(MyComponent,{
		data: {
			name: 'baidu',
			paragraph: 'my name is yangxiaofu'
		},
		methods: {
			hello(){
				alert('my name is yangxiaofu!')
			}
		}	
	})

let app = document.getElementById('app')
// app.innerHTML = (MyComponent.innerHTML)
app.innerHTML = (rootApp.$dom.outerHTML)
rootApp.ready()


//console.log('html', MyComponent, MyComponent.innerHTML)
