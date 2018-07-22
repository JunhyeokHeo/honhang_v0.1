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
  var selectedDate = inputTextDate.value;
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
  if (user) {
    window.location.replace("./pages/makeup.html");
  } else {
    window.location.replace("./pages/signin.html")
  }
}
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

//date picker API
$('#selectedDate').fdatepicker({
  format: 'yyyy/mm/dd'
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
