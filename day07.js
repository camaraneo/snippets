let fs = require('fs') // node.js file server module

let ruleLines = fs.readFileSync('day07test.txt', {encoding: 'utf-8'}) .replace(/\./g, "") .split("\n")


let ruleMap = new Map()
let ruleMapQty = new Map()

ruleLines.forEach( rule => {
  let [bag, contents] = rule.split(" bags contain ")
  contents.split(", ").map( txt => {
    const {groups} = /((?<quantity>\d+))? (?<colour>.*)/.exec(txt.replace(/ bags?/, ""))

    if(!ruleMap.has(bag)) {
      ruleMap.set(bag, [])
    }
    ruleMap.set(bag, [...ruleMap.get(bag) , groups.colour])

    if(!ruleMapQty.has(bag)) {
      ruleMapQty.set(bag, [])
    }
    ruleMapQty.set(bag, [...ruleMapQty.get(bag) , {colour: groups.colour, quantity: groups.quantity}])
  })
})

console.log(ruleMap, ruleMapQty)