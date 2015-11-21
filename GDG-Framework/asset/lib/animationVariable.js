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

import flash.events.MouseEvent;

// ======== !!!!! ALLE PERMUTATIONEN MUESSEN DIMENSION 8 X 8 HABEN !!!!! ========
// Tipp: Es sollte auf Kombinationen von 8 und 1 in der ersten Spalte und 
// ersten Zeile verzichtet werden. (Kollidiert mit 7 Frames!)
// Tipp: Es sollte auf Kombinationen von 8 und 1, 7 und 2 in der ersten Spalte und 
// ersten Zeile verzichtet werden. (Kollidiert mit 6 Frames!)
// Tipp: Es sollte auf Kombinationen von 8 und 1, 7 und 2 und 6 und 3 in der 
// ersten Spalte und ersten Zeile verzichtet werden. (Kollidiert mit 5 Frames!)

// Permutationsmatrix
var perm1:Array = [
[ 3, 2, 1, 8, 7, 6, 5, 8 ],
[ 4, 5, 4, 3, 2, 1, 4, 7 ],
[ 5, 6, 7, 6, 5, 8, 3, 6 ], 
[ 6, 7, 8, 1, 4, 7, 2, 5 ], 
[ 7, 8, 1, 2, 3, 6, 1, 4 ], 
[ 8, 1, 2, 3, 4, 5, 8, 3 ],
[ 1, 2, 3, 4, 5, 6, 7, 2 ],
[ 2, 3, 4, 5, 6, 7, 8, 1 ] ];

// eine weitere Permutationsmatrix
var perm2:Array = [
[ 8, 7, 6, 5, 4, 3, 2, 1 ],
[ 7, 8, 7, 6, 5, 4, 3, 2 ], 
[ 6, 7, 8, 7, 6, 5, 4, 3 ],
[ 5, 6, 7, 8, 7, 6, 5, 4 ],
[ 4, 5, 6, 7, 8, 7, 6, 5 ], 
[ 3, 4, 5, 6, 7, 8, 7, 6 ],
[ 2, 3, 4, 5, 6, 7, 8, 7 ],
[ 1, 2, 3, 4, 5, 6, 7, 8 ] ];

// eine weitere Permutationsmatrix
var perm3:Array = [
[ 1, 2, 1, 2, 1, 2, 1, 2 ],
[ 2, 3, 2, 3, 2, 3, 2, 3 ],
[ 3, 4, 3, 4, 3, 4, 3, 4 ], 
[ 4, 5, 4, 5, 4, 5, 4, 5 ], 
[ 5, 6, 5, 6, 5, 6, 5, 6 ], 
[ 6, 7, 6, 7, 6, 7, 6, 7 ],
[ 7, 8, 7, 8, 7, 8, 7, 8 ],
[ 8, 1, 8, 1, 8, 1, 8, 1 ] ];

// eine weitere Permutationsmatrix
var perm4:Array = [
[ 8, 7, 6, 5, 4, 3, 2, 1 ],
[ 7, 7, 6, 5, 4, 3, 2, 1 ],
[ 6, 6, 6, 5, 4, 3, 2, 1 ], 
[ 5, 5, 5, 5, 4, 3, 2, 1 ], 
[ 4, 4, 4, 4, 4, 3, 2, 1 ], 
[ 3, 3, 3, 3, 3, 3, 2, 1 ],
[ 2, 2, 2, 2, 2, 2, 2, 1 ],
[ 1, 1, 1, 1, 1, 1, 1, 1 ] ];

// eine weitere Permutationsmatrix
var perm5:Array = [
[ 1, 2, 3, 4, 5, 6, 7, 8 ],
[ 1, 2, 3, 4, 5, 6, 7, 8 ],
[ 1, 2, 3, 4, 5, 6, 7, 8 ], 
[ 1, 2, 3, 4, 5, 6, 7, 8 ], 
[ 1, 2, 3, 4, 5, 6, 7, 8 ], 
[ 1, 2, 3, 4, 5, 6, 7, 8 ],
[ 1, 2, 3, 4, 5, 6, 7, 8 ],
[ 1, 2, 3, 4, 5, 6, 7, 8 ] ];

