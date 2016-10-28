// JavaScript document
/* 
    Grundlagen der Gestaltung Framework
    Univerität Ulm
    Institut für Medienforschung und -entwicklung
    Tobias Lahmann
*/

var json;

var section = 0,
    content = 0,
    description = 0,
    sectionsCount = 0,
    sectionsPointer = 0;

var lock = true;

var xml;

function launchIntoWindowed() {
    $('#intro').css("opacity", 0);
    $('#intro').css("zIndex", 0);
    $('#doku').css("opacity", 1);
    lock = false;
};

function launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    launchIntoWindowed();
}

// load XML Data into the program
$(function () {
    json = xmlToJson(document.getElementById("data"));
    var con = json.DOKU.ABSCHNITT;

    if (con.length > 1) {
        for (var i = 0; i < con.length; ++i) {
            if (con[i].INHALT.length >= 1) {
                sectionsCount += json.DOKU.ABSCHNITT[i].INHALT.length;
            }
            else {
                sectionsCount++;
            }
        }
    } else {
        sectionsCount += json.DOKU.ABSCHNITT.INHALT.length;
    }

    
    fillNavigation();
    $('#navscroll').simplebar();
    $('#description').append("<h4 id=\"descTitle\">desctitle</h4><p id=\"descText\">desc</p>");
    $('#description').simplebar();
    
    redraw();
    document.getElementById("studentName").textContent = json["@attributes"].name;
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
                obj["@attributes"][attribute.nodeName] = attribute.value;
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
$('#imgNum').on('focus', function () {
    plainNumber();
    lock = true;
}).on('blur', function () {
    updateCounter();
    lock = false;
}).on('keyup', function () {
    pictureInput();
    displayPicture();
    displayDescription();
});

// prevent the navigation menu from closing when the mouse is over the area
// close the navigation menu when the mouse leaves area (delay 1000ms)
$('#navigation').on('mouseenter', function () {
    clearTimeout($.data(this, 'timer'));
    $('#navigation').stop(true, true);
}).on('mouseleave', function () {
    $.data(this, 'timer', setTimeout(function () {
        if ($('#navTrigger').is(':checked')) {
            $('#navigation').stop(true, true).css("left", "-284px");
            $("#navTriggerText").toggleClass('triggered');
            $("input[name = 'navTrigger']").prop("checked", false);
        }
    }, 1000));
});

function redraw() {
    displayPicture();
    displayDescription();
    updateCounter();
    return;
};

// function to change the picture being shown
function displayPicture() {
    var con = null;
    if (json.DOKU.ABSCHNITT.length > 1) {
        con = json.DOKU.ABSCHNITT[section];
    } else {
        con = json.DOKU.ABSCHNITT;
    }

    // set the title to the title (very top of the pane) of the image
    $("#title").html(con['@attributes']['titel']);

    if (con.INHALT.length > 1) {
        con = con.INHALT[content];
    } else {
        con = con.INHALT;
    }

    if (con['@attributes']['typ'] == "bild") {
        // display picture
        $('#contentImg').css("display", "block");
        // set the image
        document.getElementById("contentImg").src = con['@attributes']['quelle'];

        // hide other sections
        $('#contentAnim').css("display", "none");
        $('#canvas').css("display", "none");
        $('#flashCanvas').css("display", "none");

        pauseAnimation();
    }
    else if (con['@attributes']['typ'] == "animation") {
        // initialize the animation and start animating
        initialize();
        playAnimation();
        
        // display the animation
        $('#contentAnim').css("display", "block");
        $('#canvas').css("display", "block");

        // hide other sections
        $('#contentImg').css("display", "none");
        $('#flashCanvas').css("display", "none");

    }
    else if (con['@attributes']['typ'] == "flash") {
        // display the flash element (<embed>)

        var source = con['@attributes']['quelle'];
        var game = document.getElementById("flashCanvas");
        var clone = game.cloneNode(true);
        clone.setAttribute('src', source);
        game.parentNode.replaceChild(clone, game)
        $('#flashCanvas').css("display", "block");

        // hide other sections
        $('#contentImg').css("display", "none");
        $('#contentAnim').css("display", "none");
        $('#canvas').css("display", "none");

        pauseAnimation();
    }

    // change border display
    if (con['@attributes']['rahmen'] == "ein") {
        $("input[name = 'borderListener']").prop("checked", true);
        triggerBorder();
    }
    else {
        $("input[name = 'borderListener']").prop("checked", false);
        triggerBorder();
    }
};

// function to change the description
function displayDescription() {
    var con = null;
    if (json.DOKU.ABSCHNITT.length > 1) {
        con = json.DOKU.ABSCHNITT[section];
    } else {
        con = json.DOKU.ABSCHNITT;
    }
    if (con.INHALT.length > 1) {
        con = con.INHALT[content];
    } else {
        con = con.INHALT;
    }

    // set the title of the image description (top of aside) to the title of the description
    document.getElementById("descTitle").innerHTML = con['@attributes']['titel'];

    // if the desription is more than one page long the navigation for the description is shown
    if (con.DETAIL.length > 1) {
        // set the description of the image (main area of the aside) to the description of the details node
        document.getElementById("descText").innerHTML = con.DETAIL[description]['#text'];

        //display the description counter
        $('#descNav').css("display", "block");
        $('#description').css("border-color", "#7a7a80")

        // update the description counter
        descNum.innerHTML = description + 1 + " / " + con.DETAIL.length;

    }// if the description is just one page long the navigation for the description is hidden
    else {
        // set the description of the image (main area of the aside) to the description of the details node
        document.getElementById("descText").innerHTML = con.DETAIL['#text'];

        //hide the description counter
        $('#descNav').css("display", "none");
        $('#description').css("border-color", "#FFF");
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
    if (description < json.DOKU.ABSCHNITT[section].INHALT[content].DETAIL.length - 1) {
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
    imgNum.value = (parseInt(sectionsPointer) + 1) + " / " + sectionsCount;
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

    if (imgNum.value - 1 > c) {
        imgNum.value = c;
        sectionsPointer = c - 1;
    }
};

// helper to fill the navigation with info
// string concat
function fillNavigation() {
    var outerUl = document.createElement("ul");
    var c = 0;

    for (var i = 0; i < json.DOKU.ABSCHNITT.length; i++) {
        var outerLi = document.createElement("li");
        var det = document.createElement("details");
        var sum = document.createElement("summary");
        sum.innerHTML = json.DOKU.ABSCHNITT[i]['@attributes']['titel']
        var innerUl = document.createElement("ul");
        var innerLi;
        
        if (json.DOKU.ABSCHNITT[i].INHALT.length > 0) {
            for (var j = 0; j < json.DOKU.ABSCHNITT[i].INHALT.length; j++) {
                innerLi = document.createElement("li");
                innerLi.setAttribute('data-link', c + ':' + i + ',' + j + '\"');
                innerLi.setAttribute('onclick', 'jumpTo(this)');
                innerLi.innerHTML = json.DOKU.ABSCHNITT[i].INHALT[j]['@attributes']['titel'];
                innerUl.appendChild(innerLi);
                c++;
            }
        } else {
            innerLi = document.createElement("li");
            innerLi.setAttribute('data-link', c + ':' + i + ',' + j + '\"');
            innerLi.setAttribute('onclick', 'jumpTo(this)');
            innerLi.innerHTML = json.DOKU.ABSCHNITT[i].INHALT['@attributes']['titel'];
            innerUl.appendChild(innerLi);
            c++;
        }
        det.appendChild(sum);
        det.appendChild(innerUl);
        outerLi.appendChild(det);
        outerUl.appendChild(outerLi);
    }
    document.getElementById("navscroll").appendChild(outerUl);
    return;
};

// listener to open the navigation
$("input[name='navTrigger']").change(function () {

    if ($(this).is(':checked')) {
        $("#navigation").css("left", 0);
        $("#navTriggerText").toggleClass('triggered');
    }
    else {
        $("#navigation").css("left", "-284px");
        $("#navTriggerText").toggleClass('triggered');
    }

});

// jump to selected slide from navigation menu
function jumpTo(id) {
    var data = (id.dataset.link).split(":");
    var jump = data[1].split(",");
    section = parseInt(jump[0]);
    content = parseInt(jump[1]);

    sectionsPointer = parseInt(data[0]);

    redraw();
};

// function to change the border color of the displayed object (& others)
// the border is always shown and just the color is changed (grey <-> white)
// to prevent the rendering engine from moving the obj by 1px (borderwidth)
function triggerBorder() {
    if ($('#borderListener').is(':checked')) {
        $("input[name = 'borderListener']").prop("checked", true);

        $('#contentImg').css("border-color", "rgb(122,122,128)");
        $('#canvas').css("border-color", "rgb(122,122,128)");
        $('#flashCanvas').css("border-color", "rgb(122,122,128)");
    }
    else {
        $("input[name = 'borderListener']").prop("checked", false);

        $('#contentImg').css("border-color", "#FFF");
        $('#canvas').css("border-color", "#FFF");
        $('#flashCanvas').css("border-color", "#FFF");
    }
};
