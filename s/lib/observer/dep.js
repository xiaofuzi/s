let uid = 0

/**
 * A dep is an observable that can have multiple
 * subscriber
 */

export default class Dep{
	constructor(){
		this.id = uid++
		this.subs = []
	}

	/*
	 * the current target watcher being evaluated.
	 * this is globally unique because there could be only one
	 * watcher being evaluated at any time.
	 */
	static target = null

	/*
	 * Add a subscriber
	 */
	addSub(sub){
		this.subs.push(sub)
	}

	/*
	 * Remove a subscriber
	 */

	/**
	 * Add self as a dependency to the target watcher.
	 */

	depend() {
	  this.target.addDep(this)
	}

	/**
	 * Notify all subscribers of a new value.
	 */

	notify() {
	  let subs = this.subs
	  for (let i = 0, l = subs.length; i < l; i++) {
	    subs[i].update()
	  }
	}
}

