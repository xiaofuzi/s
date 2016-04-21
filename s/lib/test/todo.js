import * as _ from '../tag.js'
import diff from 'virtual-dom/diff'
import createElement from 'virtual-dom/create-element'
import patch from 'virtual-dom/patch'
import h from 'virtual-dom/h'

let doctype = _.doctype,
    html = _.html,
    head = _.head,
    meta = _.meta,
    title = _.title,
    body = _.body,
    li = _.li,
    ul = _.ul,
    input = _.input,
    button = _.button,
    div = _.div,
    label = _.label

let arr = [0, 1, 2, 3, 4]

let todo = div({ class: 'container' },
    li(
        div(
            input({ class: 'toggle', type: 'checkbox' }),
            label('name'),
            button({ class: 'destroy' })
        ),
        forEach(arr, function() {
            return input({ class: 'edit', value: 'name' })
        })
    )
)

let app = document.getElementById('app')
let container = h('div')
console.log('todo: ', container, todo)
let todoDom = createElement(todo)
let containerDom = h('div')
app.innerHTML = todoDom
app.innerHTML = containerDom


/*
 * directive
 */
function forEach(array, cb) {
    const newArr = array.map(function(item, index) {
        return cb(item, index)
    })
    return newArr.join('')
}

function createComponent(data){
	return 
}

function render(component, data){
	return component
}