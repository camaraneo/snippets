let fs = require('fs') // node.js file server module

let groups = fs.readFileSync('day06.txt', {encoding: 'utf-8'}) .split("\n\n")

const questions = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

let total = 0

// first method with total +=

// count each
groups.forEach( (group) => {
  total += testGroup(group, questions)
})

console.log("6-1 Method one:", total)


// test a group for unique questions
function testGroup(group, testArray) {
  let count = 0
  testArray.forEach( (question) => {
    if(group.includes(question)) {
      count++
    }
  })
  //console.log(count)
  return count;
}



//second method with .reduce()

let groupTotals = []

groups.forEach( (group, i) => {
  groupTotals[i] = testGroup(group, questions)
})

function sumArray(total, i) {
  return total + i
}

console.log("6-1 Method two:", groupTotals.reduce(sumArray))


// 6-2

let groupTotals2 = []

groups.forEach( (group, i) => {
  let people = group.split("\n")
  let test = questions.slice(0)
  people.forEach( (person, j) => {
    test.forEach( (question, k) => {
      if(!person.includes(question)) {
        delete test[k]
      }
    })
  })
  test = test.filter( (item) => {
    return item !== 0
  })
  groupTotals2[i] = test.length
})


console.log("6-2:", groupTotals2.reduce(sumArray))