// und noch eine Permutationsmatrix
var perm6:Array = [
[1, 2, 3, 4, 4, 3, 2, 1 ],
[1, 2, 3, 4, 4, 3, 2, 1 ],
[8, 1, 2, 3, 3, 2, 1, 8 ],
[8, 1, 2, 3, 3, 2, 1, 8 ],
[7, 8, 1, 2, 2, 1, 8, 7 ],
[7, 8, 1, 2, 2, 1, 8, 7 ],
[6, 7, 8, 1, 1, 8, 7, 6 ],
[6, 7, 8, 1, 1, 8, 7, 6 ] ];

// die letzte Permutationsmatrix
var perm7:Array = [
[7, 6, 5, 4, 4, 5, 6, 7 ],
[6, 5, 4, 3, 3, 4, 5, 6 ],
[5, 4, 3, 2, 2, 3, 4, 5 ],
[4, 3, 2, 1, 1, 2, 3, 4 ],
[4, 3, 2, 1, 1, 2, 3, 4 ],
[5, 4, 3, 2, 2, 3, 4, 5 ],
[6, 5, 4, 3, 3, 4, 5, 6 ],
[7, 6, 5, 4, 4, 5, 6, 7 ] ];

// speichern der aktuellen symbole
var currAnim:Array = new Array(perm1.length); // speichert die aktuelle animation
var Animat:Class; 

var currPermNumber:int = 1;
var currPerm:Array = perm1; // Speichert die aktuelle Permutation

var currObjectNumber:int = 1; // Speichert das akutelle Objekt
var frameCount:int; // Speichert die aktuelle anzahl der frames pro Animation

var buttonCount:int = 9;//Anzahl der Buttons (wichtig für die removeAnimations() funktion)
var objectCount:int;//Anzahl der Objekte
var running:Boolean = Boolean(true);// spielt ab
var animationPositioX:int = 145;// x Koordinate des Animationsbereichs
var animationPositioY:int = 20;// y Koordinate des Animationsbereichs

var typeSwitch:Boolean = false; // Reinzeichnung <=> Skizze

var btnWidth:int = 40; // Buttonbreite
var btnHeight:int = 40; // Buttonhöhe

this.stage.frameRate = 12;

// play-button
var playPauseBtn:playPauseButton = new playPauseButton();
playPauseBtn.x = 340;
playPauseBtn.y = 480;
playPauseBtn.width = btnWidth;
playPauseBtn.height = btnHeight;
playPauseBtn.addEventListener(MouseEvent.CLICK, playPauseAnimation);
addChild(playPauseBtn);

// framerate-button ++
var changeFrameRateBtn:changeSpeedButton = new changeSpeedButton();
changeFrameRateBtn.x = 385;
changeFrameRateBtn.y = 480;
changeFrameRateBtn.width = btnWidth;
changeFrameRateBtn.height = btnHeight;
changeFrameRateBtn.addEventListener(MouseEvent.CLICK, higherFrameRate);
addChild(changeFrameRateBtn);

// framerate-button --
var changeFrameRateBtnAlt:changeSpeedButtonAlt = new changeSpeedButtonAlt();
changeFrameRateBtnAlt.x = 295;
changeFrameRateBtnAlt.y = 480;
changeFrameRateBtnAlt.width = btnWidth;
changeFrameRateBtnAlt.height = btnHeight;
changeFrameRateBtnAlt.addEventListener(MouseEvent.CLICK, lowerFrameRate);
addChild(changeFrameRateBtnAlt);

// permutation ++
var changePermutationBtn:changeAnimationButton = new changeAnimationButton();
changePermutationBtn.x = 430;
changePermutationBtn.y = 480;
changePermutationBtn.width = btnWidth;
changePermutationBtn.height = btnHeight;
changePermutationBtn.addEventListener(MouseEvent.CLICK, changePermutationFwrd);
addChild(changePermutationBtn);

// permutation --
var changePermutationBtnAlt:changeAnimationButtonAlt = new changeAnimationButtonAlt();
changePermutationBtnAlt.x = 250;
changePermutationBtnAlt.y = 480;
changePermutationBtnAlt.width = btnWidth;
changePermutationBtnAlt.height = btnHeight;
changePermutationBtnAlt.addEventListener(MouseEvent.CLICK, changePermutationBack);
addChild(changePermutationBtnAlt);

