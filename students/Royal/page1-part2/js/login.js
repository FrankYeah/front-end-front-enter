checkCurrentUser();

if(app.get("#navLoginBtn")){
    app.get("#navLoginBtn").addEventListener("click",(e)=>{
        createLoginLayout();
        
        var emailInput = app.get("#loginEmail");
        var passwordInput = app.get("#loginPassword");
        emailInput.onkeypress  = (event) => {
            if(event.keyCode == 13){
                event.preventDefault();
                app.get("#loginBtn").click();
            }
        } 
        passwordInput.onkeypress  = (event) => {
            if(event.keyCode == 13){
                event.preventDefault();
                app.get("#loginBtn").click();
            }
        } 
    });  
}

function createLoginLayout(){
    app.createElement("div","login_layout","loginLayout","body","","");
    app.createElement("div","login_container","loginContainer","loginLayout","","");
    app.createElement("div","login_card","loginCard","loginContainer","","");
    app.createElement("div","login_img","loginImg","loginCard","","");
    app.createElement("div","input_container","inputContainer","loginCard","","");
    app.createElement("input","login_input email","loginEmail","inputContainer","","");
    app.get("#loginEmail").setAttribute("type","email");
    app.get("#loginEmail").setAttribute("placeholder","Email");
    app.createElement("input","login_input password","loginPassword","inputContainer","","");
    app.get("#loginPassword").setAttribute("type","password");
    app.get("#loginPassword").setAttribute("placeholder","******");
    app.createElement("p","login_forget","loginForget","inputContainer","忘記密碼?","");
    app.createElement("div","register_container","registerContainer","loginCard","","");
    app.createElement("p","register_container_btn","registerBtn","registerContainer","註冊",app.log.createAccount);
    app.createElement("p","register_container_btn","loginBtn","registerContainer","登入",app.log.logInClick);
    app.createElement("p","login_gmail","loginGmail","loginCard","Log In With Gmail",app.log.loginByGoogle);
    app.get("#loginLayout").addEventListener("click",(e)=>{
        if(e.eventPhase == 2){
            loginLayout.parentNode.removeChild(loginLayout);
        }
    })
}

/* register btn click */
app.log.createAccount = function(){
     createEmail = loginEmail.value;
     createPassword = loginPassword.value;
    /* create User and get error */
    firebase.auth().createUserWithEmailAndPassword(createEmail, createPassword).then(checkLogIn()).catch(function(error){
        console.log(error.code);
        if(error.code === "auth/invalid-email"){
            app.get("#alertBoxLayout").style.display = "flex";
            app.get("#alertIndex").innerHTML = "請輸入有效的信箱";
        }else if(error.code === "auth/weak-password"){
            app.get("#alertBoxLayout").style.display = "flex";
            app.get("#alertIndex").innerHTML = "請輸入有效的密碼";
        }else if(error.code === "auth/email-already-in-use"){
            app.get("#alertBoxLayout").style.display = "flex";
            app.get("#alertIndex").innerHTML = "信箱已註冊，或尚未驗證。";
        }
    });
}

    /* if get user send verify mail */
    var userLogin;
    function checkLogIn(){
            firebase.auth().onAuthStateChanged(function(user){
            if(user){
                userLogin = user;
                user.sendEmailVerification().then(function(){
                    app.get("#alertBoxLayout").style.display = "flex";
                    app.get("#alertIndex").innerHTML = "已寄信，請前往驗證。";
                })
            }else{
                userLogin = null;
            }
        },function(error){});
    }

/* login btn click */
var userLogin;
var getError = false;
app.log.logInClick = function(){
    firebase.auth().onAuthStateChanged(function(user){
        let userLoginMail = loginEmail.value;
        let userLoginPassword = loginPassword.value;
        if(userLoginMail < 4){
            app.get("#alertBoxLayout").style.display = "flex";
            app.get("#alertIndex").innerHTML = "信箱太短了";
            return;
        }else if(userLoginPassword < 4){
            app.get("#alertBoxLayout").style.display = "flex";
            app.get("#alertIndex").innerHTML = "密碼太短了";
            return;
        }
        
        userLogin = firebase.auth().currentUser;
        console.log("userLogin = " + userLogin);
        if(userLogin){
        }
        firebase.auth().signInWithEmailAndPassword(userLoginMail, userLoginPassword).catch(function(error){
            getError = true;
            console.log("login error = " + error.code);
            if(error.code == "auth/wrong-password"){
                app.get("#alertBoxLayout").style.display = "flex";
                app.get("#alertIndex").innerHTML = "密碼輸入錯誤";
            }else if(error.code == "auth/user-not-found"){
                app.get("#alertBoxLayout").style.display = "flex";
                app.get("#alertIndex").innerHTML = "信箱尚未註冊";
            }else{
                app.get("#alertBoxLayout").style.display = "flex";
                app.get("#alertIndex").innerHTML = "信箱密碼有誤，或尚未驗證1。";
            }
        });
        console.log("getError = " + getError);
        if(getError === true){
            getError = false;
        }else{
            if(user.emailVerified){
                app.get("#alertBoxLayout").style.display = "flex";
                app.get("#alertIndex").innerHTML = "登入中";
                setDataOnFirebase();
                setTimeout(windowReload,3000);
            }else {
                app.get("#alertBoxLayout").style.display = "flex";
                app.get("#alertIndex").innerHTML = "信箱密碼有誤，或尚未驗證2。";
            } 
        }
    });
}

/* google login */
var provider;
var userPhotoUrl;
app.log.loginByGoogle = function(){
     var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            if(user){
                windowReload()
            }
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error)
        })
    }

function windowReload(){
    window.location.reload();
}

/* check login or not */
function checkCurrentUser(){
   firebase.auth().onAuthStateChanged(function(user){
       if(user){
           userLogin = user;
           console.log("成功登入");
           setDataOnFirebase();
           app.get("#navMemberLink").style.display = "block";
           app.get("#navLoginBtn").style.display = "none";
           if(user.photoURL){
               app.get("#navMemberLink").style.background = "url('" + user.photoURL + "')50% / cover no-repeat"
               app.get("#navMemberLink").style.width = "50px";
               app.get("#navMemberLink").style.height = "50px";
               app.get("#navMemberLink").style.borderRadius = "50%";
               app.get("#navMember").innerHTML = " ";
           }
       }else{
           console.log("尚未登入");
       }
   })
}

/* write data in firebase */
function setDataOnFirebase(){
    console.log("登入的user = " + userLogin.uid);
    database.ref("member/" + userLogin.uid).update({
        uid: userLogin.uid,
        name : userLogin.displayName,
        email: userLogin.email,
        photoURL: userLogin.photoURL,
    });
}

 /* logout */
function userLogout(){
    app.get("#navMemberLink").style.display = "none";
    app.get("#navLoginBtn").style.display = "block";
    photoURL = "";
    firebase.auth().signOut();  
    window.location = "index.html";
}

/* log alert box */
app.log.closeAlertBox = function(){
    app.get("#alertBoxLayout").style.display = "none";
}

app.log.createAlertBox = function(){
    app.createElement("div","alert_box_layout","alertBoxLayout","body","","");
    app.createElement("div","alert_box","alertBox","alertBoxLayout","","");
    app.createElement("p","alert_title","alertTitle","alertBox","Remind","");
    app.createElement("p","alert_index","alertIndex","alertBox","","");
    app.createElement("p","alert_btn","alertBtn","alertBox","OK",app.log.closeAlertBox);
}
app.log.createAlertBox();
