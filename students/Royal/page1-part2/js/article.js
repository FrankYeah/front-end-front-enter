var requestURL = "https://front-enter.firebaseio.com/list.json";
var request = new XMLHttpRequest();
request.open("GET",requestURL,true);
//request.responseType = "json";
request.send();

request.onload = function(){
    
    getData = JSON.parse(request.response);gi
    
    
    slideImg(getData);
    
    searchIndex = new URL(document.location).searchParams.get("id");
    if(searchIndex != null){
        searchArticle();
    }else{
        getIniData();
    }
}

/* 將搜尋到的article放到filterData */
function searchArticle(){
//    removeArticle(getData);
    app.createElement("div","","article","articleSection","","");
    filterData = [];
    for(i = 0; i <= getData.length; i++){
        for(var key in getData[i]){
            if(key == "name" || key == "city" ||key == "teachWay" || key == "classType" || key == "skill"){
                var index = getData[i][key].toString();
                if(index.indexOf(searchIndex) != -1){
                    filterData.push(getData[i]);
                    break;
                }   
            }
        }
    }
    if(filterData ==""){
        getIniData();
    }else{
        getFilterData(filterData);
    }
}


//get initial data
function getIniData(){
    app.createElement("div","","article","articleSection","","");
    for(i = 0; i < getData.length; i++ ){
        app.createElement("div","article_card","article" + i,"article","","");
        app.createElement("div","","locationContainer" + i,"article" + i,"","");
        app.createElement("div","location_img","locationImg","locationContainer" + i,"","");
        getALocation(getData);
        getArticleLocation(getData);
        getArticleContent(getData);
        app.createElement("div","article_img_container","articleImgContainer" + i,"articleContent" + i,"","");
        getArticleImg(getData);
        app.createElement("p","article_title","articleArticle" + i,"articleContent" + i,getData[i]["name"],"");
        app.createElement("p","article_detail","","articleContent" + i,getData[i]["preface"],"");
        app.createElement("div","read_more","readMore" + i,"articleContent" + i,"","");
        app.createElement("div","read_more_word","","readMore" + i,"read more","");
        app.createElement("div","read_more_icon","","readMore" + i,"","");
        app.createElement("div","tag_line","","article" + i,"","");
    }
}

// data after filter 
function getFilterData(filterData){
    removeArticle(getData);
    app.createElement("div","","article","articleSection","","");
    for(i = 0; i < filterData.length; i++ ){
        app.createElement("div","article_card","article" + i,"article","","");
        app.createElement("div","","locationContainer" + i,"article" + i,"","");
        app.createElement("div","location_img","locationImg","locationContainer" + i,"","");
        getALocation(filterData);
        getArticleLocation(filterData);
        getArticleContent(filterData);
        app.createElement("div","article_img_container","articleImgContainer" + i,"articleContent" + i,"","");
        getArticleImg(filterData);
        app.createElement("p","article_title","articleArticle" + i,"articleContent" + i,getData[i]["name"],"");
        app.createElement("p","article_detail","","articleContent" + i,getData[i]["preface"],"");
        app.createElement("div","read_more","readMore" + i,"articleContent" + i,"","");
        app.createElement("div","read_more_word","","readMore" + i,"read more","");
        app.createElement("div","read_more_icon","","readMore" + i,"","");
        app.createElement("div","tag_line","","article" + i,"","");
    }
}

// filter by type
function getAllArticle(){
    removeArticle(getData);
    getIniData(getData);
}

function smallClass(){
    filterData = [];
    for(i = 0; i < getData.length; i++){
        if(getData[i]["classType"] == "小班制"){
           filterData.push(getData[i]);
           }
    }
    getFilterData(filterData);
}

function letItGo(){
    filterData = [];
    for(i = 0; i < getData.length; i++){
        if(getData[i]["teachWay"] == "放養制"){
            filterData.push(getData[i]);
        }
    }
    getFilterData(filterData);
}

function oneByone(){
    filterData = [];
    for(i = 0; i < getData.length; i++){
        if(getData[i]["classType"] == "一對一"){
            filterData.push(getData[i]);
        }
    }
    getFilterData(filterData);
}

//filter by location
function filterLocation(e){
    var getLocation = e.textContent;
    filterData = [];
    for(i = 0; i < getData.length; i++){
        if(getData[i]["city"] == getLocation){
            filterData.push(getData[i]);
        }
    }
    getFilterData(filterData);
}


