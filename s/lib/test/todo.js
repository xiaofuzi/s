import * as _ from '../tag.js'

let doctype = _.doctype,
	html    = _.html,
	head    = _.head,
	meta	= _.meta,
	title 	= _.title,
	body 	= _.body,
	li 		= _.li,
	ul 		= _.ul,
	input 	= _.input,
	button  = _.button,
	div 	= _.div,
	label 	= _.label


let todo = li(
			div(
				input({class: 'toggle', type: 'checkbox'}),
				label('name'),
				button({class: 'destroy'})
			),
			input({class: 'edit', value: 'name'})
	)
let app = document.getElementById('app')
app.innerHTML = todo