$(function() {
    $.scrollify({
        section : "section",
        scrollbars: false,
        sectionName : "section-name",
        before:function(i){
            console.log(i);
            if(i != 0 && navbar != null){
                if(changeOfNav){
                    navbar.style.display = "block";
                    navSlideIn();
                    mainCon.style.position = "relative";
                    mainCon.style.left = navbar.offsetWidth + "px";
                    mainCon.style.width = screen.width - navbar.offsetWidth + "px";
                }

                if(i == 2){
                }
                
                changeOfNav =false;
                var LIs = document.getElementById("SideBar").getElementsByTagName("li");
                for(var a = 0; a < LIs.length; a++){
                    LIs[a].style.opacity = "0.5";
                }
                LIs[i-1].style.opacity = "1";
            } else if(i == 0){
                navSlideOut();

                if(changeOfNav){
                    changeOfNav = false;
                } else{
                    changeOfNav = true;
                }
            }
        }
    });
});

function smoothScrollFun(nameInput){
    finalIn = "#" + nameInput;
    $.scrollify.move(finalIn);
}

var theTextElem;
var scrollLanDiv;
var originalScrollContent;
var PreviousscrollLeft = -1;
var languageImage;
var mainCon;
var changeOfNav = true;
var bracketSVG;

var navbar;
var sticky;

function sideNavFun() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

function onBodyResize(){
    console.log("RESIZE");
    mainCon.style.position = "relative";
    mainCon.style.left = navbar.offsetWidth + "px";
    mainCon.style.width = screen.width - navbar.offsetWidth + "px";
    responsiveBrackForPortfolio(250, false);
}

window.onscroll = function() {
    sideNavFun();
};

window.onload = function() {
    theTextElem = document.getElementById("helloWorldTxt");

    navbar = document.getElementById("SideBar");
    sticky = navbar.offsetTop;
    mainCon = document.getElementById("content");
    scrollLanDiv = document.getElementById("languageDiv");
    languageImage = document.getElementsByClassName("language");
    bracketSVG = document.getElementById("BracketPortfolioSVG");
    originalScrollContent = scrollLanDiv.innerHTML;

    for(var i = 0; i < 3; i++){
        scrollLanDiv.innerHTML = scrollLanDiv.innerHTML + scrollLanDiv.innerHTML;
    }

    responsiveBrackForPortfolio(250, true);
    pageScrollTimeOut(500, 1);
    typeHelloWorld("Hello World!");
};

