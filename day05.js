let fs = require('fs') // node.js file server module

let input = fs.readFileSync('day05.txt', {encoding: 'utf-8'}) .replace(/B|R/g, 1) .replace(/F|L/g, 0) .split("\n")

let row = []
let seat = []
let seatID = []

input.forEach((line, i) => {
  row[i] = parseInt(line.substring(0, 7), 2)
  seat[i] = parseInt(line.substring(7), 2)
  //seatID[i] = row[i] * 8 + seat[i]
  seatID[i] = parseInt(line, 2)
})

let highSeat = Math.max.apply(null, seatID)

console.log("Highest seat #:", highSeat)

let sortedSeats = seatID.sort()

//console.log(sortedSeats)

sortedSeats.forEach( (seat, i) => {
  if(seat + 1 != sortedSeats[i+1] && seat + 1 <= highSeat) {
    console.log("My seat #:", seat + 1)
    }
})