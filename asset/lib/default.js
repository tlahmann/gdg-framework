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
    var string = '<ul>';
    var c = 0;

    for (var i = 0; i < json.DOKU.ABSCHNITT.length; i++) {
        string += '<li><details><summary>';
        string += json.DOKU.ABSCHNITT[i]['@attributes']['titel']
        string += '</summary><ul>';
        if (json.DOKU.ABSCHNITT[i].INHALT.length > 0) {
            for (var j = 0; j < json.DOKU.ABSCHNITT[i].INHALT.length; j++) {
                string += '<li data-link=\"';
                string += c + ':' + i + ',' + j + '\"';
                string += 'onclick=\"jumpTo(this)\">';
                string += json.DOKU.ABSCHNITT[i].INHALT[j]['@attributes']['titel'];
                string += '</li>';
                c++;
            }
        } else {
            string += '<li data-link=\"';
            string += c + ':' + i + ',' + j + '\"';
            string += 'onclick=\"jumpTo(this)\">';
            string += json.DOKU.ABSCHNITT[i].INHALT['@attributes']['titel'];
            string += '</li>';
            c++;
        }
        string += '</ul></details>';
    }
    string += '</ul>';
    document.getElementById("navscroll").innerHTML = string;
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
    section = jump[0];
    content = jump[1];

    sectionsPointer = data[0];

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

