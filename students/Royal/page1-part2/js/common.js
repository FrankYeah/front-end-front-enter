/* loading Page */
function loadingPage(){
    document.getElementById("loadingPage").style.height = "0";
    document.getElementById("loadingPage").style.opacity = "0.9";
    document.getElementById("loadingDraw").style.height = "0";
    document.getElementById("loadingDraw").style.opacity = "0.9";
    document.getElementById("header").style.marginTop = "0px";
    document.getElementById("asideBtnContainer").style.animation = "asideBtnMove 1.5s 0s ease 1 alternate running";
}
setTimeout("loadingPage()", 900);

/* searchBar
    /* searchBar layout */
    let search_btn = false;
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

var transcript;
    /* search Mic */
    document.getElementById("searchMic").onclick = function(){
        searchMic();
        
    }
    
    function searchMic(){
        recognition.start();
    }
    
    /* search Mic */
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.addEventListener('result', e => {
         transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("")
        document.getElementById("searchInput").setAttribute("value",transcript);
    });


    /* search click */
    document.getElementById("searchSearch").onclick = function(){
        searchIndex = document.getElementById("searchInput").value;
        if(!searchIndex){
            alert("請輸入文字");
        }else{
            window.location = 'article.html?id='+ searchIndex; 
        }
    }
    
    /* enter on searchInput trigger search click */
    var input = document.getElementById("searchInput");
    input.onkeypress = (event) => {
        if(event.keyCode == 13){
            event.preventDefault();
            document.getElementById("searchSearch").click();
        }
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



   
    
