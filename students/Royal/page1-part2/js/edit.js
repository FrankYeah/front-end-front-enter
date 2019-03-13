var firebaseData;
var thisPostNo;
firebaseData = database.ref('getData')
var getData;
firebaseData.on('value', function(snapshot) {
    getData = snapshot.val();
    getEditPost();
    setThisPost();
});

/* get post from create time */
var thisEditPost = []
function getEditPost(){
    var posterCreatTime = new URL(document.location).searchParams.get("id");
    for(i = 0; i < getData.length; i++){
        if(posterCreatTime == getData[i]["creatTime"]){
            thisEditPost.push(getData[i]);
        }
    }
    
}

/* set the post data */
function setThisPost(){
    console.log(thisEditPost[0])
    app.get("#backstagePosterTitle").innerHTML = thisEditPost[0]["name"] + "(編輯)"
    app.get("#backstageName").value = thisEditPost[0]["name"];
    app.get("#backstageCity").value = thisEditPost[0]["city"];
    app.get("#backstageSkill").value = thisEditPost[0]["skill"];
    app.get("#backstageTechnology").value = thisEditPost[0]["technology"];
    app.get("#backstageFee").value = thisEditPost[0]["fee"];
    app.get("#backstageTotalDay").value = thisEditPost[0]["totalDay"];
    app.get("#backstageWeekHour").value = thisEditPost[0]["weekHour"];
    app.get("#backstageFoundYear").value = thisEditPost[0]["foundYear"];
    app.get("#backstageTeachWay").value = thisEditPost[0]["teachWay"];
    app.get("#backstageClassType").value = thisEditPost[0]["classType"];
    app.get("#backstageTeacherNum").value = thisEditPost[0]["teacherNum"];
    app.get("#backstageTopic").value = thisEditPost[0]["topic"];
    app.get("#backstagePreface").value = thisEditPost[0]["preface"];
    app.get("#backstageContent").value = thisEditPost[0]["content"];
    app.get("#backstagePhone").value = thisEditPost[0]["phone"];
    app.get("#backstageEmail").value = thisEditPost[0]["mail"];
    app.get("#editCancelBtn").onclick = function(){
        window.location = "member.html"
    }
}

/* get picture */
var getSquarePic;
app.get("#editSquarePic").addEventListener("change",function(){
    getSquarePic = this.files[0];
    console.log(getSquarePic.name)
},false)

var getRectanglePic;
app.get("#editRectanglePic").addEventListener("change",function(){
    getRectanglePic = this.files[0];
    console.log(getRectanglePic.name)
},false)

/* edit click */
app.get("#editPostBtn").onclick = function(){
    if(!getSquarePic){
        app.get("#alertBoxLayout").style.display = "flex";
        app.get("#alertIndex").innerHTML = "請選擇正方形圖片!";
        return;
    }else if(!getRectanglePic){
        app.get("#alertBoxLayout").style.display = "flex";
        app.get("#alertIndex").innerHTML = "請選擇長方形圖片!";
        return;
    }
    
    for(i = 0; i < getData.length; i++){
        if(getData[i]["creatTime"] == thisEditPost[0]["creatTime"]){
            thisPostNo = i;
        }
    }
    
    let storageRef = storage.ref();
    let uploadSquare = storageRef.child("images/" + getSquarePic.name).put(getSquarePic);
    let uploadRectangle = storageRef.child("images/" + getRectanglePic.name).put(getRectanglePic);
    
        uploadSquare.on("state_changed",function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress)
        switch(progress){
            case 0:
                app.get("#alertBoxLayout").style.display = "flex";
                app.get("#alertIndex").innerHTML = "更新中!";
                break;
            case 100:
                app.get("#alertBoxLayout").style.display = "flex";
                app.get("#alertIndex").innerHTML = "成功更新貼文!";
                app.get("#alertBtn").onclick = function(){
                    window.location = "article.html";
                }
                break;
        }
        
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
//                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
//                console.log('Upload is running');
                break;
        }
    }, function(error) {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
                console.log(error);
                break;
            case 'storage/canceled':
                 console.log(error);
                break;
            case 'storage/unknown':
                console.log(error);
                break;
        }
    }, function() {
        
        
        // Upload completed successfully, now we can get the download URL
        uploadSquare.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            squareUrl = downloadURL;
            callRetangle()
        });
    });
    
    function callRetangle(){
         uploadRectangle.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            rectangleUrl = downloadURL;
             
            database.ref("getData/" + thisPostNo).update({
                    name: backstageName.value,
                    city: backstageCity.value,
                    skill: backstageSkill.value,
                    technology: backstageTechnology.value,
                    fee: backstageFee.value,
                    totalDay: backstageTotalDay.value,
                    weekHour: backstageWeekHour.value,
                    foundYear:  backstageFoundYear.value,
                    teachWay: backstageTeachWay.value,
                    classType: backstageClassType.value,
                    teacherNum: backstageTeacherNum.value,
                    topic: backstageTopic.value,
                    preface: backstagePreface.value,
                    content: backstageContent.value,
                    phone: backstagePhone.value,
                    mail: backstageEmail.value,
                    squareUrl: squareUrl,
                    rectangleUrl: rectangleUrl,
            })
         });
    }
    
    

//    database.ref("getData/" + thisPostNo).update({
//            name: backstageName.value,
//            city: backstageCity.value,
//            skill: backstageSkill.value,
//            technology: backstageTechnology.value,
//            fee: backstageFee.value,
//            totalDay: backstageTotalDay.value,
//            weekHour: backstageWeekHour.value,
//            foundYear:  backstageFoundYear.value,
//            teachWay: backstageTeachWay.value,
//            classType: backstageClassType.value,
//            teacherNum: backstageTeacherNum.value,
//            topic: backstageTopic.value,
//            preface: backstagePreface.value,
//            content: backstageContent.value,
//            phone: backstagePhone.value,
//            mail: backstageEmail.value,
//    })
    

}