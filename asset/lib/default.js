/* 
    Grundlagen der Gestaltung Framework
    Univerität Ulm
    Institut für Medienforschung und -entwicklung
    Tobias Lahmann
*/
    /*  region HELPER */
var content, description, displayDescription, displayPicture, fillNavigation, json, jumpTo, lock, nextDesc, nextImg, pictureInput, plainNumber, prevDesc, prevImg, redraw, section, sectionsCount, sectionsPointer, triggerBorder, updateCounter, xml, xmlToJson;

json = void 0;

section = 0;

content = 0;

description = 0;

sectionsCount = 0;

sectionsPointer = 0;

lock = true;

xml = void 0;

this.launchIntoWindowed = function() {
  $('#intro').css('opacity', 0);
  $('#intro').css('zIndex', 0);
  $('#doku').css('opacity', 1);
  lock = false;
};

this.launchIntoFullscreen = function(element) {
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
};

// Changes XML to JSON
// load XML Data into the program
$(function() {
  var con, i;
  json = xmlToJson(document.getElementById('data'));
  con = json.DOKU.ABSCHNITT;
  if (con.length > 1) {
    i = 0;
    while (i < con.length) {
      if (con[i].INHALT.length >= 1) {
        sectionsCount += json.DOKU.ABSCHNITT[i].INHALT.length;
      } else {
        sectionsCount++;
      }
      ++i;
    }
  } else {
    sectionsCount += json.DOKU.ABSCHNITT.INHALT.length;
  }
  fillNavigation();
  $('#navscroll').simplebar();
  $('#description').append('<h4 id="descTitle">desctitle</h4><p id="descText">desc</p>');
  $('#description').simplebar();
  redraw();
  return document.getElementById('sN').textContent = json['@attributes'].name;
});

xmlToJson = function(xml) {
  var attribute, i, item, j, nodeName, obj, old;
  // Create the return object
  obj = {};
  if (xml.nodeType === 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {};
      j = 0;
      while (j < xml.attributes.length) {
        attribute = xml.attributes.item(j);
        obj['@attributes'][attribute.nodeName] = attribute.value;
        j++;
      }
    }
  } else if (xml.nodeType === 3) {
    // text
    obj = xml.nodeValue;
  }
  // do children
  if (xml.hasChildNodes()) {
    i = 0;
    while (i < xml.childNodes.length) {
      item = xml.childNodes.item(i);
      nodeName = item.nodeName;
      if (typeof obj[nodeName] === 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push === 'undefined') {
          old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
      i++;
    }
  }
  return obj;
};

redraw = function() {
  displayPicture();
  displayDescription();
  updateCounter();
};

// function to change the picture being shown
displayPicture = function() {
  var clone, con, game, source;
  con = null;
  if (json.DOKU.ABSCHNITT.length > 1) {
    con = json.DOKU.ABSCHNITT[section];
  } else {
    con = json.DOKU.ABSCHNITT;
  }
  // set the title to the title (very top of the pane) of the image
  $('#title').html(con['@attributes']['titel']);
  if (con.INHALT.length > 1) {
    con = con.INHALT[content];
  } else {
    con = con.INHALT;
  }
  if (con['@attributes']['typ'] === 'bild') {
    // display picture
    $('#contentImg').css('display', 'block');
    // set the image
    document.getElementById('contentImg').src = con['@attributes']['quelle'];
    // hide other sections
    $('#contentAnim').css('display', 'none');
    $('#canvas').css('display', 'none');
    $('#flashCanvas').css('display', 'none');
    pauseAnimation();
  } else if (con['@attributes']['typ'] === 'animation') {
    // initialize the animation and start animating
    initialize();
    playAnimation();
    // display the animation
    $('#contentAnim').css('display', 'block');
    $('#canvas').css('display', 'block');
    // hide other sections
    $('#contentImg').css('display', 'none');
    $('#flashCanvas').css('display', 'none');
  } else if (con['@attributes']['typ'] === 'flash') {
    // display the flash element (<embed>)
    source = con['@attributes']['quelle'];
    game = document.getElementById('flashCanvas');
    clone = game.cloneNode(true);
    clone.setAttribute('src', source);
    game.parentNode.replaceChild(clone, game);
    $('#flashCanvas').css('display', 'block');
    // hide other sections
    $('#contentImg').css('display', 'none');
    $('#contentAnim').css('display', 'none');
    $('#canvas').css('display', 'none');
    pauseAnimation();
  }
  // change border display
  if (con['@attributes']['rahmen'] === 'ein') {
    $('input[name = \'borderListener\']').prop('checked', true);
    triggerBorder();
  } else {
    $('input[name = \'borderListener\']').prop('checked', false);
    triggerBorder();
  }
};

// function to change the description
displayDescription = function() {
  var con;
  con = null;
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
  $('#descTitle').text(con['@attributes']['titel']);
  // if the desription is more than one page long the navigation for the description is shown
  if (con.DETAIL.length > 1) {
    // set the description of the image (main area of the aside) to the description of the details node
    $('#descText').text(con.DETAIL[description]['#text']);
    //display the description counter
    $('#descNav').css('display', 'block');
    $('#description').css('border-color', '#7a7a80');
    // update the description counter
    descNum.innerHTML = description + 1 + ' / ' + con.DETAIL.length;
  } else {
    // set the description of the image (main area of the aside) to the description of the details node
    $('#descText').text(con.DETAIL['#text']);
    //hide the description counter
    $('#descNav').css('display', 'none');
    $('#description').css('border-color', '#FFF');
  }
};

// next image function
nextImg = function() {
  if (sectionsPointer < sectionsCount - 1) {
    sectionsPointer++;
    if (content < json.DOKU.ABSCHNITT[section].INHALT.length - 1) {
      content++;
    } else {
      section++;
      content = 0;
    }
    description = 0;
    redraw();
  }
};

