var firestore = firebase.firestore();
const docRef = firestore.doc("donghang/data")
const searchButton = document.querySelector('#searchButton');
const inputTextCity = document.querySelector('#selectedCity'); 
const inputTextPlace = document.querySelector('#selectedPlace');
const inputTextDate = document.querySelector('#selectedDate');
const inputTextTime = document.querySelector('#selectedTime');
const inputTextHowMany = document.querySelector('#selectedHowMany');

searchButton.addEventListener('click', function () {
  var selectedCity = inputTextCity.value;
  var selectedPlace = inputTextPlace.value;
  var selectedDate = document.querySelector('.t-day-check-in').innerHTML+
  document.querySelector('.t-month-check-in').innerHTML+
  document.querySelector('.t-year-check-in').innerHTML;
  var selectedTIme = inputTextTime.value;
  var selectedHowMany = inputTextHowMany.value;

  
  docRef.set({
    city: selectedCity,
    place: selectedPlace,
    date: selectedDate,
    time: selectedTIme,
    howMany: selectedHowMany
  }).then(function () {
    console.log("uploaded data!")
  }).catch(function (error) {
    console.log("error:", error)
  });
});


function isSignIn() {
  var user = firebase.auth().currentUser;
  if(user) {
    window.location.replace("./pages/makeup.html");
  }else {
    window.location.replace("./pages/signin.html")
  }
}

$(document).ready(function(){
  $(".t-datepicker").tDatePicker({
    autoClose: true,
    limitNextMonth: 3,
    numCalendar : 1,
    dateRangesHover: false
  })
});
