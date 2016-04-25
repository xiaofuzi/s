import {
	singleTag,
	doubleTag
} from './primitive.js'
/*
 * close tag
*/
const CLOSE_TAGS = [
	'header',
	'article',
	'footer',
	'section',
	'div',
	'ul',
	'li',
	'h1', 'h2', 'h3', 'h4', 'h5',
	'form',
	'button',
	'label',
	'a'
]

const OPEN_TAGS = [
	'meta',
	'img',
	'input'
]

const h = {}

CLOSE_TAGS.forEach(function(tag){
	h[tag] = doubleTag(tag)
})

OPEN_TAGS.forEach(function(tag){
	h[tag] = singleTag(tag)
})

export default h