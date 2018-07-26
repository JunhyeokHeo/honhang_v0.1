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
        } else {}
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

        if (selectedName !== "" && selectedAge !== "" && selectedCity !== "" && selectedPhone !== "") {

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
              popUpOpen(3);
            }

          } else {
            popUpOpen(2);
          }

        } else {
          popUpOpen(1);
        }

      }
    });
  });
})



$('.auth__email-button').on('click', function () {
  const user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function () {
    popUpOpen(4);
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
$('.backButton').on('click', function () {
  window.location.href = "../index.html"
})


//popup opener
function popUpOpen(i) {
  switch (i) {
    case 1:
      $('.small-popup__text').html("인적사항를 모두 입력해주세요!");
      break;
    case 2:
      $('.small-popup__text').html("이메일을 인증 해주세요!");
      break;
    case 3:
      $('.small-popup__text').html("이용약관에 모두 동의 해주세요!");
      break;
    case 4:
      $('.small-popup__text').html("이메일로 인증메일을 보냈습니다!");
      break;
  }

  $('.small-popup').css({
    "opacity": "1",
    "visibility": "visible"
  });
  $('.small-popup__content').animate({
    "right": "2rem"
  }, 300);
}
//popup closer
$('.small-popup').on('click', function () {
  $('.small-popup__content').animate({
    "right": "-30rem"
  }, 300, function () {
    $('.small-popup').css({
      "opacity": "0",
      "visibility": "hidden"
    })
  })
})