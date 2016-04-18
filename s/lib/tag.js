/*
 * html in js
 */
import * as api from './primitive.js'
const singleTag = api.singleTag
const doubleTag = api.doubleTag

//***********************************************//
/*
 * doctype
 */
export const doctype = function(){
	return '<!DOCTYPE html>'
}

/*
 * meta
 */
export const meta = singleTag('meta')

/*
 * input
 */
export const input = singleTag('input')

export const a = singleTag('a')

//***********************************************//
/*
 * title
 */
export const title = doubleTag('title')

/*
 * head
 */
export const head = doubleTag('head')

/*
 * form
 */
export const form = doubleTag('form')

export const label = doubleTag('label')

export const button = doubleTag('button')

/*
 * list
 */ 
export const li = doubleTag('li')
export const ul = doubleTag('ul')


export const div = doubleTag('div')

/*
 * body
 */
export const body = doubleTag('body')

/*
 * html
 */
export const html = doubleTag('html')