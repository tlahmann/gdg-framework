### 
    Grundlagen der Gestaltung Framework
    Univerität Ulm
    Institut für Medienforschung und -entwicklung
    Tobias Lahmann
###

json = undefined
currentSection = 0
currentContent = 0
currentDescription = 0
contentCount = 0
sectionsPointer = 0
lock = true

@launchIntoWindowed = ->
  $('#intro').css 'opacity', 0
  $('#intro').css 'zIndex', 0
  $('#doku').css 'opacity', 1
  lock = false
  return

@launchIntoFullscreen = (element) ->
  if element.requestFullscreen
    element.requestFullscreen()
  else if element.mozRequestFullScreen
    element.mozRequestFullScreen()
  else if element.webkitRequestFullscreen
    element.webkitRequestFullscreen()
  else if element.msRequestFullscreen
    element.msRequestFullscreen()
  launchIntoWindowed()
  return

# load JSON Data into the program
$ ->
  json = doku
  contentCount = json.sections.reduce ((acc, curr) -> 
    acc + (curr.contents || []).length
  ), 0
  fillNavigation()
  $('#navscroll').simplebar()
  $('#description').append '<h4 id="descTitle">desctitle</h4><p id="descText">desc</p>'
  $('#description').simplebar()
  document.getElementById('sN').textContent = json.studentName
  pos = window.location.hash.substr(1);
  if +pos != 0
    jumpTo(+pos-1)
    launchIntoWindowed()
  redraw()
  return

redraw = ->
  document.location.hash = parseInt(sectionsPointer) + 1
  displayPicture()
  displayDescription()
  updateCounter()
  return

# function to change the picture being shown

displayPicture = ->
  con = json.sections[currentSection].contents[currentContent]

  switch con.type
    when 'image' 
      # display picture
      $('#contentImg').css 'display', 'block'
      # set the image
      document.getElementById('contentImg').src = con.source
      # hide other sections
      $('#contentAnim').css 'display', 'none'
      $('#canvas').css 'display', 'none'
      $('#flashCanvas').css 'display', 'none'
      pauseAnimation()
    when 'animation' 
      # initialize the animation and start animating
      initialize(con.source)
      playAnimation()
      # display the animation
      $('#contentAnim').css 'display', 'block'
      $('#canvas').css 'display', 'block'
      # hide other sections
      $('#contentImg').css 'display', 'none'
      $('#flashCanvas').css 'display', 'none'
    when 'flash' 
      # display the flash element (<embed>)
      source = con.source
      game = document.getElementById('flashCanvas')
      clone = game.cloneNode(true)
      clone.setAttribute 'src', source
      game.parentNode.replaceChild clone, game
      $('#flashCanvas').css 'display', 'block'
      # hide other sections
      $('#contentImg').css 'display', 'none'
      $('#contentAnim').css 'display', 'none'
      $('#canvas').css 'display', 'none'
      pauseAnimation()
    else break
  
  $('input[name = \'borderListener\']').prop 'checked', con.border == 'on'
  triggerBorder()
  return

# function to change the description

displayDescription = ->
  con = json.sections[currentSection].contents[currentContent]
  # set the title of the image description (top of aside) to the title of the description
  $('#descTitle').text con.title
  # if the desription is more than one page long the navigation for the description is shown
  if con.details.length > 1
    # set the description of the image (main area of the aside) to the description of the details node
    $('#descText').text con.details[currentDescription]
    #display the description counter
    $('#descNav').css 'display', 'block'
    $('#description').css 'border-color', '#7a7a80'
    # update the description counter
    descNum.innerHTML = currentDescription + 1 + ' / ' + con.details.length
  else
    # set the description of the image (main area of the aside) to the description of the details node
    $('#descText').text con.details[0]
    #hide the description counter
    $('#descNav').css 'display', 'none'
    $('#description').css 'border-color', '#FFF'
  return

# next image function

