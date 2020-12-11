let fs = require('fs') // node.js file server module

let data = fs.readFileSync('day01.txt', {encoding: 'utf-8'}) .split("\n")

for(let i=0; i<data.length; i++) {

	for(let j=0; j<data.length; j++) {
		for(let k=0; k<data.length; k++) {
			if( parseInt(data[i]) + parseInt(data[j]) + parseInt(data[k]) == 2020) {
				console.log(data[i]*data[j]*data[k])
    	}
    	    }
    	      }
    	      }
/*
data.forEach( (element) => {

	for(
})
*/

//console.log()