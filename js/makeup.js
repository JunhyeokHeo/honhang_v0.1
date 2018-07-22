
//Auth

// var name, email, photoUrl, uid, emailVerified;
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     name = user.displayName;
//     email = user.email;
//     photoUrl = user.photoURL;
//     emailVerified = user.emailVerified;
//     uid = user.uid;  
//   }
//   console.log(email);
// }); 질문고고


function isSignIn() {
  if (user) {
    window.location.replace("./pages/makeup.html");
  } else {
    window.location.replace("./pages/signin.html")
  }
}


//data upload
var firestore = firebase.firestore();
const docRef = firestore.collection("donghang");
const makeupButton = document.querySelector('#makeupButton');
const inputTextTitle = document.querySelector('#selectedTitle');
const inputTextCity = document.querySelector('#selectedCity');
const inputTextPlace = document.querySelector('#selectedPlace');
const inputTextDate = document.querySelector('#selectedDate');
const inputTextTime = document.querySelector('#selectedTime');
const inputTextHowMany = document.querySelector('#selectedHowMany');
const inputTextContent = document.querySelector('#selectedContent');

makeupButton.addEventListener('click', function () {
  var selectedTitle = inputTextTitle.value;
  var selectedCity = inputTextCity.value;
  var selectedPlace = inputTextPlace.value;
  var selectedDate = inputTextDate.value;
  var selectedTIme = inputTextTime.value;
  var selectedHowMany = inputTextHowMany.value;
  var selectedContent = inputTextContent.value;

  docRef.add({
    title: selectedTitle,
    city: selectedCity,
    place: selectedPlace,
    date: selectedDate,
    time: selectedTIme,
    howMany: selectedHowMany,
    content: selectedContent
  }).then(function (data) {
    console.log("uploaded data!, data ID :", data.id)
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
    interval: 30, //시간간격
    minTime: '7', //최소시간
    maxTime: '8:00pm', //최대시간
    startTime: '7:00', //최소시간
    dynamic: false,
    dropdown: true,
    scrollbar: false
  });
});

//datalist
$(document).ready(function () {
  $('#selectedHowMany').click(function () {
    $(this).val(undefined);
  })
})

