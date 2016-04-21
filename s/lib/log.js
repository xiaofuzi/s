/*
* debug
*/
const Config = {
	debug: true
}

export default {
	error(){
		if(Config.debug){
			console.error.apply(console, arguments)
		}
	},
	info(){
		if(Config.debug){
			console.log.apply(console, arguments)
		}
	},
	warn(){
		if(Config.debug){
			console.warn.apply(console, arguments)
		}
	}
}