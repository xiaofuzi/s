import * as _ from '../tag.js'

let doctype = _.doctype,
	html    = _.html,
	head    = _.head,
	meta	= _.meta,
	title 	= _.title,
	body 	= _.body

function html5(){
	return function(options = {}){
			headContent    = options.headContent || '',
			title 	= options.title || '',
			bodyContent 	= options.body || ''
		return doctype() + 
			html(
			head(
					headContent,
					meta(),
					title(title ? title : 'HTML5 template')
				),
			body(
					bodyContent
				)
		)
	}
}



