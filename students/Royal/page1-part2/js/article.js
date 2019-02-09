var requestURL = "https://front-enter.firebaseio.com/list.json";
var request = new XMLHttpRequest();
request.open("GET",requestURL,true);
//request.responseType = "json";
request.send();

request.onload = function(){
    
    getData = JSON.parse(request.response);
    getIniData();
    
    slideImg(getData);
}



//get initial data
function getIniData(){
    getArticle(getData);
    for(i = 0; i < getData.length; i++ ){
        getArticleCard(getData);
        getLocationContainer(getData);
        getLocationImg(getData);
        getALocation(getData);
        getArticleLocation(getData);
        getArticleContent(getData);
        getArticleImgContainer(getData);
        getArticleImg(getData);
        getArticleTitle(getData);
        getArticleDetail(getData);
        getReadMore(getData);
        getReadMoreWord(getData);
        getReadMoreIcon(getData);
        getTagLine(getData);
    }
}

// data after filter 
function getFilterData(filterData){
    removeArticle(getData);
    getArticle(filterData);
    for(i = 0; i < filterData.length; i++ ){
        getArticleCard(filterData);
        getLocationContainer(filterData);
        getLocationImg(filterData);
        getALocation(filterData);
        getArticleLocation(filterData);
        getArticleContent(filterData);
        getArticleImgContainer(filterData);
        getArticleImg(filterData);
        getArticleTitle(filterData);
        getArticleDetail(filterData);
        getReadMore(filterData);
        getReadMoreWord(filterData);
        getReadMoreIcon(filterData);
        getTagLine(filterData);
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
        var removeArticle = document.getElementById("article");
        article.parentNode.removeChild(article);
    }

    /* createArticle */
    function getArticle(getData){
        var createArticle = document.createElement("div");
        createArticle.setAttribute("id","article");
        var articleSection = document.getElementById("articleSection");
        articleSection.appendChild(createArticle);
    }

    /* createArticleCard */
    function getArticleCard(getData){
        var createArticleCard = document.createElement("div");
        createArticleCard.setAttribute("id","article" + i);
        createArticleCard.setAttribute("class","article_card");
        var article = document.getElementById("article");
        article.appendChild(createArticleCard);
    }

    /* createLocationContainer */
    function getLocationContainer(getData){
        var createLocationContainer = document.createElement("div");
        createLocationContainer.setAttribute("id","locationContainer" + i);
        document.getElementById("article" + i).appendChild(createLocationContainer);
    }

    /* createLocationImg */
    function getLocationImg(getData){
        var createLocationImg = document.createElement("div");
        createLocationImg.setAttribute("id","locationImg");
        createLocationImg.setAttribute("class","location_img");
        document.getElementById("locationContainer" + i).appendChild(createLocationImg);
    }

    /* createALocation */
    function getALocation(getData){
        var createALocation = document.createElement("a");
        createALocation.setAttribute("id","aLocation" + i);
        
        document.getElementById("locationContainer" + i).appendChild(createALocation);

        document.getElementById("aLocation" + i).onclick = function(){
           filterLocation(this);
        }
    }

    /* createArticleLocation */
    function getArticleLocation(getData){
        var createArticleLocation = document.createElement("p");
        createArticleLocation.setAttribute("class","article_location");
        createArticleLocation.setAttribute("id","articleLocation");
        createArticleLocation.textContent = getData[i]["city"];
        
        document.getElementById("aLocation" + i).appendChild(createArticleLocation);
        
    }



    /* createArticleContent */
    function getArticleContent(getData){
        var createArticleContent = document.createElement("a");
        createArticleContent.setAttribute("id","articleContent" + i);
        createArticleContent.setAttribute("class","article_content");
        createArticleContent.setAttribute("href"," ");
        document.getElementById("article" + i).appendChild(createArticleContent);
    }

    /* createArticleImgContainer */
    function getArticleImgContainer(getData){
        var createArticleImgContainer = document.createElement("div");
        createArticleImgContainer.setAttribute("id","articleImgContainer" + i);
        createArticleImgContainer.setAttribute("class","article_img_container");
        document.getElementById("articleContent" + i).appendChild(createArticleImgContainer);
    }

    /* createArticleImg */
    function getArticleImg(getData){
        var createArticleImg = document.createElement("img");
        createArticleImg.setAttribute("id","articleImg");
        createArticleImg.setAttribute("class","article_img");
        createArticleImg.setAttribute("src",getData[i]["squareUrl"]);
        document.getElementById("articleImgContainer" + i).appendChild(createArticleImg);
    }


    /* createArticleTitle */
    function getArticleTitle(getData){
        var createArticleTitle = document.createElement("p");
        createArticleTitle.setAttribute("class","article_title");
        createArticleTitle.textContent = getData[i]["name"];
        document.getElementById("articleContent" + i).appendChild(createArticleTitle);

    }

    /* createArticleDetail */
    function getArticleDetail(getData){
        var createArticleDetail = document.createElement("p");
        createArticleDetail.setAttribute("class","article_detail");
        createArticleDetail.textContent = getData[i]["preface"];
        document.getElementById("articleContent" + i).appendChild(createArticleDetail);
    }

    /* createReadMore */
    function getReadMore(getData){
        var createReadMore = document.createElement("div");
        createReadMore.setAttribute("id","readMore" + i);
        createReadMore.setAttribute("class","read_more");
        document.getElementById("articleContent" + i).appendChild(createReadMore);
    }

    /* createReadMoreWord */
    function getReadMoreWord(getData){
        var createReadMoreWord = document.createElement("div");
        createReadMoreWord.setAttribute("class","read_more_word");
        createReadMoreWord.innerHTML = "read more";
        document.getElementById("readMore" + i).appendChild(createReadMoreWord);
    }

    /* createReadMoreIcon */
    function getReadMoreIcon(getData){
        var createReadMoreIcon = document.createElement("div");
        createReadMoreIcon.setAttribute("class","read_more_icon");
        document.getElementById("readMore" + i).appendChild(createReadMoreIcon);
    }

    /* createTagLine */
    function getTagLine(getData){
        var createTagLine = document.createElement("div");
        createTagLine.setAttribute("class","tag_line");
        document.getElementById("article" + i).appendChild(createTagLine);
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


