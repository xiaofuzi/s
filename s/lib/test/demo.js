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

