// Auth
function isSignIn() {
  var user = firebase.auth().currentUser;
  if (user) {
    if (user.emailVerified) {
      window.location.replace("./makeup.html");
    } else {
      window.location.replace("./auth.html");
    }
  } else {
    window.location.replace("./signin.html")
  }
}

//update profile and email authentication
const db = firebase.firestore();
const docRefForUser = db.collection("users");
const authButton = document.querySelector('#authButton');
const inputTextMyName = document.querySelector('#myName');
const inputTextMyAge = document.querySelector('#myAge');
const inputTextMyCity = document.querySelector('#myCity');
const inputTextMyPhone = document.querySelector('#myPhone');

function authStateChange() {
  var user = firebase.auth().currentUser;
  user.reload().then(function () {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {

        var email = user.email;
        var emailVerified = user.emailVerified;
        var txtConform = "이메일 인증이 완료되었습니다!"

        document.querySelector('#myEmail').value = email
        if (emailVerified) {
          $('.auth__conform').html(txtConform);
          console.log("yes")
        } else {
          console.log("no")
        }
      }
    });
  })
};

setInterval(authStateChange, 1000);

authButton.addEventListener('click', function () {
  var user = firebase.auth().currentUser;
  user.reload().then(function () {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {

        var email = user.email;
        var emailVerified = user.emailVerified;
        var selectedName = inputTextMyName.value;
        var selectedAge = inputTextMyAge.value;
        var selectedCity = inputTextMyCity.value;
        var selectedPhone = inputTextMyPhone.value;

        if (emailVerified) {

          if ($('#auth-agree4').is(":checked")) {
            docRefForUser.add({
              email: email,
              name: selectedName,
              age: selectedAge,
              city: selectedCity,
              phone: selectedPhone,
            }).then(function (data) {
              window.location.href = '/pages/makeup.html'
            }).catch(function (error) {
              console.log("error:", error)
            });
          } else {
            alert("이용약관에 모두 동의 해주세요!")
          }

        } else {
          alert("이메일 인증을 해주세요!")
        }
      }
    });
  });
})



$('.auth__email-button').on('click', function () {
  const user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function () {
    alert("이메일로 인증메일을 보냈습니다!")
  }).catch(function (error) {
    // An error happened.
  });
})

//agree checkbox ALL
$('.auth__checkbox').each(function (i) {
  $('#auth-agree4').on("click", function () {
    if ($(this).is(":checked")) {
      $(`#auth-agree${i+1}`).attr("checked", "checked");
    } else {
      $(`#auth-agree${i+1}`).removeAttr("checked");
    }
  })
});

//backButton
$('.backButton').on('click', function(){
  window.location.href = "../index.html"
})
