$(function() {
    $.scrollify({
        section : "section",
        scrollbars: false,
        sectionName : "section-name",
        before:function(i){
            console.log(i);
            if(i != 0 && navbar != null){
                console.log("Woo");
                if(changeOfNav){
                    console.log("YEEHAW");
                    navbar.style.display = "block";
                    navSlideIn();
                    mainCon.style.position = "relative";
                    mainCon.style.left = navbar.offsetWidth + "px";
                    mainCon.style.width = initContWidth - navbar.offsetWidth + "px";
                }
                changeOfNav =false;
            } else if(i == 0){
                navSlideOut();
                console.log("Change of Nav: " + changeOfNav);

                if(changeOfNav){
                    changeOfNav = false;
                } else{
                    changeOfNav = true;
                }
            }
        }
    });
});


function movingScrollFun(nameInput){
    finalIn = "#" + nameInput;
    console.log(finalIn);
    $.scrollify.move(finalIn);
}

var theTextElem;
var scrollLanDiv;
var languageImage;
var mainCon;
var changeOfNav = true;
var initContWidth;

var navbar;
var sticky;

function sideNavFun() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

window.onscroll = function() {
    sideNavFun();
};

window.onload = function() {
    theTextElem = document.getElementById("helloWorldTxt");

    navbar = document.getElementById("SideBar");
    sticky = navbar.offsetTop;
    mainCon = document.getElementsByClassName("content")[0];
    scrollLanDiv = document.getElementById("languageDiv");
    languageImage = document.getElementsByClassName("language");

    initContWidth = mainCon.offsetWidth;

    pageScroll();
    typeHelloWorld("Hello World!");
};

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function typeHelloWorldP1(time, theString, complete){
    const theTextElem = document.getElementById("helloWorldTxt");
    
    sleep(time).then(() => {
        var textStringRev = theTextElem.innerHTML.replace("|", "");
        theTextElem.innerHTML = textStringRev + theString + "|";
        if(complete){
            blinkingEffect(500, 1);
        }
    });
}

//"Hello World!" Typing Effect
function typeHelloWorld(theString){
    var isComplete = false;
    for(var i = 0; i < theString.length; i++){
        if(i == theString.length-1){
            isComplete = true;
        }
        typeHelloWorldP1(2500/theString.length * (i+1),theString.charAt(i), isComplete);
    }
}

function blinkingEffect(time, iteration){
    const theTextElem = document.getElementById("helloWorldTxt");
    const originalText = theTextElem.innerHTML.replace("|", "&nbsp");
    sleep(time).then(() => {
        theTextElem.innerHTML = originalText;
        sleep(time).then(() => {
            theTextElem.innerHTML = originalText.replace("&nbsp", "|");
            blinkingEffect(time*iteration, iteration++);
        })
    })
}

function navSlideOut() {
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
      if (pos == navbar.offsetWidth) {
        console.log("FINISHED");
        clearInterval(id);
      } else {
        pos++;
        navbar.style.transform = "translateX(-" + pos + "px)";
      }
    }
  }

  function navSlideIn() {
    var pos = -navbar.offsetWidth;
    var id = setInterval(frame, 5);
    function frame() {
      if (pos == 0) {
        console.log("FINISHED");
        clearInterval(id);
      } else {
        pos++;
        navbar.style.transform = "translateX(" + pos + "px)";
      }
    }
  }

//pageScroll() was inspired by jdgregson (https://stackoverflow.com/questions/49968622/auto-scroll-a-horizontal-div)
function pageScroll() {
    const langDivWidth = scroll.scrollWidth;
    self.setInterval(() => {
        if(scrollLanDiv.scrollLeft !== langDivWidth) {
            scrollLanDiv.scrollTo(scrollLanDiv.scrollLeft+1, 0);
        } else{
            scrollLanDiv.scrollTo(scrollLanDiv.scrollLeft-1, 0);
        }
      }, 15);
      scrollLanDiv.innerHTML = scrollLanDiv.innerHTML + scrollLanDiv.innerHTML;
}

