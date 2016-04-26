import _ from '../util'

const def = _.def
const hasOwn = _.hasOwn
const isObject = _.isObject
const isFunc = _.isFunc

export default class Observer {
    constructor(obj = {}, key, val) {
        this.obj = obj
        this.key = key
        this.val = val
        this.subs = []

        this.defineReactive(obj, key, val)
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    notify() {
        let subs = this.subs
        subs.forEach(function(sub) {
            if(isFunc(sub)){
            	sub()
            }else{
            	sub.update()
            }
        })
    }

    defineReactive(obj, key, val, doNotObserve) {
    	if(obj[key].__ob__) return

    	const self = this
        let property = Object.getOwnPropertyDescriptor(obj, key)
        if (property && property.configurable === false) {
            return
        }

        // cater for pre-defined getter/setters
        let getter = property && property.get
        let setter = property && property.set

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter() {
                let value = getter ? getter.call(obj) : val

                return value
            },
            set: function reactiveSetter(newVal) {
                let value = getter ? getter.call(obj) : val
                if (newVal === value) {
                    return
                }
                if (setter) {
                    setter.call(obj, newVal)
                } else {
                    val = newVal
                }
                self.notify()
            }
        })
    }
}


