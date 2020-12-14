let numberOfLights = document.currentScript.getAttribute('numberOfLights')
let maxNumLit = document.currentScript.getAttribute('maxNumLit')

let lights = []

for (let i=0; i<numberOfLights; i++) {
	lights[i] = new lightConstructor(i)
}

function lightConstructor(elID) {
	//this.value = "■";
	this.cycling = false;
    this.elID = "light" + elID;
    //this.colour = "hsl(0,100%,0%)";
    this.hue = 0;
    this.lightness = 0;
}
// must be objects so that they can be passed as parameters to a function and be updated by that function (primitive types are passed by value, but values in objects are passed by reference)



// interval sets the html elements every 50ms
let x = setInterval(function(){

	for(const light of lights) {
        
		document.getElementById(light.elID).style.color = "hsl(" + light.hue + ",100%," + light.lightness + "%)"
		//document.getElementById(light.elID).innerHTML = "■"
  }

},50)

/*
//function to set "#" to display
function showDash(qty) {
	let str = "■";
	for(i=0; i<qty; i++) {
        str += "■";
    }
    return str;
}
*/

// function to ramp the number up & down
function cycleLight(time, returnObj) {
	if(returnObj.cycling) return 0
    returnObj.cycling = true
    returnObj.hue = randomNum(0,360)
	let number = 0
	let maxNumber = randomNum(20, 60)
	let downflag = false
	
	let y = setInterval(function(){

	returnObj.lightness = number
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

// colour L
function colourL(maxNumber) {

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
		cycleLight(randomNum(5,20), lights[lightPick]);
  }
},10)