/* SIMPLEBAR */
; (function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory($, window, document, undefined));
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(require('jquery'), window, document, undefined);
    } else {
        // Browser globals:
        factory(window.jQuery, window, document, undefined);
    }
}(function ($, window, document, undefined) {


    /**
     * Calculate scrollbar width
     *
     * Called only once as a constant variable: we assume that scrollbar width never change
     * 
     * Original function by Jonathan Sharp:
     * http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php
     */
    var SCROLLBAR_WIDTH = scrollbarWidth();

    function scrollbarWidth() {
        // Append a temporary scrolling element to the DOM, then measure
        // the difference between its outer and inner elements.
        var tempEl = $('<div class="scrollbar-width-tester" style="width:50px;height:50px;overflow-y:scroll;top:-200px;left:-200px;"><div style="height:100px;"></div>'),
            width = 0,
            widthMinusScrollbars = 0;

        $('body').append(tempEl);

        width = $(tempEl).innerWidth(),
        widthMinusScrollbars = $('div', tempEl).innerWidth();

        tempEl.remove();

        return (width - widthMinusScrollbars);
    }



    // SimpleBar Constructor
    function SimpleBar(element, options) {
        this.el = element,
        this.$el = $(element),
        this.$track,
        this.$scrollbar,
        this.dragOffset,
        this.flashTimeout,
        this.$contentEl = this.$el,
        this.$scrollContentEl = this.$el,
        this.scrollDirection = 'vert',
        this.scrollOffsetAttr = 'scrollTop',
        this.sizeAttr = 'height',
        this.scrollSizeAttr = 'scrollHeight',
        this.offsetAttr = 'top';

        this.options = $.extend({}, SimpleBar.DEFAULTS, options);

        this.init();
    }

    SimpleBar.DEFAULTS = {
        wrapContent: true,
        autoHide: true
    };

    SimpleBar.prototype.init = function () {
        // If scrollbar is a floating scrollbar, disable the plugin
        if (SCROLLBAR_WIDTH === 0) {
            this.$el.css('overflow', 'auto');

            return;
        }

        if (this.$el.data('simplebar-direction') === 'horizontal' || this.$el.hasClass('simplebar horizontal')) {
            this.scrollDirection = 'horiz';
            this.scrollOffsetAttr = 'scrollLeft';
            this.sizeAttr = 'width';
            this.scrollSizeAttr = 'scrollWidth';
            this.offsetAttr = 'left';
        }

        if (this.options.wrapContent) {
            this.$el.wrapInner('<div class="simplebar-scroll-content"><div class="simplebar-content"></div></div>');
        }

        this.$contentEl = this.$el.find('.simplebar-content');

        this.$el.prepend('<div class="simplebar-track"><div class="simplebar-scrollbar"></div></div>');
        this.$track = this.$el.find('.simplebar-track');
        this.$scrollbar = this.$el.find('.simplebar-scrollbar');

        this.$scrollContentEl = this.$el.find('.simplebar-scroll-content');

        this.resizeScrollContent();

        if (this.options.autoHide) {
            this.$el.on('mouseenter', $.proxy(this.flashScrollbar, this));
        }

        this.$scrollbar.on('mousedown', $.proxy(this.startDrag, this));
        this.$scrollContentEl.on('scroll', $.proxy(this.startScroll, this));

        this.resizeScrollbar();

        if (!this.options.autoHide) {
            this.showScrollbar();
        }
    };


    /**
     * Start scrollbar handle drag
     */
    SimpleBar.prototype.startDrag = function (e) {
        // Preventing the event's default action stops text being
        // selectable during the drag.
        e.preventDefault();

        // Measure how far the user's mouse is from the top of the scrollbar drag handle.
        var eventOffset = e.pageY;
        if (this.scrollDirection === 'horiz') {
            eventOffset = e.pageX;
        }
        this.dragOffset = eventOffset - this.$scrollbar.offset()[this.offsetAttr];

        $(document).on('mousemove', $.proxy(this.drag, this));
        $(document).on('mouseup', $.proxy(this.endDrag, this));
    };


    /**
     * Drag scrollbar handle
     */
    SimpleBar.prototype.drag = function (e) {
        e.preventDefault();

        // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
        var eventOffset = e.pageY,
            dragPos = null,
            dragPerc = null,
            scrollPos = null;

        if (this.scrollDirection === 'horiz') {
            eventOffset = e.pageX;
        }

        dragPos = eventOffset - this.$track.offset()[this.offsetAttr] - this.dragOffset;
        // Convert the mouse position into a percentage of the scrollbar height/width.
        dragPerc = dragPos / this.$track[this.sizeAttr]();
        // Scroll the content by the same percentage.
        scrollPos = dragPerc * this.$contentEl[0][this.scrollSizeAttr];

        this.$scrollContentEl[this.scrollOffsetAttr](scrollPos);
    };


    /**
     * End scroll handle drag
     */
    SimpleBar.prototype.endDrag = function () {
        $(document).off('mousemove', this.drag);
        $(document).off('mouseup', this.endDrag);
    };


    /**
     * Resize scrollbar
     */
    SimpleBar.prototype.resizeScrollbar = function () {
        if (SCROLLBAR_WIDTH === 0) {
            return;
        }

        var contentSize = this.$contentEl[0][this.scrollSizeAttr],
            scrollOffset = this.$scrollContentEl[this.scrollOffsetAttr](), // Either scrollTop() or scrollLeft().
            scrollbarSize = this.$track[this.sizeAttr](),
            scrollbarRatio = scrollbarSize / contentSize,
            // Calculate new height/position of drag handle.
            // Offset of 2px allows for a small top/bottom or left/right margin around handle.
            handleOffset = Math.round(scrollbarRatio * scrollOffset) + 2,
            handleSize = Math.floor(scrollbarRatio * (scrollbarSize - 2)) - 2;


        if (scrollbarSize < contentSize) {
            if (this.scrollDirection === 'vert') {
                this.$scrollbar.css({ 'top': handleOffset, 'height': handleSize });
            } else {
                this.$scrollbar.css({ 'left': handleOffset, 'width': handleSize });
            }
            this.$track.show();
        } else {
            this.$track.hide();
        }
    };


    /**
     * On scroll event handling
     */
    SimpleBar.prototype.startScroll = function (e) {
        // Simulate event bubbling to root element
        this.$el.trigger(e);

        this.flashScrollbar();
    };


    /**
     * Flash scrollbar visibility
     */
    SimpleBar.prototype.flashScrollbar = function () {
        this.resizeScrollbar();
        this.showScrollbar();
    };


    /**
     * Show scrollbar
     */
    SimpleBar.prototype.showScrollbar = function () {
        this.$scrollbar.addClass('visible');

        if (!this.options.autoHide) {
            return;
        }
        if (typeof this.flashTimeout === 'number') {
            window.clearTimeout(this.flashTimeout);
        }

        this.flashTimeout = window.setTimeout($.proxy(this.hideScrollbar, this), 1000);
    };


    /**
     * Hide Scrollbar
     */
    SimpleBar.prototype.hideScrollbar = function () {
        this.$scrollbar.removeClass('visible');
        if (typeof this.flashTimeout === 'number') {
            window.clearTimeout(this.flashTimeout);
        }
    };


    /**
     * Resize content element
     */
    SimpleBar.prototype.resizeScrollContent = function () {
        var is_firefox = /firefox/i.test(navigator.userAgent);
        if (!is_firefox) {
            return;
        }
        if (this.scrollDirection === 'vert') {
            this.$scrollContentEl.width(this.$el.width() + SCROLLBAR_WIDTH);
            this.$scrollContentEl.height(this.$el.height());
        } else {
            this.$scrollContentEl.width(this.$el.width());
            this.$scrollContentEl.height(this.$el.height() + SCROLLBAR_WIDTH);
        }
    };


    /**
     * Recalculate scrollbar
     */
    SimpleBar.prototype.recalculate = function () {
        this.resizeScrollContent();
        this.resizeScrollbar();
    };


    /**
     * Getter for original scrolling element
     */
    SimpleBar.prototype.getScrollElement = function () {
        return this.$scrollContentEl;
    };


    /**
     * Getter for content element
     */
    SimpleBar.prototype.getContentElement = function () {
        return this.$contentEl;
    };


    /**
     * Data API
     */
    $(window).on('load', function () {
        $('[data-simplebar-direction]').each(function () {
            $(this).simplebar();
        });
    });


    /**
     * Plugin definition
     */
    var old = $.fn.simplebar;

    $.fn.simplebar = function (options) {
        var args = arguments,
            returns;

        // If the first parameter is an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (typeof options === 'undefined' || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'simplebar')) { $.data(this, 'simplebar', new SimpleBar(this, options)); }
            });

            // If the first parameter is a string
            // treat this as a call to a public method.
        } else if (typeof options === 'string') {
            this.each(function () {
                var instance = $.data(this, 'simplebar');

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof SimpleBar && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                    $.data(this, 'simplebar', null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };

    $.fn.simplebar.Constructor = SimpleBar;


    /**
     * No conflict
     */
    $.fn.simplebar.noConflict = function () {
        $.fn.simplebar = old;
        return this;
    };

}));

