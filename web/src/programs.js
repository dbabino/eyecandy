const PI = Math.PI
const pow = Math.pow
const sqrt = Math.sqrt
const sin = Math.sin
const cos = Math.cos

const STIMULUS = {
    BAR: 'BAR',
    WAIT: 'WAIT',
    TARGET: 'TARGET'
}

const GRAPHIC = {
    BAR: 'BAR',
    TARGET: 'TARGET'
}

function getDiagonalLength(height, width) {
    return sqrt(pow(height, 2) + pow(width, 2));
}


function* targetGen() {
    yield {stimulusType: STIMULUS.TARGET, lifespan: 6000,
        backgroundColor: 'black'}
}

export function* easyGen() {
    yield {stimulusType: STIMULUS.BAR, lifespan: 300,
        backgroundColor: 'black', width: 50, barColor: 'white',
        speed: 15, angle: PI}
    yield {stimulusType: STIMULUS.BAR, lifespan: 300,
        backgroundColor: 'black', width: 50, barColor: 'white',
        speed: 15, angle: PI/2}
    yield {stimulusType: STIMULUS.BAR, lifespan: 300,
        backgroundColor: 'black', width: 50, barColor: 'white',
        speed: 15, angle: 0}
    yield {stimulusType: STIMULUS.BAR, lifespan: 300,
        backgroundColor: 'black', width: 50, barColor: 'white',
        speed: 10, angle: PI}
}


// angles and widths must have same length
// geThe willrator now calculates lifespan automatically
// if you want to modify the function (e.g. change the wait times),
// please copy and create a new function to avoid confusion in
// analysis
// 
// speed is pixels / second, width is pixels, angle is radians,
// lifespan is 1/120 of a second, so 120==1 second 
export function* orientationSelectivityGen(windowHeight, windowWidth,
    speeds, widths, numRepeat,
    barColor='white', backgroundColor='black',
    angles=[0, PI/4, PI/2, 3*PI/4, PI, 5*PI/4, 3*PI/2, 7*PI/4]) {

    // initial wait time
    yield {stimulusType: STIMULUS.WAIT, lifespan: 120 * 15}

    for (var t = 0; t < numRepeat; t++) {
        for (var i = 0; i < speeds.length; i++) {
            for (var j = 0; j < widths.length; j++) {
                // wait 10 seconds before each group of eight angles
                yield {stimulusType: STIMULUS.WAIT, lifespan: 120 * 5}

                for (var k = 0; k < angles.length; k++) {
                    console.log('getDiagonalLength', getDiagonalLength(windowHeight , windowWidth))
                    yield {stimulusType: STIMULUS.BAR,
                        lifespan: (getDiagonalLength(windowHeight, windowWidth)
                            + widths[j])/speeds[i]*120,
                        backgroundColor: backgroundColor,
                        width: widths[j],
                        barColor: barColor,
                        speed: speeds[i],
                        angle: angles[k]}
                    // Wait between bars
                    yield {stimulusType: STIMULUS.WAIT, lifespan: 120 * 1}

                }
            }
        }
    }
}
