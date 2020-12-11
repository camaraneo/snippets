let fs = require('fs') // node.js file server module

let ruleLines = fs.readFileSync('day07test.txt', {encoding: 'utf-8'}) .replace(/\./g, "") .split("\n")


let ruleMap = new Map()
let ruleMapQty = new Map()

ruleLines.forEach(rule => {
  let [bag, contents] = rule.split(" bags contain ")
  contents.split(", ").map(txt => {
    const { groups } = /(?<quantity>\d+)? (?<colour>.*)/.exec(txt.replace(/ bags?/, ""))

// make ruleMap with each bag key having value of contained bag colour array
    if (!ruleMap.has(bag)) {
      ruleMap.set(bag, [])
    }
    ruleMap.set(bag, [...ruleMap.get(bag), groups.colour])

// make ruleMapQty with each bag key having value of an array of objects of the contained bag colours & quantities
    if (!ruleMapQty.has(bag)) {
      ruleMapQty.set(bag, [])
    }
    let containedBagObj = {colour: groups.colour, quantity: groups.quantity}
    ruleMapQty.set(bag, [...ruleMapQty.get(bag), containedBagObj])
  })
})

//console.log(ruleMapQty)


function bagContains(colour) {
    if(colour === "shiny gold") return true
    if(!ruleMap.has(colour)) return false

    let innerBags = ruleMap.get(colour)
    console.log(innerBags)

    for (const bag of innerBags) {
        if(bagContains(bag)) return true
    }

    //return false
}

let mapKeys = ruleMap.keys()
let count = 0
//console.log(mapKeys)

for (const key of mapKeys) {
    //console.log(key)
    if(bagContains(key)) count++    
}

console.log(count)


/*
let mapCopy = new Map()
ruleMap.forEach ( (value, key) => {
  mapCopy.set(key, value)
})
console.log(mapCopy)
*/