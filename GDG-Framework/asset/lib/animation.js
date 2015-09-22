/*------------------------------------------------------------------
[JavaScript File]

Project:		Grundlagen der Gestaltung 1 
-------------------------------------------------------------------*/

// Permutationen
var permutationen =
[
    [ // Permutation 1
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1]
    ],
    [ // Permutation 2
        [7, 7, 7, 7, 7, 7, 7],
        [6, 6, 6, 6, 6, 6, 6],
        [5, 5, 5, 5, 5, 5, 5],
        [4, 4, 4, 4, 4, 4, 4],
        [3, 3, 3, 3, 3, 3, 3],
        [2, 2, 2, 2, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1]
    ]//, ...
    // hier weitetere Permutationen einfuegen
];

var currentPerm = 1; // Speichert die aktuelle Permutation
var currentObject = 1; // Speichert das akutelle Objekt

var running = Boolean(true);// spielt ab
var animationrate = 100; // ms

var animationPositioX = 200;// x Koordinate des Animationsbereichs
var animationPositioY = 50;// y Koordinate des Animationsbereichs

var animat = [];

//funktion: entsprechende Animationsobjekte initialisieren
function initialize() {
    for (i = 0; i < 7; i++) {
        var img = new Image();
        img.src = "inhalte/anim/group1/" + (i + 1) + ".png";
        animat[i] = img;
    }
    //window.requestAnimationFrame(draw);
}



var context = document.getElementById('canvas').getContext('2d');

initialize();
setInterval(draw, animationrate);

function draw() {
    if (running) {
        // clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (i = 0; i < 7; i++) {
            for (j = 0; j < 7; j++) {
                var foo = ((permutationen[currentPerm][i][j] += 1) % 7);
                context.drawImage(animat[foo],
                                (i * animat[foo].width) + animationPositioX,
                                (j * animat[foo].height) + animationPositioY,
                                animat[foo].width,
                                animat[foo].height);
            }
            //console.log(foo);
        }
    }
};

// funktion: pausieren/stoppen der currentAnimation
function pauseAnimation() {
    console.log("pauseAnimation");
    running = false;
}

// funktion: (wieder-)abspielen der currentAnimation;
function playAnimation() {
    console.log("playAnimation");
    running = true;
}

// funktion: geschwindigkeit erhoehen;
function faster() {
    console.log("faster");
    // Framerate limitiert auf 40 fps maximal
    if (stage.frameRate < 40) {
        this.stage.frameRate += 2;
    }
}

// funktion: geschwindigkeit verringern
function slower() {
    console.log("slower");
    // Framerate limitiert auf 5 fps minimal
    if (stage.frameRate >= 5) {
        this.stage.frameRate -= 2;
    }
}

function changePermutation() {
    console.log("changePermutation");
    switch (currentPermutationNumber) {
        case 1:
            currentPerm = 2;
            break;
        case 2:
            currentPerm = 3;
            break;
        case 3:
            currentPerm = 4;
            break;
        case 4:
            currentPerm = 5;
            break;
        case 5:
            currentPerm = 6;
            break;
        case 6:
            currentPerm = 7;
            break;
        default:
            currentPerm = 1;
    }

    //initialize();
}

function changeObject() {
    console.log("changeObject");
    switch (currentObject) {
        case 1:
            currentObject = 2;
            break;
        case 2:
            currentObject = 3;
            break;
        case 3:
            currentObject = 4;
            break;
        case 4:
            currentObject = 5;
            break;
        default:
            currentObject = 1;
    }

    //initialize();
}



