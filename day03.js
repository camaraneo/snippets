let fs = require('fs') // node.js file server module

let lines = fs.readFileSync('day03.txt', {encoding: 'utf-8'}) .split("\n")

let lineLength = lines[0].length

function countPath(xDelta, yDelta, xTrack) {

	let count = 0
	for(let i=0; i<lines.length; i += yDelta) {
		if( lines[i].charAt(xTrack%lineLength) == "#" ) count++;
				xTrack += xDelta
					}
	return count;
}

let xList = [1, 3, 5, 7, 1]
let yList = [1, 1, 1, 1, 2]
let hits = []

for(let j=0; j<xList.length; j++) {
	hits[j] = countPath(xList[j], yList[j], 0)
	}
console.log(hits)

let product = 1

for(i=0; i<hits.length; i++) {
	product *= hits[i]
	}
console.log(product)