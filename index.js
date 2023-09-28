const gpio = require("onoff").Gpio;
let stepPins = [17, 27, 22, 23]; // GPIO pins where motor is attached

const angleSteps = 280; //number of full motor sequence rotation

const timeout = 2; // Minmum delay after each sequence for this particular step motor

let pins = [];
initPins();

rotate(angleSteps);

function rotate(angleSteps) {
    for (let i = 0; i <= angleSteps; i++) {
        // -- Sequence Loop ---
        let sequences = stepPins.length;
        for (let seqNumber = 1; seqNumber <= sequences; seqNumber++) {
            setTimeout(() => {
                // -- Pin Loop --
                for (let pin = 0; pin <= 3; pin++) {
                    (seqNumber == (pin + 1)) ? pins[pin].writeSync(1) : pins[pin].writeSync(0)
                }
                // -- Pin Loop --
            }, (i * sequences + seqNumber) * timeout)
        }
        // -- Sequence Loop ---
    }
}

function initPins() {
    for (var i = 0; i <= 3; i++) {
        pins[i] = new gpio(stepPins[i], 'out');
    }
    return pins
}
