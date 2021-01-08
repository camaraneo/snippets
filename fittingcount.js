let fs = require('fs') // node.js file server module

// files

let areas = [
    ["Bays 1 & 2\n", "fittingcountB1_2.txt", "redCountB1_2.txt"],
    ["\n\nBays 3 & 4\n", "fittingcountB3_4.txt", "redCountB3_4.txt"],
    ["\n\nMain Factory\n", "fittingcountMainFactory.txt", "redCountMainFactory.txt"],
    ["\n\nTanks East\n", "fittingcountTanksEast.txt", "redCountTanksEast.txt"],
    ["\n\nTanks Central\n", "fittingcountTanksCentral.txt", "redCountTanksCentral.txt"],
    ["\n\nTanks West\n", "fittingcountTanksWest.txt", "redCountTanksWest.txt"]
]

/*
let areaObjects = {

    B1_2: {
    tees: "fittingcountB1_2.txt",
    reducers: "redCountB1_2.txt"
    },
    B3_4: {
    tees: "fittingcountB3_4.txt",
    reducers: "redCountB3_4.txt"
    },
    MainFactory: {
    tees: "fittingcountMainFactory.txt",
    reducers: "redCountMainFactory.txt"
    },
    TanksEast: {
    tees: "fittingcountTanksEast.txt",
    reducers: "redCountTanksEast.txt"
    },
    TanksCentral: {
    tees: "fittingcountTanksCentral.txt",
    reducers: "redCountTanksCentral.txt"
    },
    TanksWest: {
    tees: "fittingcountTanksWest.txt",
    reducers: "redCountTanksWest.txt"
    }
};
*/




/*
let tees = "fittingcountB1-2.txt"
let reducers = "redCountB1-2.txt"
*/

fs.writeFile('fittingsOutput.txt', "", error)

for(let i=0; i<areas.length; i++) {
    console.log(areas[i][1])
    //** INPUT
    // TEES

    let lookup = fs.readFileSync('fittingcountLookup.txt', {encoding: 'utf-8'}) .replace(/\t/g,"\n") .split("\n") .sort(function(a, b){return a-b})

    let data = fs.readFileSync(areas[i][1], {encoding: 'utf-8'}) .split("\n")

    // REDUCERS

    let redLookup = fs.readFileSync('redCountLookup.txt', {encoding: 'utf-8'}) .replace(/\t/g,"\n") .split("\n") .sort(function(a, b){return a-b})
    let redData = fs.readFileSync(areas[i][2], {encoding: 'utf-8'}) .split("\n")


    


    //** CALCULATION

    //TEES
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


    // REDUCERS
    let redResult = []

    redLookup.forEach ( (redType, i) => {
        let count = 0
        redData.forEach( (item) => {
            if(item == redType) {
                count++
            }
        })
        redResult[i] = [redType, count]
    })




    //** OUTPUT
    // TEES
    console.log("\n\n\n")
    console.log("Tee (thru x branch)")
    fs.appendFileSync('fittingsOutput.txt', areas[i][0], error)
    fs.appendFileSync('fittingsOutput.txt', "\nTee (thru x branch)\n", error)

    for (const line of result) {
        if(line[1]) {
            let outLine = line[0]+", " + line[1]
            console.log(outLine)
            outLine += "\n"
            fs.appendFileSync('fittingsOutput.txt', outLine, error)
        }
    }


    //validation
    data.forEach( (line, i) => {
        if(!lookup.includes(line)) console.log("ERROR at line:", i+1)
    })

    // REDUCERS
    console.log("\n")
    console.log("Reducers")
    fs.appendFileSync('fittingsOutput.txt', "\nReducers\n", error)
    
    for (const line of redResult) {
        let outLine = line[0]+", " + line[1]
        if(line[1]) {
            console.log(outLine)
            outLine += "\n"
            fs.appendFileSync('fittingsOutput.txt', outLine, error)
        }
    }
    

    //validation
    redData.forEach( (line, i) => {
        if(!redLookup.includes(line)) console.log("ERROR at line:", i+1)
    })

}

/*
let output = result[0][1];

function show() {
    //document.getElementById("output").innerHTML = output;
}
show()
*/

function error (err) {
    if (err) return console.log(err);
}