//a.js
let mod = require('./b.js')
console.log('a.js-1', mod.count)
mod.plusCount()
console.log('a.js-2', mod.count)
setTimeout(() => {
	mod.count = 3
	console.log('a.js-3', mod.count)
}, 2000)
let mod1 = require('./b.js')
console.log('a.js-1', mod1.count)
mod1.plusCount()
console.log('a.js-2', mod1.count)
setTimeout(() => {
	mod1.count = 3
	console.log('a.js-3', mod1.count)
}, 2000)