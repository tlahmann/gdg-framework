var i = 1;

function timedCount() {
    i = i + 1;
    postMessage(i);
    console.log(i);
    setTimeout("timedCount()", 500);
    if (i > 7)
        i = 1;
}

timedCount();
