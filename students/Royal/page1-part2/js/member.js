var getMember;
var memberData;
var memberUid;
var getMarkedArticle;
var getData;

firebase.auth().onAuthStateChanged(function(user){
    memberData = user;
    memberUid = memberData.uid;

    var firebaseMember = database.ref('member/' + memberUid)
    firebaseMember.once('value', function(snapshot) {
        getMember = snapshot.val();
        createMemberLayout();

        if(user.email == "indifferencedead@yahoo.com.tw"){
            app.get("#managePost").style.display = "block";
        }
    });
    var markedArticle =  database.ref('member/' + memberUid + "/collectionMarked/")
    markedArticle.once('value', function(snapshot) {
        getMarkedArticle = snapshot.val()
    })
})

var firebaseData = database.ref('getData')
firebaseData.on('value', function(snapshot) {
    getData = snapshot.val();
})

app.member.memberLayoutDisplay = (layoutBlock,layoutNone1,layoutNone2) =>{
    app.get(layoutBlock).style.display = "flex";
    app.get(layoutNone1).style.display = "none";
    app.get(layoutNone2).style.display = "none";
}
/* create member layout */
var memberSideBtn;
function createMemberLayout(){
    app.createElement("div","member_layout","memberLayout","memberSection","","");
    app.createElement("div","member_bar","memberBar","memberLayout","","");
    app.createElement("p","member_side_btn","personalData","memberBar","個人資料",memberSideClick);
    app.createElement("p","member_side_btn","myCollection","memberBar","收藏",memberSideClick);
    app.createElement("p","member_side_btn","managePost","memberBar","貼文管理",memberSideClick);
    app.get("#managePost").style.display = "none";
    app.createElement("p","member_side_btn","logout","memberBar","登出",userLogout);
    app.createElement("div","member_display","memberDisplay","memberLayout","","");
    
    createMemberProfile();
    createMemberCollection();
    createMemberPostManage();
    
    app.member.memberLayoutDisplay("#memberProfile","#memberCollection","#memberPostManage");
}

/* member side click */
function memberSideClick(e){
    
    memberSideBtn = e.target.id;
    if(memberSideBtn == "personalData"){
        app.member.memberLayoutDisplay("#memberProfile","#memberCollection","#memberPostManage");
    }else if(memberSideBtn == "myCollection"){
        app.member.memberLayoutDisplay("#memberCollection","#memberPostManage","#memberProfile");
    }else if(memberSideBtn == "managePost"){
        app.member.memberLayoutDisplay("#memberPostManage","#memberProfile","#memberCollection");
    }
}

/* create profile */
function createMemberProfile(){
    app.createElement("div","member_profile","memberProfile","memberDisplay","","");
    app.createElement("div","member_photo","memberPhoto","memberProfile","","");
    if(memberData.photoURL){
        app.get("#memberPhoto").style.background = "url('" + memberData.photoURL +"')50% / cover no-repeat"
    }
    app.createElement("div","profile_info","profileInfo","memberProfile","","");
    app.createElement("div","profile_row","profileRowName","profileInfo","","");
    app.createElement("p","profile_title","profileTitle","profileRowName","姓名","");
    app.createElement("input","profile_index","profileName","profileRowName","","");
    app.get("#profileName").setAttribute("disabled","");
    if(memberData.displayName){
        app.get("#profileName").value = memberData.displayName;
    }else{
       app.get("#profileName").placeholder = "請輸入姓名"
    }
    app.createElement("div","profile_row","profileRowPhone","profileInfo","","");
    app.createElement("p","profile_title","profileTitle","profileRowPhone","手機","");
    app.createElement("input","profile_index","profilePhone","profileRowPhone","","");
    app.get("#profilePhone").setAttribute("disabled","");
    app.get("#profilePhone").setAttribute("type","phone");
    if(getMember["phone"]){
        app.get("#profilePhone").value = getMember["phone"];
    }else{
       app.get("#profilePhone").placeholder = "請輸入電話"
    }
    app.createElement("div","profile_row","profileRowEmail","profileInfo","","");
    app.createElement("p","profile_title","profileTitle","profileRowEmail","信箱","");
    app.createElement("p","profile_index","profileEmail","profileRowEmail",memberData.email,"");
    app.createElement("p","modify_profile_btn_container","modifyProfileBtnContainer","memberProfile","","");
    app.createElement("p","modify_profile_btn modify","modifyProfileBtn","modifyProfileBtnContainer","修改資料",modifyClick);
    app.createElement("p","modify_profile_btn","modifyProfileConfirm","modifyProfileBtnContainer","確定",modifyConfirm);
    app.createElement("p","modify_profile_btn","modifyProfileCancel","modifyProfileBtnContainer","取消",modifyCancel);
}

    app.member.modifyBtn = (modifyConfirm,modifyCancel,modifyBtn) =>{
        app.get(modifyConfirm).style.display = "none";
        app.get(modifyCancel).style.display = "none";
        app.get(modifyBtn).style.display = "block";
    }

    function modifyClick(){
        app.get("#modifyProfileConfirm").style.display = "block";
        app.get("#modifyProfileCancel").style.display = "block";
        app.get("#modifyProfileBtn").style.display = "none";
        app.get("#profileName").removeAttribute("disabled");
        app.get("#profilePhone").removeAttribute("disabled");
        app.get("#profileName").style.border = "solid 1px rgb(128,128,128)";
        app.get("#profilePhone").style.border = "solid 1px rgb(128,128,128)";
    }
    function modifyConfirm(){
        app.member.modifyBtn("#modifyProfileConfirm","#modifyProfileCancel","#modifyProfileBtn");
        app.get("#profileName").setAttribute("disabled","");
        app.get("#profilePhone").setAttribute("disabled","");
        app.get("#profileName").style.border = "none";
        app.get("#profilePhone").style.border = "none";
        
        var user = firebase.auth().currentUser
        user.updateProfile({
            displayName: app.get("#profileName").value,
        }).then(function() {
            app.get("#alertBoxLayout").style.display = "flex";
            app.get("#alertIndex").innerHTML = "修改成功";
        })
        database.ref("/member/" + memberUid).update({phone: app.get("#profilePhone").value});
       
    }

    function modifyCancel(){
        app.member.modifyBtn("#modifyProfileConfirm","#modifyProfileCancel","#modifyProfileBtn");
        app.get("#profileName").setAttribute("disabled","");
        app.get("#profilePhone").setAttribute("disabled","");
        app.get("#profileName").style.border = "none";
        app.get("#profilePhone").style.border = "none";
        app.get("#profileName").value = memberData.displayName;
        app.get("#profilePhone").value = getMember["phone"];
    }
