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

var lock = true;

var xml;

function start() {
    //document.getElementById("studentName").innerText = json["@attributes"].name;
    //document.getElementById("studentName").innerHTML = json["@attributes"].name;
    //document.getElementById("studentName").innerText = document.getElementById("data").getAttribute("name");
    //document.getElementById("studentName").innerText = document.getElementById("data").getAttribute("name");
    document.getElementById("intro").style.opacity = 0;
    document.getElementById("intro").style.zIndex = 0;
    document.getElementById("doku").style.opacity = 1;
    lock = false;
};

// load XML Data into the program
$(function () {
    json = xmlToJson(document.getElementById("data"));

    for (var i = 0; i < json.DOKU.ABSCHNITT.length; ++i) {
        if (json.DOKU.ABSCHNITT[i].INHALT.length >= 1) {
            sectionsCount += json.DOKU.ABSCHNITT[i].INHALT.length;
        }
        else {
            sectionsCount++;
        }
    }

    redraw();
    fillNavigation();
    $('#navscroll').simplebar();
    document.getElementById("studentName").innerText = json["@attributes"].name;
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

function redraw() {
    displayPicture();
    displayDescription();
    updateCounter();
};

// function to change the picture being shown
function displayPicture() {
    if (json.DOKU.ABSCHNITT[section].INHALT.length > 1) {
        if (json.DOKU.ABSCHNITT[section].INHALT[content]['@attributes']['typ'] == "bild") {
            // display picture
            document.getElementById("contentImg").style.display = "block";
            // set the image
            document.getElementById("contentImg").src = json.DOKU.ABSCHNITT[section].INHALT[content]['@attributes']['quelle'];

            // hide other sections
            document.getElementById("contentAnim").style.display = "none";
            document.getElementById("canvas").style.display = "none";
            document.getElementById("flashCanvas").style.display = "none";

        }
        else if (json.DOKU.ABSCHNITT[section].INHALT[content]['@attributes']['typ'] == "animation") {
            // display the animation
            document.getElementById("contentAnim").style.display = "block";
            document.getElementById("canvas").style.display = "block";

            // hide other sections
            document.getElementById("contentImg").style.display = "none";
            document.getElementById("flashCanvas").style.display = "none";

        }
        else if (json.DOKU.ABSCHNITT[section].INHALT[content]['@attributes']['typ'] == "flash") {
            // display the flash element (<embed>)

            var source = json.DOKU.ABSCHNITT[section].INHALT[content]['@attributes']['quelle'];
            var game = document.getElementById("flashCanvas");
            var clone = game.cloneNode(true);
            clone.setAttribute('src', source);
            game.parentNode.replaceChild(clone, game)
            document.getElementById("flashCanvas").style.display = "block";

            // hide other sections
            document.getElementById("contentImg").style.display = "none";
            document.getElementById("contentAnim").style.display = "none";
            document.getElementById("canvas").style.display = "none";
        }

        // set the title to the title (very top of the pane) of the image
        document.getElementById("title").innerHTML = json.DOKU.ABSCHNITT[section]['@attributes']['titel'];

        // change border display
        if (json.DOKU.ABSCHNITT[section].INHALT[content]['@attributes']['rahmen'] == "ein") {
            document.getElementById("borderListener").checked = true;
            triggerBorder();
        }
        else {
            document.getElementById("borderListener").checked = false;
            triggerBorder();
        }

    } else {
        if (json.DOKU.ABSCHNITT[section].INHALT['@attributes']['typ'] == "bild") {
            // display picture
            document.getElementById("contentImg").style.display = "block";
            // set the image
            document.getElementById("contentImg").src = json.DOKU.ABSCHNITT[section].INHALT['@attributes']['quelle'];

            // hide other sections
            document.getElementById("contentAnim").style.display = "none";
            document.getElementById("canvas").style.display = "none";
            document.getElementById("flashCanvas").style.display = "none";

        }
        else if (json.DOKU.ABSCHNITT[section].INHALT['@attributes']['typ'] == "animation") {
            // display the animation
            document.getElementById("contentAnim").style.display = "block";
            document.getElementById("canvas").style.display = "block";

            // hide other sections
            document.getElementById("contentImg").style.display = "none";
            document.getElementById("flashCanvas").style.display = "none";

        }
        else if (json.DOKU.ABSCHNITT[section].INHALT['@attributes']['typ'] == "flash") {
            // display the flash element (<embed>)

            var source = json.DOKU.ABSCHNITT[section].INHALT['@attributes']['quelle'];
            var game = document.getElementById("flashCanvas");
            var clone = game.cloneNode(true);
            clone.setAttribute('src', source);
            game.parentNode.replaceChild(clone, game)
            document.getElementById("flashCanvas").style.display = "block";

            // hide other sections
            document.getElementById("contentImg").style.display = "none";
            document.getElementById("contentAnim").style.display = "none";
            document.getElementById("canvas").style.display = "none";
        }
        // set the title to the title (very top of the pane) of the image
        document.getElementById("title").innerHTML = json.DOKU.ABSCHNITT[section]['@attributes']['titel'];

        // change border display
        if (json.DOKU.ABSCHNITT[section].INHALT['@attributes']['rahmen'] == "ein") {
            document.getElementById("borderListener").checked = true;
            triggerBorder();
        }
        else {
            document.getElementById("borderListener").checked = false;
            triggerBorder();
        }
    }
};

// function to change the description
function displayDescription() {
    if (json.DOKU.ABSCHNITT[section].INHALT.length > 1) {
        // set the title of the image description (top of aside) to the title of the description
        document.getElementById("descTitle").innerHTML = json.DOKU.ABSCHNITT[section].INHALT[content]['@attributes']['titel'];

        // if the desription is more than one page long the navigation for the description is shown
        if (json.DOKU.ABSCHNITT[section].INHALT[content].DETAILS.length > 1) {
            // set the description of the image (main area of the aside) to the description of the details node
            document.getElementById("desc").innerHTML = json.DOKU.ABSCHNITT[section].INHALT[content].DETAILS[description]['#text'];

            //display the description counter
            document.getElementById("descriptionNavigation").style.display = 'block';

            // update the description counter
            descNum.innerHTML = description + 1 + "/" + json.DOKU.ABSCHNITT[section].INHALT[content].DETAILS.length;

        }// if the description is just one page long the navigation for the description is hidden
        else {
            // set the description of the image (main area of the aside) to the description of the details node
            document.getElementById("desc").innerHTML = json.DOKU.ABSCHNITT[section].INHALT[content].DETAILS['#text'];

            //hide the description counter
            document.getElementById("descriptionNavigation").style.display = 'none';
        }
    } else {
        // set the title of the image description (top of aside) to the title of the description
        document.getElementById("descTitle").innerHTML = json.DOKU.ABSCHNITT[section].INHALT['@attributes']['titel'];

        // if the desription is more than one page long the navigation for the description is shown
        if (json.DOKU.ABSCHNITT[section].INHALT.DETAILS.length > 1) {
            // set the description of the image (main area of the aside) to the description of the details node
            document.getElementById("desc").innerHTML = json.DOKU.ABSCHNITT[section].INHALT.DETAILS[description]['#text'];

            //display the description counter
            document.getElementById("descriptionNavigation").style.display = 'block';

            // update the description counter
            descNum.innerHTML = description + 1 + "/" + json.DOKU.ABSCHNITT[section].INHALT.DETAILS.length;

        }// if the description is just one page long the navigation for the description is hidden
        else {
            // set the description of the image (main area of the aside) to the description of the details node
            document.getElementById("desc").innerHTML = json.DOKU.ABSCHNITT[section].INHALT.DETAILS['#text'];

            //hide the description counter
            document.getElementById("descriptionNavigation").style.display = 'none';
        }
    }
};

// next image function
function nextImg() {
    if (sectionsPointer < sectionsCount - 1) {
        sectionsPointer++;

        if (content < json.DOKU.ABSCHNITT[section].INHALT.length - 1) {
            content++;
        }
        else {
            section++;
            content = 0;
        }

        description = 0;

        redraw();
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
            content = json.DOKU.ABSCHNITT[section].INHALT.length - 1;
        }

        description = 0;

        redraw();
    }
};

// next description function
function nextDesc() {
    if (description < json.DOKU.ABSCHNITT[section].INHALT[content].DETAILS.length - 1) {
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
    for (var i = 0; i < json.DOKU.ABSCHNITT.length && c != imgNum.value; i++) {
        for (var j = 0; j < json.DOKU.ABSCHNITT[i].INHALT.length && c != imgNum.value; j++) {
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
    var c = 0;

    for (var i = 0; i < json.DOKU.ABSCHNITT.length; i++) {
        string += '<li><details><summary>';
        string += json.DOKU.ABSCHNITT[i]['@attributes']['titel']
        string += '</summary><ul>';
        for (var j = 0; j < json.DOKU.ABSCHNITT[i].INHALT.length; j++) {
            string += '<li data-link=\"';
            string += c + ':' + i + ',' + j + '\"';
            string += 'onclick=\"jumpTo(this)\">';
            string += json.DOKU.ABSCHNITT[i].INHALT[j]['@attributes']['titel'];
            string += '</li>';
            c++;
        }
        string += '</ul></details>';
    }
    string += '</ul>';
    document.getElementById("navscroll").innerHTML = string;
};

// listener to open the navigation
$("input[name='navTrigger']").change(function () {

    if ($(this).is(':checked')) {
        $("#navigation").css("left", 0);
        $("#navTriggerText").toggleClass('triggered');
    }
    else {

        $("#navigation").css("left", "-18%");
        $("#navTriggerText").toggleClass('triggered');
    }

});

function jumpTo(id) {
    var data = (id.dataset.link).split(":");
    var jump = data[1].split(",");
    section = jump[0];
    content = jump[1];

    sectionsPointer = data[0];

    redraw();
};

function triggerBorder() {
    if (document.getElementById("borderListener").checked) {
        document.getElementById("borderListener").checked = true;

        document.getElementById("contentImg").style.border = "1px solid #666";
        document.getElementById("canvas").style.border = "1px solid #666";
        document.getElementById("flashCanvas").style.border = "1px solid #666";

    }
    else {
        document.getElementById("borderListener").checked = false;

        document.getElementById("contentImg").style.border = "1px solid #FFF";
        document.getElementById("canvas").style.border = "1px solid #FFF";
        document.getElementById("flashCanvas").style.border = "1px solid #FFF";
    }
};
