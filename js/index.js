//Auth
function isSignIn() {
  var user = firebase.auth().currentUser;
  if (user) {
    if(user.emailVerified){
      window.location.replace("./pages/makeup.html");
    }else {
      window.location.replace("./pages/auth.html");
    }
  } else {
    window.location.replace("./pages/signin.html")
  }
}

//data search

const db = firebase.firestore();
const docRefSearch = db.doc("searchValue/value");
const inputTextCity = document.querySelector('#selectedCity');
const inputTextPlace = document.querySelector('#selectedPlace');
const inputTextDate = document.querySelector('#selectedDate');
const inputTextTime = document.querySelector('#selectedTime');
const inputTextHowMany = document.querySelector('#selectedHowMany');
const searchButton = document.querySelector('#searchButton');


searchButton.addEventListener('click', function () {
  var selectedCity = inputTextCity.value;
  var selectedPlace = inputTextPlace.value;
  var selectedDate = inputTextDate.value;
  var selectedTIme = inputTextTime.value;
  var selectedHowMany = inputTextHowMany.value;

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

//nav bar toggle
var scrollState = true;
$(window).scroll(function () {
  var nav = $(".header-container");

  if ($(window).scrollTop() > nav.height() && scrollState == true) {
    nav.addClass('scrolled');
    $(".header__logo").attr("src", "./img/logo-black.png");
    $(".header__icon").attr("src", "./img/down-arrow-black.png");
    scrollState = false;
  } else if ($(window).scrollTop() <= nav.height() && scrollState == false) {
    nav.removeClass('scrolled');
    $(".header__icon").attr("src", "./img/down-arrow.png");
    $(".header__logo").attr("src", "./img/logo-white.png");
    scrollState = true;
  }
});

//nav bar navigate

$('.scrollNavi-social').find('a').on("click", function () {
  $('html, body').animate({
    scrollTop: $('.section-social').offset().top
  }, 1000)
});
$('.scrollNavi-intro').find('a').on("click", function () {
  $('html, body').animate({
    scrollTop: $('.section-intro').offset().top - 300
  }, 1000)
});
$('.scrollNavi-category').find('a').on("click", function () {
  $('html, body').animate({
    scrollTop: $('.section-category').offset().top - 100
  }, 1000)
});

//image slider
var imageIndex = 0;

function imageSlide() {
  const images = $(".bg-image__pic");
  images.each(function (pic) {
    images[pic].style.display = "none";
  });
  imageIndex++;
  if (imageIndex > images.length) {
    imageIndex = 1
  };
  images[imageIndex - 1].style.display = "block";
  setTimeout(imageSlide, 10000);
}

imageSlide();