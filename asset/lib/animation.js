// JavaScript document
/* 
    Grundlagen der Gestaltung Framework
    Univerität Ulm
    Institut für Medienforschung und -entwicklung
    Tobias Lahmann
*/

var permutationen = {
    "diagonalSplit": [
        [7, 6, 5, 4, 3, 2, 1],
        [7, 7, 6, 5, 4, 3, 2],
        [6, 7, 7, 6, 5, 4, 3],
        [5, 6, 7, 7, 6, 5, 4],
        [4, 5, 6, 7, 7, 6, 5],
        [3, 4, 5, 6, 7, 7, 6],
        [2, 3, 4, 5, 6, 7, 7],
        [1, 2, 3, 4, 5, 6, 7]
    ],
    "schachbrett": [
        [4, 1],
        [1, 4]
    ], 
    "gegenläufig": [
        [6, 5, 4, 3, 2, 1],
        [1, 2, 3, 4, 5, 6]
    ], 
    "fallen": [
        [7],
        [6],
        [5],
        [4],
        [3],
        [2],
        [1]
    ], 
    "block": [
        [1]
    ]
}

// var folder = 'inhalte/animation/';
// Alle Nutzerdaten, die angegeben werden müssen um die Animation zum Laufen zu bringen.
var objekte = {
    "dreieck": [
        [
            "inhalte/animation/group1_v1/1.png", 
            "inhalte/animation/group1_v1/2.png", 
            "inhalte/animation/group1_v1/3.png", 
            "inhalte/animation/group1_v1/4.png", 
            "inhalte/animation/group1_v1/5.png", 
            "inhalte/animation/group1_v1/6.png", 
            "inhalte/animation/group1_v1/7.png"
        ],
        [
            "inhalte/animation/group1_v2/1.png", 
            "inhalte/animation/group1_v2/2.png", 
            "inhalte/animation/group1_v2/3.png", 
            "inhalte/animation/group1_v2/4.png", 
            "inhalte/animation/group1_v2/5.png", 
            "inhalte/animation/group1_v2/6.png", 
            "inhalte/animation/group1_v2/7.png"
        ]
    ],
    "balken": [
        [
            "inhalte/animation/group2/1.png", 
            "inhalte/animation/group2/2.png", 
            "inhalte/animation/group2/3.png", 
            "inhalte/animation/group2/4.png", 
            "inhalte/animation/group2/5.png", 
            "inhalte/animation/group2/6.png", 
            "inhalte/animation/group2/7.png"
        ]
    ],
    "punkt": [
        [
            "inhalte/animation/group3_v1/1.png", 
            "inhalte/animation/group3_v1/2.png", 
            "inhalte/animation/group3_v1/3.png", 
            "inhalte/animation/group3_v1/4.png", 
            "inhalte/animation/group3_v1/5.png", 
            "inhalte/animation/group3_v1/6.png", 
            "inhalte/animation/group3_v1/7.png",
            "inhalte/animation/group3_v1/8.png"
        ],
        [
            "inhalte/animation/group3_v2/1.png", 
            "inhalte/animation/group3_v2/2.png", 
            "inhalte/animation/group3_v2/3.png", 
            "inhalte/animation/group3_v2/4.png", 
            "inhalte/animation/group3_v2/5.png", 
            "inhalte/animation/group3_v2/6.png", 
            "inhalte/animation/group3_v2/7.png",
            "inhalte/animation/group3_v2/8.png"
        ]
    ]
}

var currentPerm = 0; // Speichert die aktuelle Permutation
var currentObject = 0; // Speichert das akutelle Objekt

var running = Boolean(true); // spielt ab
var typeSwitch = 0; // Umschaltung zwischen typen
var animationrate = 100; // ms

var ANIMATIONPOSITIONX = 200; // x Koordinate des Animationsbereichs
var ANIMATIONPOSITIONY = 50; // y Koordinate des Animationsbereichs
var ANIMATIONSIZE = 350; // Größe (Höhe, Breite) des Animationsbereichs, immer quadratisch


var context = document.getElementById('canvas').getContext('2d');

var obj, matriceHeight, matriceWidth, scale;


var animat = {}; // Array, welches die Bilder beihaltet
//funktion: entsprechende Animationsobjekte initialisieren
function initialize() {
    

    $.each(objekte, function(k,v) {
        animat[k] = [];
        for (i = 0; i < v.numberOfObjects; i++) {
            var img = new Image();
            img.src = folder
                    + objekte[currentObject].elements[typeSwitch].name
                    + "/" + (i + 1) + ".png";
            animat[k].push(img);
        }
    });

    // Skaliert die einzelnen currAnim um bei unterschiedlicher Frame-Anzahl immer die gleiche Größe des Animationsbereichs beizubehalten
    scale = ANIMATIONSIZE / objekte[currentObject].numberOfObjects;

    // berechne die aktuellen Array-Größen
    obj = objekte[currentObject].numberOfObjects;
    matriceHeight = permutationen[currentPerm].length;
    matriceWidth = permutationen[currentPerm][0].length;

    draw();
}

// timer hilfsvariablen
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

            // erhöhe alle stellen um 1
            for (i = 0; i < matriceHeight; i++) {
                for (j = 0; j < matriceWidth; j++) {
                    permutationen[currentPerm][i][j] += 1;
                }
            }

            // zeichne an die berechneten Positionen die benötigten bilder
            for (i = 0; i < obj; i++) {
                for (j = 0; j < obj; j++) {
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
function changeSpeed() {
    if (fps < 35) {
        fps += 7;
    } else {
        fps = 7;
    }
    interval = 1000 / fps;
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

// funktion: permutation weiter schalten
function changePermutation() {
    currentPerm += 1;
    currentPerm %= permutationen.length;
    initialize();
}

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

// funktion: objekt weiter schalten
function changeObject() {
    currentObject += 1;
    currentObject %= objekte.length;
    initialize();
}

// funktion: objekt weiter schalten
function changeObjectFwrd() {
    currentObject += 1;
    currentObject %= objekte.length;
    typeSwitch = 0;
    initialize();
}

// funktion: objekt zurück schalten
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

// funktion: objekttyp ändern
function changeTypeOfObj() {
    typeSwitch += 1;
    typeSwitch %= objekte[currentObject].elements.length;
    initialize();
}