/* create collection */
var getCollectionData;
function createMemberCollection(){
    app.createElement("div","member_collection","memberCollection","memberDisplay","","");
    getCollectionData = JSON.parse(localStorage.getItem(memberUid));
    if(!getCollectionData){
        app.createElement("p","collection_index","collectionIndex","memberCollection","可以前往探索頁面進行收藏唷。","");
    }else{
        for(let i = 0; i < getCollectionData.length; i++){
            app.createElement("div","collection_card","collectionCard" + i,"memberCollection","","");
            app.createElement("a","collection_img_container","collectionImgContainer" + i,"collectionCard" + i,"","");
            app.get("#collectionImgContainer" + i).setAttribute("href","content.html?id=" + getCollectionData[i]["creatTime"]);
            app.createElement("div","collection_img","collectionImg" + i,"collectionImgContainer" + i,"","");
            app.get("#collectionImg" + i).style.background = "url('" + getCollectionData[i]["squareUrl"] + "') 50% / cover no-repeat";
            app.createElement("div","collection_title","collectionTitle","collectionCard" + i,getCollectionData[i]["name"],"");
            app.createElement("div","collection_delete","collectionDelete" + i,"collectionCard" + i,"",deleteCollection);
            app.get("#collectionDelete" + i).setAttribute("data-name",getCollectionData[i]["name"]);
        }
    }
}

/* delete collection */
function deleteCollection(e) {
    let markName = e.target.getAttribute("data-name");
    for(i = 0; i < getCollectionData.length; i++){
        if(getCollectionData[i]["name"] == markName){
            getCollectionData.splice(i,1);
            localStorage.setItem(getMember["uid"],JSON.stringify(getCollectionData));
            thisCard = e.target.parentNode;
            thisCard.parentNode.removeChild(thisCard);
          
            if(getCollectionData.length == 0){
                app.createElement("p","collection_index","collectionIndex","memberCollection","可以前往探索頁面進行收藏唷。","");
            }
            return;
        }
    }
}

/* create post manage */
function createMemberPostManage(){
    app.createElement("div","member_post_manage","memberPostManage","memberDisplay","","");
    app.createElement("div","member_post_container","memberPostContainer","memberPostManage","","");
    
    for(i = 0; i < getData.length;i++){
        app.createElement("div","post_container","postContainer" + i,"memberPostContainer","","");
        app.createElement("p","post_title","postTitle","postContainer" + i,getData[i]["name"],"");
        app.createElement("p","post_edit","postEditImg" + i,"postContainer" + i,"",postEditClick);
        app.createElement("p","post_delete","postDeleteImg" + i,"postContainer" + i,"",postDeleteClick);
        app.get("#postContainer" + i ).setAttribute("data-post",i);
    }
    
    app.createElement("div","post_btn_container","postBtnContainer","memberPostManage","","");
    app.createElement("p","post_btn","createPostBtn","postBtnContainer","發布貼文","");
    app.get("#createPostBtn").onclick = function(){
        window.location = "/backstage.html";
    }
    app.createElement("p","post_btn","editPostBtn","postBtnContainer","編輯貼文","");
    app.createElement("p","post_btn","cancelEditBtn","postBtnContainer","取消編輯","");
    app.get("#cancelEditBtn").style.display = "none";
    app.get("#cancelEditBtn").onclick = function(){
        app.get("#editPostBtn").style.display = "block";
        app.get("#cancelEditBtn").style.display = "none";
        for(i = 0; i < getData.length; i++){
            app.get("#postContainer" + i).style.border = "solid 1px rgb(128, 128, 128)"
            app.get("#postContainer" + i).style.color = "rgb(128, 128, 128)"
            app.get("#postEditImg" + i).style.display = "none";
            app.get("#postDeleteImg" + i).style.display = "none";
        }
    }
    
    app.get("#editPostBtn").onclick = function(){
        app.get("#cancelEditBtn").style.display = "block";
        app.get("#editPostBtn").style.display = "none";
        for(i = 0; i < getData.length; i++){
            app.get("#postContainer" + i).style.border = "solid 1px rgb(26,216,211)"
            app.get("#postContainer" + i).style.color = "rgb(26,216,211)"
            app.get("#postEditImg" + i).style.display = "block";
            app.get("#postDeleteImg" + i).style.display = "block";
        }
    }
}
  var postNo;
function postEditClick(e){
    postNo = e.target.parentNode.getAttribute("data-post");
    window.location = "edit.html?id=" + getData[postNo]["creatTime"];
}

function postDeleteClick(e){
    if(confirm("確定要刪除嗎?")){
        postNo = e.target.parentNode.getAttribute("data-post");
        database.ref("getData/" + postNo).remove();
        var thisArticlePost = app.get("#postContainer" + postNo); 
        thisArticlePost.parentNode.removeChild(thisArticlePost);  
    }
    
}
