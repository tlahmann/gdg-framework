// JavaScript document
/* 
    Grundlagen der Gestaltung Framework
    Univerität Ulm
    Institut für Medienforschung und -entwicklung
*/

// function to change the scrollbar
//$(function () {
//    $('.scroll-pane').jScrollPane();
//});

// array variables to save the images (x) and descriptions (y)
var x, y;
// count variables to navigate through images (i) and descriptions (j)
var i = 0, j = 0;

var lock = false;

// Anonymous function to load the xml data to show
$(function () {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "inhalte.xml", true);
    xmlhttp.send();

    // read the loaded xml-data when it has fully loaded (ansynchronous loading)
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            // save all 'inhalte' nodes in x array
            x = (xmlhttp.responseXML).getElementsByTagName('inhalt');
            displayPicture();

            updateCounter();

            displayDescription();
        };
    };

    // local storage saves the image number that hast last being viewed to reload on refresh
    //i = localStorage.getItem('imgstore') != null ? parseInt(localStorage.getItem('imgstore')) : 0;
});

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

// function to change the picture being shown
function displayPicture() {
    // set the image
    document.getElementById("contentImg").src = x[i].getAttribute("quelle");

    // set the title to the title (very top of the pane) of the image
    document.getElementById("title").innerHTML = x[i].parentElement.getAttribute("titel");

    // local storage saves the image number that hast last being viewed to reload on refresh
    //localStorage.setItem('imgstore', JSON.stringify(i));
};

function pictureInput() {
    if (imgNum.value != '') {
        i = imgNum.value - 1;
    }
};

function plainNumber() {
    imgNum.value = i + 1;
};

function updateCounter() {
    var c = parseInt(i) + 1;
    imgNum.value = (c) + "/" + x.length;
};

// function to change the description
function displayDescription() {
    // details get loaded when the image ist loaded
    y = x[i].getElementsByTagName("details");

    // set the title of the image description (top of aside) to the title of the description
    document.getElementById("descTitle").innerHTML = x[i].getAttribute("titel");

    // set the description of the image (main area of the aside) to the content of the details node
    document.getElementById("desc").innerHTML = y[j].childNodes[0].nodeValue;

    // if the desription is more than one page long the navigation for the description is shown
    if (y.length > 1) {
        document.getElementById("descriptionNavigation").style.display = 'block';
        // update the description counter
        descNum.innerHTML = j + 1 + "/" + y.length;
    }// if the description is just one page long the navigation for the description is hidden
    else {
        document.getElementById("descriptionNavigation").style.display = 'none';
    }
};

// next image function
function nextImg() {
    if (i < x.length - 1) {
        i++;
        j = 0;
        displayPicture();
        updateCounter();
        displayDescription();
    }
};

// previous image function
function prevImg() {
    if (i > 0) {
        i--;
        j = 0;
        displayPicture();
        updateCounter();
        displayDescription();
    }
};

// next description function
function nextDesc() {
    if (j < y.length - 1) {
        j++;
        displayDescription();
    }
};

// previous description function
function prevDesc() {
    if (j > 0) {
        j--;
        displayDescription();
    }
};

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
    displayPicture()
};
