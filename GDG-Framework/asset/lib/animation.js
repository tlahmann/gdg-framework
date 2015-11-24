// JavaScript document
/* 
    Grundlagen der Gestaltung Framework
    Univerität Ulm
    Institut für Medienforschung und -entwicklung
*/

/*
 * Die Permutationen werden automatisch erweitert
 */

// Permutationen
var permutationen =
[[
    [5, 4],
    [4, 5]
], [
    [5, 4, 3, 2, 1, 0],
    [1, 2, 3, 4, 5, 6]
], [
    [7],
    [6],
    [5],
    [4],
    [3],
    [2],
    [1]
], [
    [1]
], [
[8, 7, 6, 5, 4, 3, 2, 1],
[7, 8, 7, 6, 5, 4, 3, 2],
[6, 7, 8, 7, 6, 5, 4, 3],
[5, 6, 7, 8, 7, 6, 5, 4],
[4, 5, 6, 7, 8, 7, 6, 5],
[3, 4, 5, 6, 7, 8, 7, 6],
[2, 3, 4, 5, 6, 7, 8, 7],
[1, 2, 3, 4, 5, 6, 7, 8]
]];

var objekte =
[{
    "numberOfObjects": "6",
    "desiredSize": "6",
    "elements": [
        { "name": "group1" },
        { "name": "group1_2" },
        { "name": "5" }
    ]
},
{
    "numberOfObjects": "7",
    "desiredSize": "5",
    "elements": [
        { "name": "group2" },
        { "name": "Neuer Ordner" }
    ]
},
{
    "numberOfObjects": "3",
    "desiredSize": "10",
    "elements": [
        { "name": "2" },
        { "name": "group3" }
    ]
}];

var currentPerm = 0; // Speichert die aktuelle Permutation
var currentObject = 0; // Speichert das akutelle Objekt

var running = Boolean(true); // spielt ab
var typeSwitch = 0; // Umschaltung zwischen typen
var animationrate = 100; // ms

var ANIMATIONPOSITIONX = 200; // x Koordinate des Animationsbereichs
var ANIMATIONPOSITIONY = 50; // y Koordinate des Animationsbereichs
var ANIMATIONSIZE = 350; // Größe (Höhe, Breite) des Animationsbereichs, immer quadratisch

var animat = [];

var context = document.getElementById('canvas').getContext('2d');

//funktion: entsprechende Animationsobjekte initialisieren
function initialize() {
    // Bei der Umschaltung von Objekten oder der umschaltung von permutationen wird die initialize()-Methode aufgerufen. In diesem Fall wird der running-Boolean ebenfalls umgeschaltet um die Funktion des Play/Pause-Buttons wieder zu berichtigen.
    if (!running) {
        running = !running;
    }

    animat = [];
    for (i = 0; i < objekte[currentObject].numberOfObjects; i++) {
        var img = new Image();
        img.src = "inhalte/anim/"
            + objekte[currentObject].elements[typeSwitch].name
            + "/" + (i + 1) + ".png";
        animat[i] = img;
    }
    draw();
}

// initialisierung
initialize();

var fps = 12;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

//funktion: entsprechende Animationsobjekte initialisieren und auf die stage bringen
function draw() {
    if (running) {
        requestAnimationFrame(draw);

        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);

            // clear canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Skaliert die einzelnen currAnim um bei unterschiedlicher Frame-Anzahl immer die gleiche Größe des Animationsbereichs beizubehalten
            var scale = ANIMATIONSIZE / objekte[currentObject].desiredSize;

            var obj = objekte[currentObject].numberOfObjects;
            var des = objekte[currentObject].desiredSize;
            var matriceHeight = permutationen[currentPerm].length;
            var matriceWidth = permutationen[currentPerm][0].length;

            for (i = 0; i < matriceHeight; i++) {
                for (j = 0; j < matriceWidth; j++) {
                    permutationen[currentPerm][i][j] += 1;
                }
            }

            for (i = 0; i < des; i++) {
                for (j = 0; j < des; j++) {
                    var d = null;
                    d = permutationen[currentPerm][j % matriceHeight][i % matriceWidth] % obj;
                    context.drawImage(animat[d],
                                            (i * scale) + ANIMATIONPOSITIONX,
                                            (j * scale) + ANIMATIONPOSITIONY,
                                            scale,
                                            scale);
                }
            }
        }
    }
}

// funktion: fallauswahl: wenn der Player nicht abspielt wird die Animation gestartet, ansonsten pausiert;
function playPauseAnimation() {
    if (!running) {
        playAnimation();
    } else {
        pauseAnimation();
    }
}

// funktion: pausieren/stoppen der currentAnimation
function pauseAnimation() {
    running = false;
    draw();
}

// funktion: (wieder-)abspielen der currentAnimation;
function playAnimation() {
    running = true;
    draw();
}

// funktion: geschwindigkeit erhoehen;
function faster() {
    if (fps < 30) {
        fps += 2;
        interval = 1000 / fps;
    }
}

// funktion: geschwindigkeit verringern
function slower() {
    if (fps >= 3) {
        fps -= 2;
        interval = 1000 / fps;
    }
}

//function changePermutation() {
//    currentPerm += 1;
//    currentPerm %= permutationen.length;
//    initialize();
//}

// funktion: permutationen weiter schalten
function changePermutationFwrd() {
    currentPerm += 1;
    currentPerm %= permutationen.length;
    initialize();
}

// funktion: permutationen zurück schalten
function changePermutationBack() {
    currentPerm -= 1;
    if (currentPerm < 0) {
        currentPerm = permutationen.length - 1;
    } else {
        currentPerm %= permutationen.length;
    }
    initialize();
}

//function changeObject() {
//    currentObject += 1;
//    currentObject %= objekte.length;
//    initialize();
//}

// objekt ++
function changeObjectFwrd() {
    currentObject += 1;
    currentObject %= objekte.length;
    typeSwitch = 0;
    initialize();
}

// objekt --
function changeObjectBack() {
    currentObject -= 1;
    if (currentObject < 0) {
        currentObject = objekte.length - 1;
    } else {
        currentObject %= objekte.length;
    }
    typeSwitch = 0;
    initialize();
}

function changeTypeOfObj() {
    typeSwitch += 1;
    typeSwitch %= objekte[currentObject].elements.length;
    initialize();
}

function countFolders() {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Scripting.FileSystemObject");
    }
    var myFolder = xmlhttp.GetFolder("./inhalte/anim/");
    var myFolderCollection = myFolder.SubFolders;
};
