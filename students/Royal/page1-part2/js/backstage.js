var firebaseData;
var squareUrl = "";
var rectangleUrl = "";
var getSquarePic = "";
var getRectanglePic = "";
var newPostNo;
var getData;
firebaseData = database.ref('getData')
firebaseData.on('value', function(snapshot) {
    getData = snapshot.val();
    
});

app.get("#backstagePostBtn").onclick = function(){
    createNewPost();
}

app.get("#backstageCancelBtn").onclick = function(){
    window.location = "member.html"
}

/* get upload file name */
app.get("#backstageSquarePic").addEventListener("change",function(){
    getSquarePic = this.files[0];
    console.log(getSquarePic.name)
},false);


app.get("#backstageRectanglePic").addEventListener("change",function(){
    getRectanglePic = this.files[0];
    console.log(getRectanglePic.name)
},false);

/* create new post */
function createNewPost(){
    if(!getSquarePic){
        app.get("#alertBoxLayout").style.display = "flex";
        app.get("#alertIndex").innerHTML = "請選擇正方形圖片!";
        return;
    }else if(!getRectanglePic){
        app.get("#alertBoxLayout").style.display = "flex";
        app.get("#alertIndex").innerHTML = "請選擇長方形圖片!";
        return;
    }
    
    
    let storageRef = storage.ref();
    let uploadSquare = storageRef.child("images/" + getSquarePic.name).put(getSquarePic);
    let uploadRectangle = storageRef.child("images/" + getRectanglePic.name).put(getRectanglePic);
    
//     Listen for state changes, errors, and completion of the upload.
    uploadSquare.on("state_changed",function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress)
        switch(progress){
            case 0:
                app.get("#alertBoxLayout").style.display = "flex";
                app.get("#alertIndex").innerHTML = "上傳中!";
//                break;
//            case 100:
//                
//                }
//                break;
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
        
        let downloadURL = uploadSquare.snapshot.downloadURL;
        let pathReference = storageRef.child('images/'+getSquarePic.name);
        pathReference.getDownloadURL().then(function(url) {
            squareUrl = url;
            callRetangle()
        })
        
        
        // Upload completed successfully, now we can get the download URL
//        uploadSquare.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//            squareUrl = downloadURL;
//            callRetangle()
//        });
    });
    
    function callRetangle(){
        
        uploadRectangle.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                break;
            }
        }, function(error) {
        // Handle unsuccessful uploads
        }, function() {

            let downloadURL = uploadRectangle.snapshot.downloadURL;
            let pathReference = storageRef.child('images/'+getRectanglePic.name);
            pathReference.getDownloadURL().then(function(url) {
                rectangleUrl = url;
//            })
            
//         uploadRectangle.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//            rectangleUrl = downloadURL;
             
             var newPostNo = getData.length;
             var dateObject = new Date();
             database.ref("getData/" + newPostNo).update({
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
                creatTime: dateObject.getTime(),
                squareUrl: squareUrl,
                rectangleUrl: rectangleUrl,
             })
            });
        })
        
        app.get("#alertBoxLayout").style.display = "flex";
                app.get("#alertIndex").innerHTML = "成功發布貼文!";
                app.get("#alertBtn").onclick = function(){
                    window.location = "article.html";
                }
}
}