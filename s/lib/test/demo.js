import * as _ from '../tag.js'

function html5(){
	return _.doctype() + 
			_.html(
			_.head(
					_.meta(),
					_.title('hello world!')
				),
			_.body()
		)
}

console.log(index())


class Point{
	constructor(x, y){
		this.x = x
		this.y = y
	}
}

class ComplexPoint extends Point{
	constructor(x, y, z){
		super(x, y)
		this.z = z
	}
}

console.log(new ComplexPoint(1,2,3))