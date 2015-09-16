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
var animationrate = 60; // Änderungen pro minute

//funktion: entsprechende Animationsobjekte initialisieren und auf die stage bringen
function initialize() {
    // Zeichnet die aktuelle permutation mit dem aktuellen Objekt
    for (var i = 1; i < 50; i++) {
        document.getElementById("pix" + i).src = "inhalte/anim/group1/" + currentObject + ".png";

        //var a = new Animat();
        //a.x = (spalte * scale) + animationPositioX;	// Anpassung der Position abhängig von FrameCount
        //a.width = scale + 1;						// Anpassung der Breite um 5, 6, 7, 8 Frames immer mit 
        //// gleicher Breite anzuzeigen (Animationsbereich)
        //a.y = (zeile * scale) + animationPositioY; 	// Anpassung der Position abhängig von FrameCount
        //a.height = scale + 1;						// Anpassung der Höhe um 5, 6, 7, 8 Frames immer mit 
        //// gleicher Höhe anzuzeigen (Animationsbereich)
        //addChild(a);
        //a.gotoAndPlay(currentPerm[zeile][spalte]);
        //currZeilenArray[spalte] = a;
        //currentAnimation[zeile] = currZeilenArray;
    }
}

// funktion: pausieren/stoppen der currentAnimation
function pauseAnimation() {
    console.log("pauseAnimation");
    for (var zeile = 0; zeile < frameCount; zeile++) {
        for (var spalte = 0; spalte < frameCount; spalte++) {
            //currentAnimation[zeile][spalte].stop();
        }
    }
    running = false;
}

var w;

// funktion: (wieder-)abspielen der currentAnimation;
function playAnimation() {
    console.log("playAnimation");
    //for (var zeile = 0; zeile < frameCount; zeile++) {
    //    for (var spalte = 0; spalte < frameCount; spalte++) {
    //        //currentAnimation[zeile][spalte].play();
    //    }
    //}
    if (typeof (Worker) !== "undefined") {
        if (typeof (w) == "undefined") {
            w = new Worker("webworker.js");
        }
        w.onmessage = function (event) {
            console.log(event.data);
            document.getElementById("pix" + i).src = "inhalte/anim/group1/" + event.data + ".png";
            // FUNKTIONIERT NUR, WENN SEITE GEHOSTET WIRD!...
        };
    } else {
        //document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
    }
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

    initialize();
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

    initialize();
}
