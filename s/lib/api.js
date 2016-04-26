import _ from './util.js'
import log from './log.js'
import Node from './node.js'
import h from './tag.js'
import browserEvent from './browserEvent.js'
import Observer from './observer/observer.js'

const hash = _.hash
const normalize = _.normalize
const extend = _.extend
const isFunc = _.isFunc
const isObject = _.isObject

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
		this.$observer = []
		this.$parent = null
		this.$children = []

		this._init()
		this.$dom = null

		/*
		 * view
		 */
		this.$container = null
		this.$selector = ''
	}

	updateDom(){
		this.$dom =	this.$domFn.call(this.$scope)
	}
	/*
	 * private
	 */
	_init(){
		this.init()
		
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
	create(){
		this._defineReactive(this.$scope)
		this._call(this.$create)
	}
	ready(){
		/*
		 * bind browser event after dom is ready
		 */
		let self = this
		window.onload = function(){
			self.$el = document.getElementById(self.$dom.id)
			self._bindBrowerEvent()
			self._call(self.$ready)
		}
		self.$el = document.getElementById(self.$dom.id)
		self._bindBrowerEvent()
		self._call(self.$ready)
	}

	/*
	 * private
	 * turn an object to reactive
	 */
	_defineReactive(obj=hash()){
		let __ob__ = hash()
		__ob__ = toReactive.call(this, obj)

		function toReactive(obj){
			if(isObject(obj)){
				let observer = hash()
				for(let o in obj){
					if(isObject(obj[o])){
						observer[o] = toReactive(obj[o])
					}else if(!isFunc(obj[o])){
						observer[o] = new Observer(obj, o, obj[o])
						observer[o].addSub(()=>{
							this.update()
						})
					}
				}
				return observer
			}
		}
		this.$observer.push(__ob__)
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
					$dom.on(eType, ()=>{
						this.$scope[eCbName]()
					})
				}else{
					log.warn('Missing ' + eCbName + 'method.')
				}
			})
		}
		
	}

	html(){
		if(!this.$dom){
			this.updateDom()
		}
		return this.$dom.outerHTML
	}

	/*
	 * view
	 */
	update(){
		this.updateDom()
		console.log('html: ', this.html())
		//this._init()
		//this.init()
		//this.create()
		this.render('app')
		this.ready()
	}

	render(selector){
		let container = null
		if(selector && this.$selector && this.$selector == selector){
			container = this.$container
		}else if(selector){
			container = document.getElementById(selector)
			this.$selector = selector
			this.$container = container			
		}else{
			container = this.$container || document.body
		}

		container.innerHTML = this.html()
	}
}

export default function(){
	const plex = hash()
	plex.app = null

	plex.createComponent = function(options = hash()){
		this.app = new Component(options)
	}
	plex.render = function(selector){
		let container = document.getElementById(selector)
		container.innerHTML = this.app.html()
	}
}

/*
 * demo
 */
let MyComponent = function(str = 'www.iwaimai.com'){
	return h.div(
			{ 
				class: 'container',
				onClick: 'changeAge'
			},
			h.header(
					h.div('hello world!')
				),
			h.article(
				h.div(
						function(){
							return this.paragraph + this.name + this.age
						}
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
			age: 18,
			paragraph: 'my name is yangxiaofu'
		},
		methods: {
			changeAge(){
				this.age = 1 
				console.log('age: ', this.age)
			}
		}	
	})

rootApp.render('app')
rootApp.ready()
// let app = document.getElementById('app')
// // app.innerHTML = (MyComponent.innerHTML)
// app.innerHTML = (rootApp.$dom.outerHTML)
// rootApp.ready()

// const person = {
// 	name: 'ysf',
// 	age: 18
// }

// let reactivePerson = new Observer(person, 'name', person.name)
// reactivePerson.addSub(function(){
// 	console.log('person.name', person.name)
// 	person.name = 'xiaofu'
// })
// person.name = 'yangxiaofu'

//console.log('html', MyComponent, MyComponent.innerHTML)