// previous image function
prevImg = function() {
  if (sectionsPointer > 0) {
    sectionsPointer--;
    if (content > 0) {
      content--;
    } else {
      section--;
      content = json.DOKU.ABSCHNITT[section].INHALT.length - 1;
    }
    description = 0;
    redraw();
  }
};

// next description function
nextDesc = function() {
  if (description < json.DOKU.ABSCHNITT[section].INHALT[content].DETAIL.length - 1) {
    description++;
    displayDescription();
  }
};

// previous description function
prevDesc = function() {
  if (description > 0) {
    description--;
    displayDescription();
  }
};

plainNumber = function() {
  imgNum.value = imgNum.value.substring(0, imgNum.value.lastIndexOf('/'));
};

updateCounter = function() {
  imgNum.value = parseInt(sectionsPointer) + 1 + ' / ' + sectionsCount;
};

pictureInput = function() {
  var c, i, j;
  if (imgNum.value === '' || isNaN(imgNum.value)) {
    return 0;
  }
  sectionsPointer = imgNum.value - 1;
  c = 0;
  i = 0;
  while (i < json.DOKU.ABSCHNITT.length && c !== imgNum.value) {
    j = 0;
    while (j < json.DOKU.ABSCHNITT[i].INHALT.length && c !== imgNum.value) {
      if (c !== imgNum.value) {
        c++;
        section = i;
        content = j;
      }
      j++;
    }
    i++;
  }
  if (imgNum.value - 1 > c) {
    imgNum.value = c;
    sectionsPointer = c - 1;
  }
};

// helper to fill the navigation with info
// string concat
fillNavigation = function() {
  var c, i, j, string;
  string = '<ul>';
  c = 0;
  i = 0;
  while (i < json.DOKU.ABSCHNITT.length) {
    string += '<li><details><summary>';
    string += json.DOKU.ABSCHNITT[i]['@attributes']['titel'];
    string += '</summary><ul>';
    if (json.DOKU.ABSCHNITT[i].INHALT.length > 0) {
      j = 0;
      while (j < json.DOKU.ABSCHNITT[i].INHALT.length) {
        string += '<li data-link="';
        string += c + ':' + i + ',' + j + '"';
        string += 'onclick="jumpTo(this)">';
        string += json.DOKU.ABSCHNITT[i].INHALT[j]['@attributes']['titel'];
        string += '</li>';
        c++;
        j++;
      }
    } else {
      string += '<li data-link="';
      string += c + ':' + i + ',' + j + '"';
      string += 'onclick="jumpTo(this)">';
      string += json.DOKU.ABSCHNITT[i].INHALT['@attributes']['titel'];
      string += '</li>';
      c++;
    }
    string += '</ul></details>';
    i++;
  }
  string += '</ul>';
  document.getElementById('navscroll').innerHTML = string;
};

// jump to selected slide from navigation menu
jumpTo = function(id) {
  var data, jump;
  data = id.dataset.link.split(':');
  jump = data[1].split(',');
  section = jump[0];
  content = jump[1];
  sectionsPointer = data[0];
  redraw();
};

// function to change the border color of the displayed object (& others)
// the border is always shown and just the color is changed (grey <-> white)
// to prevent the rendering engine from moving the obj by 1px (borderwidth)
triggerBorder = function() {
  if ($('#borderListener').is(':checked')) {
    $('input[name = \'borderListener\']').prop('checked', true);
    $('#contentImg').css('border-color', 'rgb(122,122,128)');
    $('#canvas').css('border-color', 'rgb(122,122,128)');
    $('#flashCanvas').css('border-color', 'rgb(122,122,128)');
  } else {
    $('input[name = \'borderListener\']').prop('checked', false);
    $('#contentImg').css('border-color', '#FFF');
    $('#canvas').css('border-color', '#FFF');
    $('#flashCanvas').css('border-color', '#FFF');
  }
};

// listener function to navigate via arrow keys
$(document).keydown(function(e) {
  if (!lock) {
    if ((e.keyCode || e.which) === 37 || (e.keyCode || e.which) === 38) {
      // left
      prevImg();
    } else if ((e.keyCode || e.which) === 39 || (e.keyCode || e.which) === 40) {
      // right
      nextImg();
    }
  }
  if ((e.keyCode || e.which) === 13) {
    document.getElementById('blur').focus();
  }
});

// listener to input numbers directly into the pane
// $('#imgNum').on('focus', ->
//   plainNumber()
//   lock = true
//   return
// ).on('blur', ->
//   updateCounter()
//   lock = false
//   return
// ).on 'keyup', ->
//   pictureInput()
//   displayPicture()
//   displayDescription()
//   return
// prevent the navigation menu from closing when the mouse is over the area
// close the navigation menu when the mouse leaves area (delay 1000ms)
$('#navigation').on('mouseenter', function() {
  clearTimeout($.data(this, 'timer'));
  $('#navigation').stop(true, true);
}).on('mouseleave', function() {
  $.data(this, 'timer', setTimeout((function() {
    if ($('#navTrigger').is(':checked')) {
      $('#navigation').stop(true, true).css('left', '-284px');
      $('#navTriggerText').toggleClass('triggered');
      $('input[name = \'navTrigger\']').prop('checked', false);
    }
  }), 1000));
});

// listener to open the navigation
$('input[name=\'navTrigger\']').change(function() {
  if ($(this).is(':checked')) {
    $('#navigation').css('left', 0);
    $('#navTriggerText').toggleClass('triggered');
  } else {
    $('#navigation').css('left', '-284px');
    $('#navTriggerText').toggleClass('triggered');
  }
});
