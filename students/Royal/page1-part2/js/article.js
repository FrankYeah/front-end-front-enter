request.onload = function(){
    
    getData = JSON.parse(request.response);
    
    
    slideImg(getData);
    
    searchIndex = new URL(document.location).searchParams.get("id");
    if(searchIndex != null){
        searchArticle();
    }else{
        getIniData();
    }
}



/* 將搜尋到的article放    到filterData */
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
        app.createElement("p","article_detail","articleDetail","articleContent" + i,getData[i]["preface"],"");
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
        getArticleTitle(filterData);
        getArticleDetail(filterData);
        app.createElement("div","read_more","readMore" + i,"articleContent" + i,"","");
        app.createElement("div","read_more_word","","readMore" + i,"read more","");
        app.createElement("div","read_more_icon","","readMore" + i,"","");
        app.createElement("div","tag_line","","article" + i,"","");
    }
    console.log(filterData);
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
        article.parentNode.removeChild(article);
//        app.createElement("p","article_title","articleArticle" + i,"articleContent" + i,getData[i]["name"],"");
    }

    /* createArticleTitle */
    function getArticleTitle(getData){
        app.createElement("p","article_title","articleArticle" + i,"articleContent" + i,getData[i]["name"],"");
    }

    function getArticleDetail(getData){
        app.createElement("p","article_detail","articleDetail","articleContent" + i,getData[i]["preface"],"");
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
    app.slideKey("#slideImg1","#slideImg2","#slideImg3");
    app.get("#slideImg1").style.background = "url('" + articleIndex[1]["rectangleUrl"]+ "') 50% / cover no-repeat";
    app.get("#slideImg1").style.height = "380px";
    
    app.get("#slideImg2").style.background = "url('" + articleIndex[2]["rectangleUrl"]+ "') 50% / cover no-repeat";
    app.get("#slideImg2").style.height = "380px";
    
    app.get("#slideImg3").style.background = "url('" + articleIndex[3]["rectangleUrl"]+ "') 50% / cover no-repeat";
    app.get("#slideImg3").style.height = "380px";
    setInterval("slideAction()",5000);
}

app.slideKey = (keyBlock, keyNone1, keyNone2) =>{
    app.get(keyBlock).style.display = "block";
    app.get(keyNone1).style.display = "none";
    app.get(keyNone2).style.display = "none";
    app.get(keyBlock).style.animation = "slideOpacityOut 5s ease 0s 1 alternate both";
}

let slideCount = 2;
slideAction = function(){
    if(slideCount == 1){
        app.slideKey("#slideImg1","#slideImg2","#slideImg3");
    }else if(slideCount == 2){
        app.slideKey("#slideImg2", "#slideImg3", "#slideImg1");
    }else if(slideCount == 3){
        app.slideKey("#slideImg3", "#slideImg1", "#slideImg2");
    }
    
    slideCount++;
    if(slideCount > 3){slideCount = 1}; 
}


