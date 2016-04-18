import * as _ from '../lib/tag.js'

function index(){
	return _.doctype() + _.html(
			_.head(
					_.meta() + _.title('index page')
				) 
			+
			_.body(
				_.div('hello world!')
				)
		)
}

console.log(index())