// object ++
var changeObjectBtn:changeObjectButton = new changeObjectButton();
changeObjectBtn.x = 475;
changeObjectBtn.y = 480;
changeObjectBtn.width = btnWidth;
changeObjectBtn.height = btnHeight;
changeObjectBtn.addEventListener(MouseEvent.CLICK, changeObjectFwrd);
addChild(changeObjectBtn);

// object --
var changeObjectBtnAlt:changeObjectButtonAlt = new changeObjectButtonAlt();
changeObjectBtnAlt.x = 205;
changeObjectBtnAlt.y = 480;
changeObjectBtnAlt.width = btnWidth;
changeObjectBtnAlt.height = btnHeight;
changeObjectBtnAlt.addEventListener(MouseEvent.CLICK, changeObjectBack);
addChild(changeObjectBtnAlt);

// object type change
var changeType:changeTypeButtonAlt = new changeTypeButtonAlt();
changeType.x = 30;
changeType.y = 500;
changeType.width = 20;
changeType.height = 10;
changeType.addEventListener(MouseEvent.CLICK, changeTypeOfObj);
addChild(changeType);

// object type change
var changeTypeAlt:changeTypeButton = new changeTypeButton();
changeTypeAlt.x = -300;
changeTypeAlt.y = 500;
changeTypeAlt.width = 20;
changeTypeAlt.height = 10;
changeTypeAlt.addEventListener(MouseEvent.CLICK, changeTypeOfObj);
addChild(changeTypeAlt);

// initialisierung
initialize();

//alle children bis auf die buttons entfernen
function removeAnimations():void
{
    var x:int = this.numChildren;
    for (var y:int = x-1; y > buttonCount-1; y--)
    {
		this.removeChildAt(y);
    }
}

//funktion: entsprechende Animationsobjekte initialisieren und auf die stage bringen
function initialize():void
{
    removeAnimations();
	
    // Bei der Umschaltung von Objekten oder der umschaltung von permutationen wird die initialize()-Methode
    // aufgerufen. In diesem Fall wird der running-Boolean ebenfalls umgeschaltet um die Funktion des
    // Play/Pause-Buttons wieder zu berichtigen.
    if (! running)
    {
        running = ! running;
    }	

    // typeSwitch entscheidet, ob die animation gerade auf reinzeichnungen oder auf Skizzen läuft
    // Dementsprechend wird die korrekte Animation gesucht.
    //
    // Kann entfernt werden, falls kein typeSwitch gewünscht ist
    Animat = getDefinitionByName("Animation"+(currObjectNumber)) as Class;
    if(typeSwitch){
        Animat = getDefinitionByName("Animation"+(currObjectNumber)+"_2") as Class;
    }

    frameCount = new Animat().totalFrames;
    // Skaliert die einzelnen currAnim um bei unterschiedlicher Frame-Anzahl immer die gleiche 
    // Größe des Animationsbereichs beizubehalten
    var scale:int = 50;
    if (frameCount == 5){
        scale = 84;
    } else if (frameCount == 6){
        scale = 70;
    } else if (frameCount == 7){
        scale = 60;
    } else if (frameCount == 8){
        scale = 52,5;
    }

    // Zeichnet die aktuelle permutation mit dem aktuellen Objekt
    for (var zeile:int = 0; zeile < frameCount; zeile++){
		var currZeilenArray:Array = new Array(frameCount);
		for (var spalte:int = 0; spalte < frameCount; spalte++){
        // Anpassungen falls weniger frames als permutationseinträge vorhanden sind.
        // Bsp.: Animation mit 6 Frames: 	8 => 1
        //									7 => 2
			if (currPerm[zeile][spalte] > frameCount){
				currPerm[zeile][spalte] %= frameCount;
    }
			
var a = new Animat();
a.x = (spalte * scale) + animationPositioX;	// Anpassung der Position abhängig von FrameCount
a.width = scale + 1;						// Anpassung der Breite um 5, 6, 7, 8 Frames immer mit 
// gleicher Breite anzuzeigen (Animationsbereich)
a.y = (zeile * scale) + animationPositioY; 	// Anpassung der Position abhängig von FrameCount
a.height = scale + 1;						// Anpassung der Höhe um 5, 6, 7, 8 Frames immer mit 
// gleicher Höhe anzuzeigen (Animationsbereich)
addChild(a);
a.gotoAndPlay(currPerm[zeile][spalte]);
currZeilenArray[spalte] = a;
}
currAnim[zeile] = currZeilenArray;
}
}

