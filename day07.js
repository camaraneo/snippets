let fs = require('fs') // node.js file server module

let ruleLines = fs.readFileSync('day07test.txt', {encoding: 'utf-8'}) .replace(/\./g, "") .split("\n")


let ruleMap = new Map()

ruleLines.forEach(rule => {
  let [bag, contents] = rule.split(" bags contain ")
  contents.split(", ").map(txt => {
    const { groups } = /(?<quantity>\d+)? (?<colour>.*)/.exec(txt.replace(/ bags?/, ""))


// make ruleMap with each bag key having value of an array of objects of the contained bag colours & quantities
    if (!ruleMap.has(bag)) {
      ruleMap.set(bag, [])
    }
    let containedBagObj = {colour: groups.colour, quantity: groups.quantity}
    ruleMap.set(bag, [...ruleMap.get(bag), containedBagObj])
  })
})

//console.log(ruleMap)


function bagContains(bagColour) {
    if(bagColour === "shiny gold") return true
    if(!ruleMap.has(bagColour)) return false

    let innerBags = ruleMap.get(bagColour)
    //console.log(innerBags)

    for (const {colour: bag} of innerBags) {
        if(bagContains(bag)) return true
    }

    //return false
}

let mapKeys = ruleMap.keys()
let count = 0

for (const key of mapKeys) {
    if(bagContains(key) && key != "shiny gold") count++    
}

console.log(count)


/*
let mapCopy = new Map()
ruleMap.forEach ( (value, key) => {
  mapCopy.set(key, value)
})
console.log(mapCopy)
*/