let fs = require('fs') // node.js file server module

let entries = fs.readFileSync('day04.txt', {encoding: 'utf-8'}) .split("\n\n")

let passObjects = []

let count = entries.length

for (i = 0; i < entries.length; i++) {
  entries[i] = entries[i].replace(/ /g, '", "')
  entries[i] = entries[i].replace(/\n/g, '", "')
  entries[i] = entries[i].replace(/:/g, '":"')
  entries[i] = '{"' + entries[i] + '"}'

  passObjects[i] = JSON.parse(entries[i]);

}

// tests

for (i = 0; i < passObjects.length; i++) {
//fields
  let tests = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"]
  breakPoint1:
  for (j = 0; j < tests.length; j++) {

    if (!(passObjects[i].hasOwnProperty(tests[j]))) {
      delete passObjects[i]
      break breakPoint1;
    }
  }
// end fields

// year checks eyr 2020-2030 iyr 2010-2020 byr 1920-2002
  if (passObjects[i] !== undefined) {
    let eyr = passObjects[i].eyr
    let iyr = passObjects[i].iyr
    let byr = passObjects[i].byr
    if (yearTest(eyr, 2020, 2030) == false || yearTest(iyr, 2010, 2020) == false || yearTest(byr, 1920, 2002) == false) {
      delete passObjects[i]
    }
  }
// end year checks

// height
  if (passObjects[i] !== undefined) {
    let height = passObjects[i].hgt

    let hgtUnits = height.substring(height.length - 2)
    let hgtValue = height.substring(0, height.length - 2)

    if ((hgtUnits != "cm" && hgtUnits != "in") || (!hgtValue.match(/^[0-9]+$/)) || (hgtUnits == "cm" && (parseInt(hgtValue) < 150 || parseInt(hgtValue) > 193)) || (hgtUnits == "in" && (parseInt(hgtValue) < 59 || parseInt(hgtValue) > 76))) {
      delete passObjects[i]

    }
  }
// end height

  // hair colour format: #123abc (0-9, a-f)
  if (passObjects[i] !== undefined) {
     let hcl = passObjects[i].hcl
    if (!hcl.match(/^#[0-9a-fA-F]{6}$/) ) {
       delete passObjects[i]
     }
  }
// end hair colour

// eye colour
  if(passObjects[i] !== undefined) {
    //let amb = new RegExp()
    let colours = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
    let ecl = passObjects[i].ecl
    if(colours.indexOf(ecl) === -1) { // search 'colours' for 'ecl', "-1" if no match
      delete passObjects[i]
    }
  }

// end eye colour

// passport ID
	if(passObjects[i] !== undefined) {
		let pid = passObjects[i].pid
		if(!pid.match(/^[0-9]{9}$/)) {
			console.log[i]
			delete passObjects[i]
		}
	}

// end passport ID


}

filterObjects()






function yearTest(year, min, max) {
  if (!year.match(/^\d{4}$/)) return false;
  year = parseInt(year)
  if (year < min || year > max) return false;
  return true;
}


// filter out all deleted indices
function filterObjects() {
  passObjects = passObjects.filter(function (item) {
    return item !== 0
  })
  console.log(passObjects.length)
}

console.log("Final Tally:", passObjects.length)