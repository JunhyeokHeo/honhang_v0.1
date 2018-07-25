//시작
var config = {
  apiKey: "AIzaSyCeLl26fWdo1aNtqsU3JPpyxFE4L9LQEmY",
  authDomain: "honghang-7ba3f.firebaseapp.com",
  databaseURL: "https://honghang-7ba3f.firebaseio.com",
  projectId: "honghang-7ba3f",
  storageBucket: "",
  messagingSenderId: "646058881599"
};
firebase.initializeApp(config);

//상태체크
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    document.querySelector('.state-signout').style.display = "block";
    document.querySelector('.state-signin').style.display = "none";
  } else {
    document.querySelector('.state-signout').style.display = "none";
    document.querySelector('.state-signin').style.display = "block";
  }
})

//로그인
function signin() {
  var userEmail = document.querySelector('#email').value;
  var userPass = document.querySelector('#password').value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(function (user) {
      if (user) {
        window.location.replace("../index.html");
      }
    })
    .catch(function (error) {
      // Handle Errors here.//
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert(errorMessage);
    });

}
//로그아웃
function signout() {
  firebase.auth().signOut().then(function () {
    window.location.replace("../index.html");
  });
}
//회원가입
function signup() {
  var userEmail = document.querySelector('#email').value;
  var userPass = document.querySelector('#password').value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
    .then(function (user) {
      if (user) {
        window.location.replace("../index.html");
      }
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      window.alert(errorMessage);
    });
}
//비밀번호 재설정

function setNewPassword() {

  var auth = firebase.auth();
  var userEmail = document.querySelector('#email').value;

  auth.sendPasswordResetEmail(userEmail).then(function () {
    alert("입력하신 이메일로 변경메일이 발송되었습니다!")
  }).catch(function (error) {
    // An error happened.
  });
}