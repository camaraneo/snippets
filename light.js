let numberOfLights = 10
let maxNumLit = 5

let lights = []

for (let i=0; i<numberOfLights; i++) {
	lights[i] = new lightConstructor(i)
}

function lightConstructor(elID) {
	this.value = "-";
	this.cycling = false;
	this.elID = "light" + elID
}
// must be objects so that they can be passed as parameters to a function and be updated by that function (primitive types are passed by value, but values in objects are passed by reference)



// interval sets the html elements every 50ms
let x = setInterval(function(){

	for(const light of lights) {
		document. getElementById(light.elID). innerHTML = showDash(light.value)
  }

},50)

//function to set "#" to display
function showDash(qty) {
	let str = "0";
	for(i=0; i<qty; i++) {
		str += "#";
  }
return str;
}


// function to ramp the number up & down
function cycleLight(time, returnObj) {
	if(returnObj.cycling) return 0
	returnObj.cycling = true
	let number = 0
	let maxNumber = randomNum(5, 30)
	let downflag = false
	
	let y = setInterval(function(){

	returnObj.value = number
		if(!downflag) {
			number++
			if(number>=maxNumber) downflag = true
    }
		else {
			number--
    }
		if(downflag && number < 0) {
			returnObj.cycling = false;
			clearInterval(y);
    }
	},time)
}

// generate a random number between two values (inclusive)
function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// func to count the number of active lights
function countNumLit() {
	let count = 0;
	for(const light of lights) {
		if(light.cycling) count++;
  }
	return count;
}


// randomly pick lights to cycle
let z = setInterval(function() {
	let lightPick = randomNum(0,numberOfLights-1);
	if(randomNum(Math.floor(maxNumLit/2), maxNumLit) > countNumLit() ) {
		cycleLight(randomNum(20,60), lights[lightPick]);
  }
},50)
