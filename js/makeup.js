
// Auth
function isSignIn() {
  var user = firebase.auth().currentUser;
  if (user) {
    if(user.emailVerified){
      window.location.replace("./makeup.html");
    }else {
      window.location.replace("./auth.html");
    }
  } else {
    window.location.replace("./signin.html")
  }
}

//data upload
const db = firebase.firestore();
const docRef = db.collection("donghang");
const docRefSearch = db.doc("searchValue/value");
const makeupButton = document.querySelector('#makeupButton');
const inputTextTitle = document.querySelector('#selectedTitle');
const inputTextCity = document.querySelector('#selectedCity');
const inputTextPlace = document.querySelector('#selectedPlace');
const inputTextDate = document.querySelector('#selectedDate');
const inputTextTime = document.querySelector('#selectedTime');
const inputTextHowMany = document.querySelector('#selectedHowMany');
const inputTextKakao = document.querySelector('#selectedKakao');
const inputTextContent = document.querySelector('#selectedContent');

makeupButton.addEventListener('click', function () {
  var selectedTitle = inputTextTitle.value;
  var selectedCity = inputTextCity.value;
  var selectedPlace = inputTextPlace.value;
  var selectedDate = inputTextDate.value;
  var selectedTIme = inputTextTime.value; 
  var selectedHowMany = inputTextHowMany.value;
  var selectedKakao = inputTextKakao.value;
  var selectedContent = inputTextContent.value;

  docRef.add({
    title: selectedTitle,
    city: selectedCity,
    place: selectedPlace,
    date: selectedDate,
    time: selectedTIme,
    howMany: selectedHowMany,
    kakao: selectedKakao,
    content: selectedContent
  }).then(function (data) {
    console.log("uploaded data!, data ID :", data.id)
  }).catch(function (error) {
    console.log("error:", error)
  });

  docRefSearch.set({
    selectedCity: selectedCity
  }).then(function () {
    window.location.href = '../pages/board.html';
  }).catch(function (error) {
    console.log("error:", error)
  });
});



//date picker API
$('#selectedDate').fdatepicker({
  format: 'yyyy/mm/dd'
});

//time picker API
$(document).ready(function () {
  $('#selectedTIme').timepicker({
    timeFormat: 'h:mm p', //1:00 PM
    interval: 60, //시간간격
    minTime: '7', //최소시간
    maxTime: '8:00pm', //최대시간
    startTime: '7:00', //최소시간
    dynamic: false,
    dropdown: true,
    scrollbar: false
  });
});

//backButton
$('.backButton').on('click', function(){
  window.location.href = "../index.html"
})

