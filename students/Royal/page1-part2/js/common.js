/* loading Page */
function loadingPage(){
    document.getElementById("loadingPage").style.height = "0";
    document.getElementById("loadingPage").style.opacity = "0.9";
    document.getElementById("loadingDraw").style.height = "0";
    document.getElementById("loadingDraw").style.opacity = "0.9";
    document.getElementById("header").style.marginTop = "0px";
    document.getElementById("indexTestBtnContainer").style.animation = "indexTestBtnMove 1.5s 0s ease 1 alternate running";
}
setTimeout("loadingPage()", 900);

/* searchBar layout */
var search_btn = false;
function search(){

    if(search_btn == false){
        document.getElementById("searchBar").style.display = "block";
        search_btn = true;

    }else{
        document.getElementById("searchBar").style.display = "none";
        search_btn = false;
    }
}

function fullSearchClick(){
    document.getElementById("searchBar").style.display = "none";
        search_btn = false;
}

/* back to top */
let timer = null;
function backToTop(){
    timer = setInterval(()=>{
        let osTop = document.documentElement.scrollTop || document.body.scrollTop;
        let speed = Math.floor(-osTop / 8);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
        if(osTop == 0){
            clearInterval(timer);
        }
    }, 30);
}
   
    
