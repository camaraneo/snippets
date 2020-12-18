let fs = require('fs') // node.js file server module

let lookup = fs.readFileSync('fittingcountLookup.txt', {encoding: 'utf-8'}) .replace(/\t/g,"\n") .split("\n") .sort(function(a, b){return a-b})

let data = fs.readFileSync('fittingcountTanksWest.txt', {encoding: 'utf-8'}) .split("\n")


let result = []

lookup.forEach ( (fittType, i) => {
    let count = 0
    data.forEach( (item) => {
        if(item == fittType) {
            count++
        }
    })
    result[i] = [fittType, count]
})

console.log("\n\n\n")
console.log("Tee (thru x branch)")

for (const line of result) {
    if(line[1]) console.log(line[0]+", " + line[1])
}

//validation
data.forEach( (line, i) => {
    if(!lookup.includes(line)) console.log("ERROR at line:", i)
})

/*
let output = result[0][1];

function show() {
    //document.getElementById("output").innerHTML = output;
}
show()
*/
