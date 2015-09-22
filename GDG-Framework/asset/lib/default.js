// JavaScript document
/* 
    Grundlagen der Gestaltung Framework
    Univerität Ulm
    Institut für Medienforschung und -entwicklung
*/

var json;

var section = 0,
    content = 0,
    description = 0,
    sectionsCount = 0,
    sectionsPointer = 0;

var lock = false;

function start() {
    document.getElementById("intro").style.opacity = 0;
    document.getElementById("intro").style.zIndex = 0;
    document.getElementById("doku").style.opacity = 1;
};

// load XML Data into the program
$(function () {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "inhalte.xml", true);
    xmlhttp.send();

    // read the loaded XML-data when it has fully loaded (ansynchronous loading)
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            json = xmlToJson(xmlhttp.responseXML);

            for (var i = 0; i < json.doku.abschnitt.length; ++i) {
                sectionsCount += json.doku.abschnitt[i].inhalt.length;
            }

            displayPicture();
            displayDescription();
            updateCounter();
            fillNavigation();
            $('#navscroll').simplebar();
        };
    };
});

// Changes XML to JSON
function xmlToJson(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};

// listener function to navigate via arrow keys
$(document).keydown(function (e) {
    if (!lock) {
        if ((e.keyCode || e.which) == 37 || (e.keyCode || e.which) == 38) { // left
            prevImg();
        }
        else if ((e.keyCode || e.which) == 39 || (e.keyCode || e.which) == 40) { // right
            nextImg();
        }
    }
    if ((e.keyCode || e.which) == 13) {
        document.getElementById("blur").focus();
    }
});

// listener to input numbers directly into the pane
document.getElementById("imgNum").onfocus = function () {
    plainNumber();
    lock = true;
};

document.getElementById("imgNum").onblur = function () {
    updateCounter();
    lock = false;
};

document.getElementById("imgNum").onkeyup = function () {
    pictureInput();
    displayPicture();
    displayDescription();
};

// function to change the picture being shown
function displayPicture() {
    // set the image
    document.getElementById("contentImg").src = json.doku.abschnitt[section].inhalt[content]['@attributes']['quelle'];

    // set the title to the title (very top of the pane) of the image
    document.getElementById("title").innerHTML = json.doku.abschnitt[section]['@attributes']['titel'];
};

// function to change the description
function displayDescription() {
    // set the title of the image description (top of aside) to the title of the description
    document.getElementById("descTitle").innerHTML = json.doku.abschnitt[section].inhalt[content]['@attributes']['titel'];

    // if the desription is more than one page long the navigation for the description is shown
    if (json.doku.abschnitt[section].inhalt[content].details.length > 1) {
        // set the description of the image (main area of the aside) to the description of the details node
        document.getElementById("desc").innerHTML = json.doku.abschnitt[section].inhalt[content].details[description]['#text'];

        //display the description counter
        document.getElementById("descriptionNavigation").style.display = 'block';

        // update the description counter
        descNum.innerHTML = description + 1 + "/" + json.doku.abschnitt[section].inhalt[content].details.length;

    }// if the description is just one page long the navigation for the description is hidden
    else {
        // set the description of the image (main area of the aside) to the description of the details node
        document.getElementById("desc").innerHTML = json.doku.abschnitt[section].inhalt[content].details['#text'];

        //hide the description counter
        document.getElementById("descriptionNavigation").style.display = 'none';
    }
};

// next image function
function nextImg() {
    if (sectionsPointer < sectionsCount - 1) {
        sectionsPointer++;

        if (content < json.doku.abschnitt[section].inhalt.length - 1) {
            content++;
        }
        else {
            section++;
            content = 0;
        }

        description = 0;

        displayPicture();
        updateCounter();
        displayDescription();
    }
};

// previous image function
function prevImg() {
    if (sectionsPointer > 0) {
        sectionsPointer--;

        if (content > 0) {
            content--;
        }
        else {
            section--;
            content = json.doku.abschnitt[section].inhalt.length - 1;
        }

        description = 0;

        displayPicture();
        updateCounter();
        displayDescription();
    }
};

// next description function
function nextDesc() {
    if (description < json.doku.abschnitt[section].inhalt[content].details.length - 1) {
        description++;
        displayDescription();
    }
};

// previous description function
function prevDesc() {
    if (description > 0) {
        description--;
        displayDescription();
    }
};

/*  region HELPER */
function plainNumber() {
    imgNum.value = imgNum.value.substring(0, imgNum.value.lastIndexOf('/'));
};

function updateCounter() {
    imgNum.value = (parseInt(sectionsPointer) + 1) + "/" + sectionsCount;
};

function pictureInput() {
    if (imgNum.value == '' || isNaN(imgNum.value)) {
        return 0;
    }

    sectionsPointer = imgNum.value - 1;

    var c = 0;
    for (var i = 0; i < json.doku.abschnitt.length && c != imgNum.value; i++) {
        for (var j = 0; j < json.doku.abschnitt[i].inhalt.length && c != imgNum.value; j++) {
            if (c != imgNum.value) {
                c++;
                section = i;
                content = j;
            }
        }
    }
};

function fillNavigation() {
    var string = '<ul>';

    for (var i = 0; i < json.doku.abschnitt.length; i++) {
        string += '<li><details><summary>';
        string += json.doku.abschnitt[i]['@attributes']['titel']
        string += '</summary><ul>';
        for (var j = 0; j < json.doku.abschnitt[i].inhalt.length; j++) {
            string += '<li>';
            string += json.doku.abschnitt[i].inhalt[j]['@attributes']['titel'];
            string += '</li>';
        }
        string += '</ul></details>';
    }
    string += '</ul>';
    document.getElementById("navscroll").innerHTML = string;
};
