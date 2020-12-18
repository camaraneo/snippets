let fs = require('fs') // node.js file server module

let lookup = fs.readFileSync('fittingcountLookup.txt', {encoding: 'utf-8'}) .replace(/\t/g,"\n") .split("\n") .sort(function(a, b){return a-b})

let data = fs.readFileSync('fittingcountB1-2.txt', {encoding: 'utf-8'}) .split("\n")

//validation
data.forEach( (line, i) => {
    if(!lookup.includes(line)) console.log("ERROR at line:", i)
}

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


for (const line of result) {
    console.log(line[0]+", " + line[1])
}


/*
let output = result[0][1];

function show() {
    //document.getElementById("output").innerHTML = output;
}
show()
*/
