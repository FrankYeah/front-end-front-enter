/* loading Page */
function loadingPage(){
    app.get("#loadingPage").style.height = "0";
    app.get("#loadingPage").style.opacity = "0.9";
    app.get("#loadingDraw").style.height = "0";
    app.get("#loadingDraw").style.opacity = "0.9";
    app.get("#header").style.marginTop = "0px";
    app.get("#asideBtnContainer").style.animation = "asideBtnMove 1.5s 0s ease 1 alternate running";
}
setTimeout("loadingPage()", 900);

/* searchBar
    /* searchBar layout */
    let search_btn = false;
    function search(){

        if(search_btn == false){
            app.get("#searchBar").style.display = "block";
            search_btn = true;

        }else{
            app.get("#searchBar").style.display = "none";
            search_btn = false;
        }
    }

    function fullSearchClick(){
        app.get("#searchBar").style.display = "none";
            search_btn = false;
    }


/* search Mic */
    var transcript;
    app.get("#searchMic").onclick = function(){
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
        app.get("#searchInput").setAttribute("value",transcript);
    });


    /* search click */
    app.get("#searchSearch").onclick = function(){
        searchIndex = app.get("#searchInput").value;
        if(!searchIndex){
            alert("請輸入文字");
        }else{
            window.location = 'article.html?id='+ searchIndex; 
        }
    }
    
    /* enter on searchInput trigger search click */
    var input = app.get("#searchInput");
    input.onkeypress = (event) => {
        if(event.keyCode == 13){
            event.preventDefault();
            app.get("#searchSearch").click();
        }
    }
    
/* test layout */

    getTestLayout();
    
    function getTestLayout(){
        
        app.createElement("div","test_layout","testLayout","body","","");
        app.createElement("div","test_container","testContainer","testLayout","","");
        app.createElement("p","test_header","testHeader","testContainer","測驗說明","");
        app.createElement("p","test_preface","testPreface","testContainer","點選「開始測驗」後，系統將根據你的回答，找出最適合你的學習環境，並顯示有多少百分比的合適度。","");
        app.createElement("p","test_start_btn","testStartBtn","testContainer","開始測驗","");
        
        app.get("#testLayout").addEventListener("click", (e) =>{
            if(e.eventPhase == 2){
                testClick();
            }
        })
    }


    testLayoutClick = false;
    function testClick(){
        if(testLayoutClick == false){
            app.get("#testLayout").style.display = "flex";
            testLayoutClick = true;
        }else{
            app.get("#testLayout").style.display = "none";
            testLayoutClick = false;
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



   
    