function responsiveBrackForPortfolio(l, firstTime){
    var itemIncrement = 0;
    var latestDistanceX = 0;
    var latestDistanceY = 0;
    var isSecondRow = false;
    for(var i = 0; i < 8*2; i = i = i+2){
        if(firstTime){
            bracketSVG.innerHTML = bracketSVG.innerHTML + "<polyline points='0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0'/><image class='portfolioImages' xlink:href='PortfolioImages/PortfolioSite.png' width=0 height=0 /><polyline points='0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0'/>";
        }

        var divWidth = document.getElementById("PortfolioID").offsetWidth;
        var topAndBottomBrack = 0.25 * l;
        var h = l;
        var bracketTipLen = document.getElementById("PortfolioID").offsetWidth * (30/1920);

        if( latestDistanceX+l+2*bracketTipLen > screen.width){
            latestDistanceY = l + bracketTipLen;
            latestDistanceX = 0;
            bracketSVG.style.height = l*2 + bracketTipLen +3 + "px";
        } else{
            console.log(latestDistanceX);
            console.log("HERE " + latestDistanceX+l+2*bracketTipLen);
        }

        var startingPoint = document.getElementById("PortfolioID").offsetWidth * (50/1920) + latestDistanceX;
        var polylineL = bracketSVG.getElementsByTagName("polyline")[i];
        var polylineR = bracketSVG.getElementsByTagName("polyline")[i+1];
        console.log(startingPoint);

        polylineL.points[0].x = topAndBottomBrack+startingPoint;
        polylineL.points[0].y = 0+latestDistanceY;
        polylineL.points[1].x = startingPoint;
        polylineL.points[1].y = 0+latestDistanceY;
        polylineL.points[2].x = startingPoint;
        polylineL.points[2].y = 0.4 * h + latestDistanceY;
        polylineL.points[3].x = startingPoint-bracketTipLen;
        polylineL.points[3].y = 0.5 * h + latestDistanceY;
        polylineL.points[4].x = startingPoint;
        polylineL.points[4].y = 0.6 * h + latestDistanceY;
        polylineL.points[5].x = startingPoint;
        polylineL.points[5].y = h + latestDistanceY;
        polylineL.points[6].x = topAndBottomBrack+startingPoint;
        polylineL.points[6].y = h + latestDistanceY;
        polylineL.style = "fill:none;stroke:white;stroke-width:3;margin-top:0px; margin-bottom:0px;margin-left:0px;margin-right:0px;";

        var imageClass = document.getElementsByClassName("portfolioImages");
    
        imageClass[itemIncrement].height.baseVal.value = 200;
        imageClass[itemIncrement].width.baseVal.value = 200;
        imageClass[itemIncrement].y.baseVal.value = (h-imageClass[0].height.baseVal.value)/2 + latestDistanceY;
        imageClass[itemIncrement].x.baseVal.value = startingPoint+(h-imageClass[0].height.baseVal.value)/2;

        var startingPoint2 = topAndBottomBrack+startingPoint + (l-(topAndBottomBrack * 2));
        polylineR.points[0].x = startingPoint2;
        polylineR.points[0].y = 0 + latestDistanceY;
        polylineR.points[1].x = startingPoint2+topAndBottomBrack;
        polylineR.points[1].y = 0 + latestDistanceY;
        polylineR.points[2].x = startingPoint2+topAndBottomBrack;
        polylineR.points[2].y = 0.4 * h + latestDistanceY;
        polylineR.points[3].x = startingPoint2+topAndBottomBrack+bracketTipLen;
        polylineR.points[3].y = 0.5 * h + latestDistanceY;
        polylineR.points[4].x = startingPoint2+topAndBottomBrack;
        polylineR.points[4].y = 0.6 * h + latestDistanceY;
        polylineR.points[5].x = startingPoint2+topAndBottomBrack;
        polylineR.points[5].y = h + latestDistanceY;
        polylineR.points[6].x = startingPoint2;
        polylineR.points[6].y = h + latestDistanceY;
        polylineR.style = "fill:none;stroke:white;stroke-width:3";

        latestDistanceX = polylineR.points[3].x;
        
        itemIncrement++;
    }
}

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
    var id = setInterval(frame, 1);
    function frame() {
      if (pos == navbar.offsetWidth) {
        clearInterval(id);
      } else {
        pos++;
        navbar.style.transform = "translateX(-" + pos + "px)";
      }
    }
  }

  function navSlideIn() {
    var pos = -navbar.offsetWidth;
    var id = setInterval(frame, 1);
    function frame() {
      if (pos == 0) {
        clearInterval(id);
      } else {
        pos++;
        navbar.style.transform = "translateX(" + pos + "px)";
      }
    }
  }

//pageScroll() was inspired by jdgregson (https://stackoverflow.com/questions/49968622/auto-scroll-a-horizontal-div)
function pageScroll() {
    self.setInterval(() => {
        scrollLanDiv.scrollTo(scrollLanDiv.scrollLeft+1, 0);
        if(scrollLanDiv.scrollLeft == PreviousscrollLeft){
            PreviousscrollLeft = 0;
            scrollLanDiv.scrollTo(scrollLanDiv.scrollLeft-scrollLanDiv.scrollLeft,0);
        } else{
            PreviousscrollLeft = scrollLanDiv.scrollLeft;
        }
    }, 50);
}

function pageScrollTimeOut(sleepMS, iteration){
    sleep(sleepMS * iteration).then(() =>{
        pageScroll();
        pageScrollTimeOut(sleepMS, iteration + 1)
    })
}

