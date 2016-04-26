import Dep from './dep'
import _ from '../util'

const def = _.def
const hasOwn = _.hasOwn
const isObject = _.isObject

export class Observer{
	constructor(value){
		this.value = value
		this.dep = new Dep()

		def(value, '__ob__', this)
		this.walk(value)
	}

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	walk(obj){
		let keys = Object.keys(obj)
		for(let i = 0, l = keys.length; i < l; i++){
			this.convert(keys[i], obj[keys[i]])
		}
	}

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	convert(key, val) {
	  defineReactive(this.value, key, val)
	}
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 *
 * @param {*} value
 * @return {Observer|undefined}
 * @static
 */
export function observe(value){
	if(!value || typeof value !== 'object'){
		return 
	}
	let ob
	if(
		hasOwn(value, '__ob__') &&
		value.__ob__ instanceof Observer
		){
		ob = value.__ob__
	}else if(
		isObject(value) &&
		Object.isExtensible(value)
		){
		ob = new Observer(value)
	}
	return ob
}

/**
 * Define a reactive property on an Object.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 * @param {Boolean} doNotObserve
 */
export function defineReactive(obj, key, val, doNotObserve){
	let dep = new Dep()
	let property = Object.getOwnPropertyDescriptor(obj, key)
	if(property && property.configurable === false){
		return
	}

  	// cater for pre-defined getter/setters
  	let getter = property && property.get
  	let setter = property && property.set

  	let childOb = doNotObserve
  		? isObject(val) && val.__ob__
  		: observe(val)

  	Object.defineProperty(obj, key, {
  		enumerable: true,
  		configurable: true,
  		get: function reactiveGetter(){
  			let value = getter ? getter.call(obj) : val
  			if(Dep.target){
  				dep.depend()
  				if(childOb){
  					childOb.dep.depend()
  				}
  			}
  			return value
  		},
  		set: function reactiveSetter(newVal){
  			let value = getter ? getter.call(obj) : val
  			if(newVal === value){
  				return
  			}
  			if(setter){
  				setter.call(obj, newVal)
  			}else{
  				val = newVal
  			}
  			childOb = doNotObserve
  				? isObject(newVal) && newVal.__ob__
  				: observe(newVal)
  			dep.notify()
  		}
  	})
}




