var requestURL = "https://front-enter.firebaseio.com/list.json";
var request = new XMLHttpRequest();
request.open("GET",requestURL,true);
//request.responseType = "json";
request.send();
var getData;
request.onload = function(){
    
    getData = JSON.parse(request.response);
    
}

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
    
/* aside button */
    app.createElement("a","aside_container", "asideBtnContainer","body","","");
    app.createElement("img","aside_btn","asideBtn","asideBtnContainer","","");
    app.get("#asideBtn").src = "images/FE_test_go.png";
    app.get("#asideBtn").addEventListener("click",(e)=>{
       testClick();
       
    });
    
/* test layout */

    app.card = 
        {first:{},
         question:{},
         final:{},
        }

    //    getTestLayout();
    function getTestLayout(){
        app.createElement("div","test_layout","testLayout","body","","");
        app.createElement("div","test_back_img","testBackImg","testLayout","","");
        app.createElement("div","test_back_color","testBackColor","testLayout","","");
        app.card.first.createFirst();
        
        /* make testLayOut none or flex */
        app.get("#testLayout").addEventListener("click", (e) =>{
            if(e.eventPhase == 2){
                testClick();
            }
        })
    }
 
    var cardData ={};
    var getSelectedOption;
    function testClick(){
        getSelectedOption =[];
//        bestMatch = 0;
        totalQuestion = 1;
        if(!app.get("#testLayout")){
            createMatchScore();
            getTestLayout();
            
        }else{
            var testLayout =  app.get("#testLayout");
            testLayout.parentNode.removeChild(testLayout);
        }
    }

    function createMatchScore(){
        for(i = 0; i < getData.length; i++){
           cardData[i] = 0;
        }
    }
    
    /* create card first */
    app.card.first.createFirst = function(){
        app.createElement("div","test_container","testContainer","testLayout","","");
        app.createElement("div","test_card","testCardFirst","testContainer","","");
        app.createElement("p","test_header","testHeader","testCardFirst","測驗說明","");
        app.createElement("p","test_preface","testPreface","testCardFirst","點選「開始測驗」後，系統將根據你的回答，找出最適合你的學習環境，並顯示有多少百分比的合適度。","");
        app.createElement("p","test_start_btn","testStartBtn","testCardFirst","開始測驗",app.card.question.createQuestionOne);
    }
    
    var totalQuestion = 1;
    /* questionOne */
    app.card.question.createQuestionOne = () =>{
        testCardFirst.parentNode.removeChild(testCardFirst);
        app.createElement("div","test_card","testCardQuestionOne","testContainer","","");
//        app.get("#testCardQuestionOne").setAttribute("name","city");
        app.createElement("p","test_question_title","testQuestionTitle","testCardQuestionOne","選擇在哪座城市學習?","");
        app.createElement("p","test_question_count","testQuestionCount","testCardQuestionOne",totalQuestion + "/5","");
        app.card.question.oneSelect("台北");
        app.card.question.oneSelect("台中");
        app.card.question.oneSelect("高雄");
        app.card.question.oneSelect("各地");
        app.card.question.oneSelect("不重要");
        totalQuestion++;
    }
    
    app.card.question.oneSelect = (oneSelect) =>{
        app.createElement("p","test_question_option","testQuestionOption1","testCardQuestionOne",oneSelect, app.card.question.createQuestionTwo);
    }
    
    /* questionTwo */
    app.card.question.createQuestionTwo = (e) =>{
        testCardQuestionOne.parentNode.removeChild(testCardQuestionOne);
        app.createElement("div","test_card","testCardQuestionTwo","testContainer","","");
//        app.get("#testCardQuestionTwo").setAttribute("name","fee");
        app.createElement("p","test_question_title","testQuestionTitle","testCardQuestionTwo","每月能撥出多少費用?","");
        app.createElement("p","test_question_count","testQuestionCount","testCardQuestionTwo",totalQuestion + "/5","");
        selectCount = 0;
        app.card.question.twoSelect("3000元以下",3000);
        app.card.question.twoSelect("6000元以內",6000);
        app.card.question.twoSelect("10000元以內",10000);
        app.card.question.twoSelect("10001元以上",10001);
        app.card.question.twoSelect("不重要","");
        getSelectedOption.push(e.target.textContent);
        totalQuestion++;
    }
    
    var selectCount;
    app.card.question.twoSelect = (twoSelect,fee) =>{
        app.createElement("p","test_question_option","testQuestionTwo" +selectCount,"testCardQuestionTwo",twoSelect,"");
        app.get("#testQuestionTwo" + selectCount ).setAttribute("data-feeCount",selectCount);
        app.get("#testQuestionTwo" + selectCount ).onclick = function(){
//            getFee = this.getAttribute("data-fee");
            getFeeCount = this.getAttribute("data-feeCount");
            
            getSelectedOption.push(getFeeCount);
            app.card.question.createQuestionThree();
        }
        selectCount++;
    }
    
    
    /* questionThree */
    app.card.question.createQuestionThree = (e) =>{
        testCardQuestionTwo.parentNode.removeChild(testCardQuestionTwo);
        app.createElement("div","test_card","testCardQuestionThree","testContainer","","");
//        app.get("#testCardQuestionThree").setAttribute("name","weekHour");
        app.createElement("p","test_question_title","testQuestionTitle","testCardQuestionThree","每月能撥出多少時間學習?","");
        app.createElement("p","test_question_count","testQuestionCount","testCardQuestionThree",totalQuestion + "/5","");
        selectCount = 0;
        app.card.question.threeSelect("16小時以下",16);
        app.card.question.threeSelect("30小時以內",30);
        app.card.question.threeSelect("45小時以內",45);
        app.card.question.threeSelect("46小時以上",46);
        app.card.question.threeSelect("不重要",);
        totalQuestion++;
    }
    
    app.card.question.threeSelect = (threeSelect,weekHourSelect) =>{
        app.createElement("p","test_question_option","testQuestionThree" + selectCount ,"testCardQuestionThree",threeSelect,"");
        app.get("#testQuestionThree" + selectCount ).setAttribute("data-weekHour",selectCount);
        app.get("#testQuestionThree" + selectCount ).onclick = function(){
            getWorkHourCount = this.getAttribute("data-weekHour");
            getSelectedOption.push(getWorkHourCount);
            app.card.question.createQuestionFour();
        }
        selectCount++;
    }
    
    /* questionFour */
    app.card.question.createQuestionFour = (e) =>{
        testCardQuestionThree.parentNode.removeChild(testCardQuestionThree);
        app.createElement("div","test_card","testCardQuestionFour","testContainer","","");
//        app.get("#testCardQuestionFour").setAttribute("name","classType");
        app.createElement("p","test_question_title","testQuestionTitle","testCardQuestionFour","對班制的需求是?","");
        app.createElement("p","test_question_count","testQuestionCount","testCardQuestionFour",totalQuestion + "/5","");
        app.card.question.fourSelect("大班制");
        app.card.question.fourSelect("小班制");
        app.card.question.fourSelect("一對一");
        app.card.question.fourSelect("不重要");
        totalQuestion++;
    }
    
    app.card.question.fourSelect = (fourSelect) =>{
        app.createElement("p","test_question_option","testQuestionOption4","testCardQuestionFour",fourSelect,app.card.question.createQuestionFive);
    }
    
    /* questionFive */
    app.card.question.createQuestionFive = (e) =>{
        testCardQuestionFour.parentNode.removeChild(testCardQuestionFour);
        app.createElement("div","test_card","testCardQuestionFive","testContainer","","");
//        app.get("#testCardQuestionFive").setAttribute("name","teachWay");
        app.createElement("p","test_question_title","testQuestionTitle","testCardQuestionFive","喜歡什麼樣的教學方式?","");
        app.createElement("p","test_question_count","testQuestionCount","testCardQuestionFive",totalQuestion + "/5","");
        app.card.question.fiveSelect("放養制");
        app.card.question.fiveSelect("手把手教制");
        app.card.question.fiveSelect("不重要");
        getSelectedOption.push(e.target.textContent);
        totalQuestion++;
    }
    
    app.card.question.fiveSelect = (fiveSelect) =>{
        app.createElement("p","test_question_option","testQuestionOption5","testCardQuestionFive",fiveSelect,app.card.final.createFinal);
    }
    
    /* create card final */
    app.card.final.createFinal = (e) =>{
        testCardQuestionFive.parentNode.removeChild(testCardQuestionFive);
        app.createElement("div","test_card","testCardFinal","testContainer","","");
        app.createElement("p","test_question_title","testQuestionTitle","testCardFinal","你有多適合下列學校?","");
        app.createElement("div","test_final_pie","testFinalPie","testCardFinal","","");
        app.createElement("p","test_final_pie_gradient","testFinalPieGradient","testCardFinal","" ,"");
        app.createElement("p","test_final_pie_border","testFinalPieBorder","testCardFinal","" ,"");
        getSelectedOption.push(e.target.textContent);
        getMatchData();
        getResultMatch(); 
        app.createElement("p","test_final_pie_percent","testFinalPiePercent","testFinalPie","10%","");
        app.createElement("a","test_final_link","testFinalLink","testCardFinal","","");
        app.createElement("p","test_final_result","testFinalResult","testFinalLink",getData[0]["name"],"");
        getRandomData();
        stopRandom();
        app.get("#testFinalLink").setAttribute("href","content.html?id=" + getData[resultHighestScore]["creatTime"]);
    }
    
    var bestMatch = 0;
    function getMatchData(){
        var feeRange  = [3000, 6000, 10000, 10001 ];
        var weeHourRange  = [16, 30, 45, 46];
        for(var i = 0; i < getData.length; i++){
            if(getFeeCount > 0){
                if( getData[i]["fee"] <= feeRange[getFeeCount] && getData[i]["fee"] > feeRange [getFeeCount-1]){
                    cardData[i] += 1;
                }
            }else{
                if( getData[i]["fee"] <= feeRange[getFeeCount]){
                cardData[i] += 1;    
                }
            } 
            
            if(getWorkHourCount > 0){
                if( getData[i]["weekHour"] <= weeHourRange[getWorkHourCount] && getData[i]["weekHour"] > weeHourRange[getWorkHourCount-1]){
                    cardData[i] += 1;
                }
            }else{
                if( getData[i]["weekHour"] <= weeHourRange[getWorkHourCount]){
                cardData[i] += 1;    
                }
            } 
            
            for(var j = 0; j < getSelectedOption.length; j++ ){
                 if(getSelectedOption[j] == getData[i]["city"]){
                     cardData[i] += 1;
                 }else if(getSelectedOption[j] == getData[i]["classType"]){
                     cardData[i] += 1;
                 }else if(getSelectedOption[j] == getData[i]["teachWay"]){
                     cardData[i] += 1;
                 }   
            }
            bestMatch = Math.max(bestMatch,cardData[i]);
        }
    }

    function getResultMatch(){
        cardData = Object.keys(cardData).sort(function(a,b){return cardData[b]-cardData[a]});
        resultHighestScore = cardData[0];
        resultHighestMatch = getData[resultHighestScore]["name"];
        return resultHighestMatch;
    }
    
    function getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
    };

    function getRandomData(){
        ramdomTimer = setInterval(()=>{
            randomPercent = Math.ceil(Math.random() * 100);
            randomResult = getRandom(0,8);
            app.get("#testFinalPiePercent").textContent =  randomPercent + "%";
            app.get("#testFinalResult").textContent =  getData[randomResult]["name"];
            
        },200)
    }

    function stopRandom(){
        stopTimer = setTimeout(()=>{
            clearInterval(ramdomTimer)
            resultPercent = Math.round(bestMatch / (totalQuestion - 1) *100);
            app.get("#testFinalPiePercent").textContent = resultPercent + "%";
            app.get("#testFinalResult").textContent = resultHighestMatch;
        },3000);
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



   
    