// funktion: fallauswahl: wenn der Player nicht abspielt wird die Animation gestartet, ansonsten pausiert;
function playPauseAnimation(e:MouseEvent):void
{
    if (! running)
	{
		playAnimation();
}
else
{
		pauseAnimation();
}
}

// funktion: pausieren/stoppen der currAnim
function pauseAnimation():void
{
    for (var zeile:int = 0; zeile < frameCount; zeile++)
    {
        for (var spalte:int = 0; spalte < frameCount; spalte++)
        {
			currAnim[zeile][spalte].stop();
        }
}
running = ! running;
}

// funktion: (wieder-)abspielen der currAnim;
function playAnimation():void
{
    for (var zeile:int = 0; zeile < frameCount; zeile++)
    {
        for (var spalte:int = 0; spalte < frameCount; spalte++)
        {
			currAnim[zeile][spalte].play();
        }
}
running = ! running;
}

// funktion: framerate erhoehen;
function higherFrameRate(e:MouseEvent):void
{
    // Framerate limitiert auf 40 fps maximal
    if (stage.frameRate < 40)
	{
		this.stage.frameRate +=  2;
}
}

// funktion: framerate verringern
function lowerFrameRate(e:MouseEvent):void
{
    // Framerate limitiert auf 5 fps minimal
    if (stage.frameRate >= 5)
	{
		this.stage.frameRate -=  2;
}
}

// funktion: permutationen umschalten
function changePermutationFwrd(e:MouseEvent):void
{
    switch (currPermNumber)
	{
		case 1 :
    currPerm = perm2;
    currPermNumber = 2;
    break;
		case 2 :
			currPerm = perm3;
			currPermNumber = 3;
			break;
		case 3 :
			currPerm = perm4;
			currPermNumber = 4;
			break;
		case 4 :
			currPerm = perm5;
			currPermNumber = 5;
			break;
		case 5 :
			currPerm = perm6;
			currPermNumber = 6;
			break;
		case 6 :
			currPerm = perm7;
			currPermNumber = 7;
			break;
		default :
			currPerm = perm1;
			currPermNumber = 1;
}

	initialize();
}

// funktion: permutationen umschalten;
function changePermutationBack(e:MouseEvent):void
{
    switch (currPermNumber)
	{
		case 1 :
    currPerm = perm7;
    currPermNumber = 7;
    break;
		case 2 :
			currPerm = perm1;
			currPermNumber = 1;
			break;
		case 3 :
			currPerm = perm2;
			currPermNumber = 2;
			break;
		case 4 :
			currPerm = perm3;
			currPermNumber = 3;
			break;
		case 5 :
			currPerm = perm4;
			currPermNumber = 4;
			break;
		case 6 :
			currPerm = perm5;
			currPermNumber = 5;
			break;
		default :
			currPerm = perm6;
			currPermNumber = 6;
}
	
	initialize();
}

//objekt ++;
function changeObjectFwrd(e:MouseEvent):void
{
    switch (currObjectNumber)
	{
		case 1 :
    currObjectNumber = 2;
    break;
		case 2 :
			currObjectNumber = 3;
			break;
		case 3 :
			currObjectNumber = 4;
			break;
		case 4 :
			currObjectNumber = 5;
			break;
		default :
			currObjectNumber = 1;
}

	initialize();
}

//objekt --
function changeObjectBack(e:MouseEvent):void
{
    switch (currObjectNumber)
	{
		case 1 :
    currObjectNumber = 5;
    break;
		case 2 :
			currObjectNumber = 1;
			break;
		case 3 :
			currObjectNumber = 2;
			break;
		case 4 :
			currObjectNumber = 3;
			break;
		case 5 :
			currObjectNumber = 4;
			break;
		default :
			currObjectNumber = 5;
}

	initialize();
}

function changeTypeOfObj(e:MouseEvent):void
{
    if (!typeSwitch){
		changeType.x = -300;
    changeTypeAlt.x = 30;
} else {
		changeType.x = 30;
changeTypeAlt.x = -300;
}
typeSwitch = ! typeSwitch;
initialize();
}

initialize();
