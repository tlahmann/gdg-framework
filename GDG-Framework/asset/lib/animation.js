/*------------------------------------------------------------------
[JavaScript File]

Project:		Grundlagen der Gestaltung 1 
-------------------------------------------------------------------*/

// Permutationen
var permutationen =
[
    [ // Permutation 1
        [1, 1, 5, 1, 5, 1, 1],
        [1, 5, 1, 5, 1, 5, 1],
        [5, 1, 5, 1, 5, 1, 5],
        [1, 5, 1, 5, 1, 5, 1],
        [5, 1, 5, 1, 5, 1, 5],
        [1, 5, 1, 5, 1, 5, 1],
        [1, 1, 5, 1, 5, 1, 1]
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

var currentPerm = 0; // Speichert die aktuelle Permutation
var currentObject = 0; // Speichert das akutelle Objekt

var running = Boolean(true);// spielt ab
var animationrate = 100; // ms

var animationPositioX = 200;// x Koordinate des Animationsbereichs
var animationPositioY = 50;// y Koordinate des Animationsbereichs

var animat = [];

//funktion: entsprechende Animationsobjekte initialisieren
function initialize() {
    for (i = 0; i < 7; i++) {
        var img = new Image();
        img.src = "inhalte/anim/group" + (currentObject + 1) + "/" + (i + 1) + ".png";
        animat[i] = img;
    }
    draw();
    //window.requestAnimationFrame(draw);
}

var context = document.getElementById('canvas').getContext('2d');

initialize();
//var myVar = setInterval(draw, animationrate);

var fps = 12;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

function draw() {
    if (running) {
        requestAnimationFrame(draw);

        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);

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
            }
        }
    }
};

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
    //console.log(fps);
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

function changeObject() {
    console.log("changeObject");
    currentObject += 1;
    currentObject %= permutationen.length;
    initialize();
}

function countFolders() {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Scripting.FileSystemObject");
    }
    //var myFileSysObj = new ActiveXObject("Scripting.FileSystemObject");
    var myFolder = xmlhttp.GetFolder("./inhalte/anim/");
    var myFolderCollection = myFolder.SubFolders;
};
