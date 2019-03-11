/* 
    Grundlagen der Gestaltung Framework
    Univerität Ulm
    Institut für Medienforschung und -entwicklung
    Tobias Lahmann
*/
    /*  region HELPER */
var contentCount, currentContent, currentDescription, currentSection, displayDescription, displayPicture, fillNavigation, json, jumpTo, lock, nextDesc, nextImg, prevDesc, prevImg, redraw, sectionsPointer, triggerBorder, updateCounter;

json = void 0;

currentSection = 0;

currentContent = 0;

currentDescription = 0;

contentCount = 0;

sectionsPointer = 0;

lock = true;

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

// load JSON Data into the program
$(function() {
  var pos;
  json = doku;
  contentCount = json.sections.reduce((function(acc, curr) {
    return acc + (curr.contents || []).length;
  }), 0);
  fillNavigation();
  $('#navscroll').simplebar();
  $('#description').append('<h4 id="descTitle">desctitle</h4><p id="descText">desc</p>');
  $('#description').simplebar();
  document.getElementById('sN').textContent = json.studentName;
  pos = window.location.hash.substr(1);
  if (+pos !== 0) {
    jumpTo(+pos - 1);
    launchIntoWindowed();
  }
  redraw();
});

redraw = function() {
  document.location.hash = parseInt(sectionsPointer) + 1;
  displayPicture();
  displayDescription();
  updateCounter();
};

// function to change the picture being shown
displayPicture = function() {
  var clone, con, game, source;
  con = json.sections[currentSection].contents[currentContent];
  switch (con.type) {
    case 'image':
      
      // display picture
      $('#contentImg').css('display', 'block');
      // set the image
      document.getElementById('contentImg').src = con.source;
      // hide other sections
      $('#contentAnim').css('display', 'none');
      $('#canvas').css('display', 'none');
      $('#flashCanvas').css('display', 'none');
      pauseAnimation();
      break;
    case 'animation':
      
      // initialize the animation and start animating
      initialize(con.source);
      playAnimation();
      // display the animation
      $('#contentAnim').css('display', 'block');
      $('#canvas').css('display', 'block');
      // hide other sections
      $('#contentImg').css('display', 'none');
      $('#flashCanvas').css('display', 'none');
      break;
    case 'flash':
      
      // display the flash element (<embed>)
      source = con.source;
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
      break;
    default:
      break;
  }
  $('input[name = \'borderListener\']').prop('checked', con.border === 'on');
  triggerBorder();
};

// function to change the description
displayDescription = function() {
  var con;
  con = json.sections[currentSection].contents[currentContent];
  // set the title of the image description (top of aside) to the title of the description
  $('#descTitle').text(con.title);
  // if the desription is more than one page long the navigation for the description is shown
  if (con.details.length > 1) {
    // set the description of the image (main area of the aside) to the description of the details node
    $('#descText').text(con.details[currentDescription]);
    //display the description counter
    $('#descNav').css('display', 'block');
    $('#description').css('border-color', '#7a7a80');
    // update the description counter
    descNum.innerHTML = currentDescription + 1 + ' / ' + con.details.length;
  } else {
    // set the description of the image (main area of the aside) to the description of the details node
    $('#descText').text(con.details[0]);
    //hide the description counter
    $('#descNav').css('display', 'none');
    $('#description').css('border-color', '#FFF');
  }
};

// next image function
nextImg = function() {
  if (sectionsPointer < contentCount - 1) {
    sectionsPointer++;
    if (currentContent < json.sections[currentSection].contents.length - 1) {
      currentContent++;
    } else {
      currentSection++;
      currentContent = 0;
    }
    currentDescription = 0;
    redraw();
  }
};

// previous image function
prevImg = function() {
  if (sectionsPointer > 0) {
    sectionsPointer--;
    if (currentContent > 0) {
      currentContent--;
    } else {
      currentSection--;
      currentContent = json.sections[currentSection].contents.length - 1;
    }
    currentDescription = 0;
    redraw();
  }
};

// next description function
nextDesc = function() {
  if (currentDescription < json.sections[currentSection].contents[currentContent].details.length - 1) {
    currentDescription++;
    displayDescription();
  }
};

// previous description function
prevDesc = function() {
  if (currentDescription > 0) {
    currentDescription--;
    displayDescription();
  }
};

updateCounter = function() {
  imgNum.value = parseInt(sectionsPointer) + 1 + ' / ' + contentCount;
};

// helper to fill the navigation with info
// string concat
fillNavigation = function() {
  var content, i, j, k, l, len, len1, navString, ref, ref1, runningCounter, section;
  navString = '<ul>';
  runningCounter = 0;
  ref = json.sections;
  for (i = k = 0, len = ref.length; k < len; i = ++k) {
    section = ref[i];
    navString += '<li><details><summary>';
    navString += section.title;
    navString += '</summary><ul>';
    ref1 = section.contents;
    for (j = l = 0, len1 = ref1.length; l < len1; j = ++l) {
      content = ref1[j];
      navString += '<li onclick="jumpTo(';
      navString += runningCounter++;
      navString += ')">';
      navString += content.title;
      navString += '</li>';
    }
    navString += '</ul></details>';
  }
  navString += '</ul>';
  document.getElementById('navscroll').innerHTML = navString;
};

// jump to selected slide from navigation menu
jumpTo = function(running) {
  var calcIndices, i, ind;
  sectionsPointer = running;
  i = 1;
  calcIndices = function(r) {
    var k, len, ref, s, sec;
    ref = json.sections;
    for (s = k = 0, len = ref.length; k < len; s = ++k) {
      sec = ref[s];
      if (sec.contents.length > r) {
        return [s, r];
      }
      r -= sec.contents.length;
    }
  };
  ind = calcIndices(running);
  currentSection = ind[0];
  currentContent = ind[1];
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
