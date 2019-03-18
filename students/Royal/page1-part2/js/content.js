//request.onload = function(){
//    
//    getData = JSON.parse(request.response);
//    getPoster();
//    getContent();
//}

var firebaseData;
firebaseData = database.ref('getData')
var getData;
firebaseData.on('value', function(snapshot) {
    getData = snapshot.val();
    getPoster();
    getContent();
});

/* get this article through creatTime */
var thisData =[];
function getThisArticle(){
    var posterCreatTime = new URL(document.location).searchParams.get("id");
    for(i = 0; i < getData.length; i++){
        if(getData[i]["creatTime"] == posterCreatTime ){
            thisData.push(getData[i])
        }
    } 
}

function getPoster(){
    getThisArticle();
    document.getElementById("poster").style.background = "url('" + thisData[0]["rectangleUrl"] + "') 50% / cover no-repeat";
    document.getElementById("posterTitle").textContent = thisData[0]["name"];
    console.log(thisData)
}

function getContent(){
    getThisArticle();
    
    document.getElementById("contentTitle").innerHTML = thisData[0]["topic"];
    document.getElementById("contentText").innerHTML = thisData[0]["content"];
    document.getElementById("boxCity").innerHTML = thisData[0]["city"];
    document.getElementById("boxClassType").innerHTML = thisData[0]["classType"];
    document.getElementById("boxTeachWay").innerHTML = thisData[0]["teachWay"];
    document.getElementById("boxTotalDay").innerHTML = thisData[0]["totalDay"] + "天";
    document.getElementById("boxWeekHour").innerHTML = thisData[0]["weekHour"] + "小時";
    document.getElementById("boxTechnology").innerHTML = thisData[0]["technology"];
    document.getElementById("boxMail").innerHTML = thisData[0]["mail"];
    document.getElementById("boxPhone").innerHTML = thisData[0]["phone"];
}

for(i = 0; i < 5; i++){
    document.getElementById("contentChart" + i).onclick = function(){
        contentChartClick(this); 
    }
    document.getElementById("contentChart" + i).setAttribute("name","contentImg");
    document.getElementById("contentChart" + i).setAttribute("data-no",i);
}
var contentImg = document.getElementsByName("contentImg");


function contentChartClick(e){
    thisImgNo = e.getAttribute("data-no");
    var thisImg = getComputedStyle(e).background;
    thisImg = thisImg.split(" ")[4];
    document.getElementById("fullSlideImg").style.background = thisImg + "50% / cover no-repeat";
     fullSlide();
    
}


function getPreImg(){
    var preImg = contentImg[thisImgNo];
    var preImgUrl = getComputedStyle(preImg).background;
    preImgUrl = preImgUrl.split(" ")[4];
    document.getElementById("fullSlideImg").style.background = preImgUrl + "50% / cover no-repeat";
}


function fullSlideLeft(){
    if(thisImgNo > 0){
        thisImgNo--;
    }else{
        thisImgNo = 4;
    }
    getPreImg();
}

function fullSlideRight(){
    if(thisImgNo < 4){
        thisImgNo++;
    }else{
        thisImgNo = 0;
    }
    getPreImg();
}

let fullSlideClick = false;
function fullSlide(){
    if(fullSlideClick == false){
        document.getElementById("fullSlideback").style.display = "flex";
        fullSlideClick = true;
    }else{
        document.getElementById("fullSlideback").style.display = "none";
        fullSlideClick = false;
    }
}

/* only do on fullSlideback */
document.getElementById("fullSlideback").addEventListener("click",(e)=>{
    if(e.eventPhase == 2){
        fullSlide();
    }
})