// create Article part 
    /* remove article */
    function removeArticle(getData){
        var removeArticle = app.get("#article");
        article.parentNode.removeChild(article);
    }

    /* createALocation */
    function getALocation(getData){
        app.createElement("a","","aLocation" + i,"locationContainer" + i,"","");
        app.get("#aLocation" + i).onclick = function(){
           filterLocation(this);
        }
    }

    /* createArticleLocation */
    function getArticleLocation(getData){
        app.createElement("p","article_location","articleLocation","aLocation" + i, getData[i]["city"],"");
    }

    /* createArticleContent */
    function getArticleContent(getData){
        app.createElement("a","article_content","articleContent" + i,"article" + i,"","");
        app.get("#articleContent"+i).setAttribute("href","content.html?id=" + getData[i]["creatTime"]);
    }

    /* createArticleImg */
    function getArticleImg(getData){
        app.createElement("img","article_img","articleImg" + i,"articleImgContainer" + i,"","");
        app.get("#articleImg" + i).setAttribute("src",getData[i]["squareUrl"]);
    }


// image slide function */
function slideImg(articleIndex){
    document.getElementById("slideImg1").style.background = "url('" + articleIndex[1]["rectangleUrl"]+ "') 50% / cover no-repeat";
    document.getElementById("slideImg1").style.display = "block";
    document.getElementById("slideImg1").style.height = "380px";
    
    document.getElementById("slideImg2").style.background = "url('" + articleIndex[2]["rectangleUrl"]+ "') 50% / cover no-repeat";
    document.getElementById("slideImg2").style.display = "none";
    document.getElementById("slideImg2").style.height = "380px";
    
    document.getElementById("slideImg3").style.background = "url('" + articleIndex[3]["rectangleUrl"]+ "') 50% / cover no-repeat";
    document.getElementById("slideImg3").style.display = "none";
    document.getElementById("slideImg3").style.height = "380px";
    
    setInterval("slideAction()",5000);
}
let slideCount = 1;
slideAction = function(){
        
    if(slideCount==1){
        document.getElementById("slideImg1").style.display = "none";
        document.getElementById("slideImg1").style.height = "380px";
        document.getElementById("slideImg1").style.animation ="slideOpacityOut 5s ease 0s 1 alternate both" ;
        document.getElementById("slideImg2").style.display = "block";
        document.getElementById("slideImg2").style.height = "380px";
        document.getElementById("slideImg2").style.animation ="slideOpacityOut 5s ease 0s 1 alternate both" ;
        document.getElementById("slideImg3").style.display = "none";
        document.getElementById("slideImg3").style.height = "380px";
        document.getElementById("slideImg3").style.animation ="slideOpacityOut 5s ease 0s 1 alternate both" ;
    }else if(slideCount == 2){
        document.getElementById("slideImg1").style.display = "none";
        document.getElementById("slideImg1").style.height = "380px";
        document.getElementById("slideImg1").style.animation ="slideOpacityOut 5s ease 0s 1 alternate both" ;
        document.getElementById("slideImg2").style.display = "none";
        document.getElementById("slideImg2").style.height = "380px";
        document.getElementById("slideImg2").style.animation ="slideOpacityOut 5s ease 0s 1 alternate both" ;
        document.getElementById("slideImg3").style.display = "block";
        document.getElementById("slideImg3").style.height = "380px";
        document.getElementById("slideImg3").style.animation ="slideOpacityOut 5s ease 0s 1 alternate both" ;
    }else if(slideCount == 3){
        document.getElementById("slideImg1").style.display = "block";
        document.getElementById("slideImg1").style.height = "380px";
        document.getElementById("slideImg1").style.animation ="slideOpacityOut 5s ease 0s 1 alternate both" ;
        document.getElementById("slideImg2").style.display = "none";
        document.getElementById("slideImg2").style.height = "380px";
        document.getElementById("slideImg2").style.animation ="slideOpacityOut 5s ease 0s 1 alternate both" ;
        document.getElementById("slideImg3").style.display = "none";
        document.getElementById("slideImg3").style.height = "380px";
        document.getElementById("slideImg3").style.animation ="slideOpacityOut 5s ease 0s 1 alternate both" ;
    }
    
    slideCount++;
    if(slideCount > 3){slideCount = 1}; 
}