nextImg = ->
  if sectionsPointer < contentCount - 1
    sectionsPointer++
    if currentContent < json.sections[currentSection].contents.length - 1
      currentContent++
    else
      currentSection++
      currentContent = 0
    currentDescription = 0
    redraw()
  return

# previous image function

prevImg = ->
  if sectionsPointer > 0
    sectionsPointer--
    if currentContent > 0
      currentContent--
    else
      currentSection--
      currentContent = json.sections[currentSection].contents.length - 1
    currentDescription = 0
    redraw()
  return

# next description function

nextDesc = ->
  if currentDescription < json.sections[currentSection].contents[currentContent].details.length - 1
    currentDescription++
    displayDescription()
  return

# previous description function

prevDesc = ->
  if currentDescription > 0
    currentDescription--
    displayDescription()
  return

###  region HELPER ###

updateCounter = ->
  imgNum.value = parseInt(sectionsPointer) + 1 + ' / ' + contentCount
  return

# helper to fill the navigation with info
# string concat

fillNavigation = ->
  navString = '<ul>'
  runningCounter = 0
  for section, i in json.sections
    navString += '<li><details><summary>'
    navString += section.title
    navString += '</summary><ul>'
    for content, j in section.contents
      navString += '<li onclick="jumpTo('
      navString += (runningCounter++)
      navString += ')">'
      navString += content.title
      navString += '</li>'
    navString += '</ul></details>'
  navString += '</ul>'
  document.getElementById('navscroll').innerHTML = navString
  return

# jump to selected slide from navigation menu

jumpTo = (running) ->
  sectionsPointer = running
  i = 1
  calcIndices = (r) ->
    for sec, s in json.sections
      return [s, r] if sec.contents.length > r
      r -= sec.contents.length
  ind = calcIndices running
  currentSection = ind[0]
  currentContent = ind[1]
  redraw()
  return

# function to change the border color of the displayed object (& others)
# the border is always shown and just the color is changed (grey <-> white)
# to prevent the rendering engine from moving the obj by 1px (borderwidth)

triggerBorder = ->
  if $('#borderListener').is(':checked')
    $('input[name = \'borderListener\']').prop 'checked', true
    $('#contentImg').css 'border-color', 'rgb(122,122,128)'
    $('#canvas').css 'border-color', 'rgb(122,122,128)'
    $('#flashCanvas').css 'border-color', 'rgb(122,122,128)'
  else
    $('input[name = \'borderListener\']').prop 'checked', false
    $('#contentImg').css 'border-color', '#FFF'
    $('#canvas').css 'border-color', '#FFF'
    $('#flashCanvas').css 'border-color', '#FFF'
  return

# listener function to navigate via arrow keys
$(document).keydown (e) ->
  if !lock
    if (e.keyCode or e.which) == 37 or (e.keyCode or e.which) == 38
      # left
      prevImg()
    else if (e.keyCode or e.which) == 39 or (e.keyCode or e.which) == 40
      # right
      nextImg()
  if (e.keyCode or e.which) == 13
    document.getElementById('blur').focus()
  return

# prevent the navigation menu from closing when the mouse is over the area
# close the navigation menu when the mouse leaves area (delay 1000ms)
$('#navigation').on('mouseenter', ->
  clearTimeout $.data(this, 'timer')
  $('#navigation').stop true, true
  return
).on 'mouseleave', ->
  $.data this, 'timer', setTimeout((->
    if $('#navTrigger').is(':checked')
      $('#navigation').stop(true, true).css 'left', '-284px'
      $('#navTriggerText').toggleClass 'triggered'
      $('input[name = \'navTrigger\']').prop 'checked', false
    return
  ), 1000)
  return
# listener to open the navigation
$('input[name=\'navTrigger\']').change ->
  if $(this).is(':checked')
    $('#navigation').css 'left', 0
    $('#navTriggerText').toggleClass 'triggered'
  else
    $('#navigation').css 'left', '-284px'
    $('#navTriggerText').toggleClass 'triggered'
  return
