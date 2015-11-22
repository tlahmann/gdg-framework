/*------------------------------------------------------------------
[Action Script 3 File]

Project:		Grundlagen der Gestaltung 1 
				- Wintersemester 2014/2015, Uni Ulm
Version:		1.5
Last change:	23/02/'15 [Fixed frameRate at startup]
Assigned to:	Tobias Lahmann
Primary use:	A15 - currAnim
-------------------------------------------------------------------*/

/*
Um eine weitere Animation hinzuzufügen, muss diese nur einem speziellen 
Namensschema entsprechen. Das Ändern des Programms selbst ist nicht nötig. 
Folgendes Namensschema ist einzuhalten: AnimationX mit (X = 1, .... , n)
Die Benennung muss bei 1 Starten und fortlaufend sein, da sonst nur die 
ersten x fortlaufend nummerierten currAnim gefunden werden.
*/

/*
Modulorechnung fuer hin und rueckschalten funktioniert nur maessig. Daher 2 
Case unterscheidungen(SwitchObject / SwitchPermutation) um die benötigte 
Durchschaltung zu erreichen.

WICHTIG! Sollten später noch mehr Permutationen und noch mehr Animationen 
hinzukommen oder entfernt werden müssen die Werte angepasst werden!
*/

// ======== !!!!! ALLE PERMUTATIONEN MUESSEN DIMENSION 8 X 8 HABEN !!!!! ========
// Tipp: Es sollte auf Kombinationen von 8 und 1 in der ersten Spalte und 
// ersten Zeile verzichtet werden. (Kollidiert mit 7 Frames!)
// Tipp: Es sollte auf Kombinationen von 8 und 1, 7 und 2 in der ersten Spalte und 
// ersten Zeile verzichtet werden. (Kollidiert mit 6 Frames!)
// Tipp: Es sollte auf Kombinationen von 8 und 1, 7 und 2 und 6 und 3 in der 
// ersten Spalte und ersten Zeile verzichtet werden. (Kollidiert mit 5 Frames!)

// Permutationen
var permutationen =
[{
    "type": "cycle",
    "perm": [
        [5, 1],
        [1, 5]
    ]
},
{
    "type": "blank",
    "perm": [
        [7],
        [6],
        [5],
        [4],
        [3],
        [2],
        [1]
    ]
},
{
    "type": "next",
    "perm": [
        [1]
    ]
}];

var objekte =
[{
    "numberOfObjects": "7",
    "desiredSize": "2",
    "elements": [
        { "name": "group1" },
        { "name": "group1_2" },
        { "name": "5" }
    ]
},
{
    "numberOfObjects": "7",
    "desiredSize": "2",
    "elements": [
        { "name": "group2" }
    ]
},
{
    "numberOfObjects": "3",
    "desiredSize": "6",
    "elements": [
        { "name": "2" },
        { "name": "group3" }
    ]
}];

var currentPerm = 0; // Speichert die aktuelle Permutation
var currentObject = 0; // Speichert das akutelle Objekt

var running = Boolean(true); // spielt ab
var typeSwitch = Boolean(false); // Reinzeichnung <=> Skizze
var animationrate = 100; // ms

var ANIMATIONPOSITIONX = 200; // x Koordinate des Animationsbereichs
var ANIMATIONPOSITIONY = 50; // y Koordinate des Animationsbereichs
var ANIMATIONSIZE = 350; // Größe (Höhe, Breite) des Animationsbereichs

var animat = [];

var context = document.getElementById('canvas').getContext('2d');

//funktion: entsprechende Animationsobjekte initialisieren
function initialize() {
    // Bei der Umschaltung von Objekten oder der umschaltung von permutationen wird die initialize()-Methode aufgerufen. In diesem Fall wird der running-Boolean ebenfalls umgeschaltet um die Funktion des Play/Pause-Buttons wieder zu berichtigen.
    //if (!running) {
    //    running = !running;
    //}

    animat = [];
    for (i = 0; i < objekte[currentObject].numberOfObjects; i++) {
        var img = new Image();
        img.src = "inhalte/anim/"
            + objekte[currentObject].elements[typeSwitch ? 1 : 0].name
            + "/" + (i + 1) + ".png";
        animat[i] = img;
    }
    console.log(animat);
    draw();
}

// initialisierung
initialize();

var fps = 2;
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

            var boobs = objekte[currentObject].numberOfObjects;
            var cock = objekte[currentObject].desiredSize;
            var matriceHeight = permutationen[currentPerm].perm.length;
            var matriceWidth = permutationen[currentPerm].perm[0].length;


            for (i = 0; i < cock; i++) {
                for (j = 0; j < cock; j++) {
                    var d = null;
                    switch (permutationen[currentPerm].type) {
                        case "cycle":
                            permutationen[currentPerm].perm[i % matriceHeight][j % matriceWidth] += 1;
                            permutationen[currentPerm].perm[i % matriceHeight][j % matriceWidth] %= boobs;
                            d = permutationen[currentPerm].perm[i % matriceHeight][j % matriceWidth];
                            break;
                        case "blank":
                            permutationen[currentPerm].perm[i % matriceHeight][j % matriceWidth] += 1;
                            permutationen[currentPerm].perm[i % matriceHeight][j % matriceWidth] %= boobs;
                            d = permutationen[currentPerm].perm[i % matriceHeight][j % matriceWidth];
                            break;
                        case "next":
                            permutationen[currentPerm].perm[i % matriceHeight][j % matriceWidth] += 1;
                            permutationen[currentPerm].perm[i % matriceHeight][j % matriceWidth] %= boobs;
                            d = permutationen[currentPerm].perm[i % matriceHeight][j % matriceWidth];
                            break;
                        default: break;
                    }
                    console.log(animat[d]);
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
    if (fps >= 5) {
        fps -= 2;
        interval = 1000 / fps;
    }
}

function changePermutation() {
    currentPerm += 1;
    currentPerm %= permutationen.length;
    initialize();
}

// funktion: permutationen weiter schalten
//function changePermutationFwrd() {
//    currentPerm += 1;
//    currentPerm %= permutationen.length;
//    initialize();
//}

// funktion: permutationen zurück schalten
//function changePermutationBack() {
//    currentPerm -= 1;
//    currentPerm %= permutationen.length;
//    initialize();
//}

function changeObject() {
    currentObject += 1;
    currentObject %= objekte.length;
    initialize();
}

// objekt ++
//function changeObjectFwrd() {
//    currentObject += 1;
//    currentObject %= permutationen.length;
//    initialize();
//}

// objekt --
//function changeObjectBack() {
//    currentObject -= 1;
//    currentObject %= permutationen.length;
//    initialize();
//}

function changeTypeOfObj() {
    typeSwitch = !typeSwitch;
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
