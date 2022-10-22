// shuffle
function shuffleList(list) {
    var length = listToArr(list).length;
    for (var i = 0; i <= length; i++) {
        var tempIndex = Math.round(Math.random() * length);
        var tempItem = list.item(i);
        var tempItem2 = list.item(tempIndex);
        swap(tempItem, tempItem2);
    }
}
// swap
function swap(element1, element2) {
    if (element1 != null && element2 != null) {
        var id1 = parseInt(element1.textContent);
        var id2 = parseInt(element2.textContent);
        element2.setAttribute("data-block", id1);
        element2.innerHTML = id1;
        element1.setAttribute("data-block", id2);
        element1.innerHTML = id2;
        removeClass(element1, "match");
        removeClass(element2, "match");
    }
}
// convert list to array
function listToArr(elements) {
    let response = [];
    elements.forEach(function(element, key) {
        response.push(parseInt(element.textContent));
    });
    return response;
}
// remove classes
function removeClasses(list, cls) {
    list.forEach(function(element, key) {
        element.classList.remove(cls);
    });
}
// remove class
function removeClass(element, cls) {
    if (element != null) {
        element.classList.remove(cls);
    }
}
// add class
function addClass(element, cls) {
    if (element != null) {
        element.classList.add(cls);
    }
}
// some nice lines
function drawLine(currentLocation, ToLocation) {
    if (currentLocation >= elements.length) {
        currentLocation = elements.length;
    }
    if (ToLocation >= elements.length) {
        ToLocation = elements.length - 1;
    }
    var calc = parseInt((ToLocation - currentLocation + 1) * length) + "px";
    if (document.querySelector(".drawFrom") != null) {
        document.querySelector(".drawFrom").style.setProperty("--width", calc);
    } else {
        removeClasses(list, "drawTo");
    }
}


shuffleList(document.querySelectorAll("li"));
var list     = document.querySelectorAll("li");
var elements = listToArr(list);
var index    = 0;
var inner    = 1;
var length   = 49;
var cMax     = 0;
var cMin     = null;
var dynamicIndex = 0;

function UpperProcess(list) {
    if (index <= elements.length) {
        removeClasses(list, "drawFrom");
        addClass(list[index], "drawFrom");
        cMax = parseInt(list[index].textContent);
        InnerProcess(list);
        if (document.querySelector(".drawFrom") != null) {
            document.querySelector(".drawFrom").style.setProperty("--width", "0px");
        } else {
            removeClasses(list, "drawTo");
            document.querySelector(".sSort").removeAttribute("disabled");
            document.querySelector(".sSort").innerHTML = "Sort";
        }
        if (index == elements.length - 1) {
            document.querySelector(".drawFrom").style.setProperty("--width", "0px");
            removeClasses(list, "drawTo");
            removeClasses(list, "drawFrom");
            document.querySelector(".sSort").removeAttribute("disabled");
            document.querySelector(".sSort").innerHTML = "Sort";
        }
        index++;
    } else {
        return false;
    }
}
//InnerProcess function
function InnerProcess(list) {
    if (index >= elements.length && inner >= elements.length) {
        return false;
    }
    drawLine(index, inner);
    var innerInterv = setInterval(function() {
        if (inner < elements.length) {
            drawLine(index, inner);
            removeClasses(list, "drawTo");
            addClass(list[inner], "drawTo");
            if (cMin == null) {
                cMin = parseInt(list[inner].textContent);
            }
            if (parseInt(list[inner].textContent) < cMin) {
                cMin = parseInt(list[inner].textContent);
            }
            inner++;
        } else {
            inner = index + 1;
            clearInterval(innerInterv);
            if (index < elements.length) {
                var tempMax = document.querySelectorAll(".block").item(dynamicIndex);
                var tempMin = document.querySelector(
                        ".block[data-block='" + cMin + "']"
                        );
                cMin = null;
                dynamicIndex++;
                if (parseInt(tempMax.textContent) > parseInt(tempMin.textContent)) {
                    removeClasses(list, "drawTo");
                    removeClasses(list, "drawFrom");
                    addClass(tempMin, "match");
                    addClass(tempMax, "match");

                    setTimeout(swap, 250, tempMin, tempMax);
                }
                UpperProcess(list);
            } else {
                return false;
            }
        }
    }, 700);
}

document.querySelector(".sSort").addEventListener("click", function() {
    inner = 1;
    index = 0;
    dynamicIndex = 0;
    shuffleList(list);
    UpperProcess(list);
    this.setAttribute("disabled", "disabled");
    this.innerHTML = "Sorting...";
});

//setTimeout Functions
setTimeout(function() {
    document.querySelector(".sSort").click();
    }, 3000);