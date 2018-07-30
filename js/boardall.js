//Auth
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

//loading
function loadingAni() {
  $('.loading__circle').animate({
    'margin': '0.5rem'
  }, 400, function () {
    $('.loading__circle').animate({
      'margin': '0'
    }, 400)
    loadingAni();
  })
}
loadingAni();

//all board
const boardAll = document.querySelector('.boardAll');
boardAll.addEventListener('click', function () {
  window.location.href = '../pages/boardall.html';
})

//data download

function currentDateNum() {
  const date = new Date();
  let getYear = date.getFullYear();
  let getMonthNum = date.getMonth();
  let getDate = date.getDate();
  
  if(getMonthNum < 9){
    getMonth = `0${getMonthNum+1}`
  } else {
    getMonth = getMonthNum + 1
  }

  let currentDateString = `${getYear}${getMonth}${getDate}`;
  let currentDate = parseInt(currentDateString);
  
  return currentDate;
}

function getDataList() {
  const db = firebase.firestore();
  const docRef = db.collection("donghang");
  const currentDate = currentDateNum();
  let dataList = [];

  return docRef.where("dateNum",">",currentDate).orderBy("dateNum").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      let key = doc.id;
      let data = doc.data();

      dataList = [...dataList, data];

    });

    dataList.map(function (data, i) {
      let addLi = document.createElement('li');
      let addDivForTitle = document.createElement('div');
      let addDivForDetail = document.createElement('div');
      let addDivForDetailRow1 = document.createElement('div');
      let addDivForDetailRow2 = document.createElement('div');
      let addDivForDetailAbsol = document.createElement('div');
      let addDivForTitle2 = document.createElement('h1');
      let addParaForCity = document.createElement('h2');
      let addParaForPlace = document.createElement('h2');
      let addParaForDate = document.createElement('h3');
      let addParaForTime = document.createElement('h3');
      let addParaForHowMany = document.createElement('h3');
      let addParaForContent = document.createElement('p');
      let addDivForContact = document.createElement('div');

      addLi.classList.add('board__list-item');
      addDivForTitle.classList.add('board__list-title', 'heading-secondary', 'heading-secondary--white');
      addDivForDetail.classList.add('detail__content');
      addDivForDetailRow1.classList.add('detail__row1');
      addDivForDetailRow2.classList.add('detail__row2');
      addDivForDetailAbsol.classList.add('detail__absol');
      addDivForTitle2.classList.add('detail-h1');
      addParaForCity.classList.add('detail-h2');
      addParaForPlace.classList.add('detail-h2');
      addParaForDate.classList.add('detail-h3');
      addParaForTime.classList.add('detail-h3');
      addParaForHowMany.classList.add('detail-h3');
      addParaForContent.classList.add('detail-p');
      addDivForContact.classList.add('detail__contact', 'detail-h2');

      document.querySelector('.board__list').appendChild(addLi);
      document.querySelector('.detail__modal').appendChild(addDivForDetail);
      document.querySelectorAll('.board__list-item')[i].appendChild(addDivForTitle);
      document.querySelectorAll('.detail__content')[i].appendChild(addDivForTitle2);

      document.querySelectorAll('.detail__content')[i].appendChild(addDivForDetailRow1);
      document.querySelectorAll('.detail__content')[i].appendChild(addDivForDetailRow2);
      document.querySelectorAll('.detail__content')[i].appendChild(addDivForDetailAbsol);

      document.querySelectorAll('.detail__row1')[i].appendChild(addParaForCity);
      document.querySelectorAll('.detail__row1')[i].appendChild(addParaForPlace);
      document.querySelectorAll('.detail__row2')[i].appendChild(addParaForDate);
      document.querySelectorAll('.detail__row2')[i].appendChild(addParaForTime);
      document.querySelectorAll('.detail__content')[i].appendChild(addParaForHowMany);
      document.querySelectorAll('.detail__content')[i].appendChild(addParaForContent);
      document.querySelectorAll('.detail__absol')[i].appendChild(addDivForContact);

      let number = '';
      if (i < 9) {
        number = `0${i+1}`
      } else {
        number = `${i+1}`
      }

      document.querySelector('.board__total').innerHTML = `TOTAL ${dataList.length}`
      addDivForTitle.innerHTML = `<p class="tiny-para">${number}&nbsp;&nbsp;-&nbsp;</p>${data.title}`;
      addDivForTitle2.innerHTML = `<p class="detail-p-title">제목.&nbsp;</p>${data.title}`;
      addParaForCity.innerHTML = `<p class="detail-p-title">도시.&nbsp;</p> ${data.city}`;
      addParaForPlace.innerHTML = `<p class="detail-p-title">여행지.&nbsp;</p> ${data.place}`;
      addParaForDate.innerHTML = `<p class="detail-p-title">날짜.&nbsp;</p> ${data.date}`;
      addParaForTime.innerHTML = `<p class="detail-p-title">시간.&nbsp;</p> ${data.time}`;
      addParaForHowMany.innerHTML = `<p class="detail-p-title">최대인원.&nbsp;</p> ${data.howMany}명`;
      addParaForContent.innerHTML = `<p class="detail-p-title">내용.&nbsp;</p> ${data.content}`;
      addDivForContact.innerHTML = `<p class="detail-p-title kakao-title">카카오톡ID.&nbsp;</p> ${data.kakao}`;

      document.querySelectorAll('.detail__contact')[i].addEventListener('click', function(){
        seeProfile(data.kakao)
      })

    })
    return dataList;
  });
}

async function asyncCall() {
  //loading 
  document.querySelector('.loading').classList.add('ing');
  const dataList = await getDataList();
  //done 
  document.querySelector('.loading').classList.remove('ing');
  openListDetail();
}
asyncCall();

//list and content
function openListDetail() {
  $('.board__list-item').each(function (index) {
    $(this).on("click", function () {
      $('.detail__content').eq(index).animate({
        "right": "0",
        "opacity": "1"
      }, 500).siblings('.detail__content').animate({
        "right": "-50rem",
        "opacity": "0"
      })
      $('.detail__content').eq(index).css("display", "block").siblings('.detail__content').css("display", "none");
      $(this).addClass('active').siblings().removeClass('active');
      $(this).find('.board__list-title').addClass('active').parent().siblings().find('.board__list-title').removeClass('active');
    })
  })
}

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
//re-search ani
$('.side-nav').on('click', function() {
  
  if($(this).hasClass("down")){
    $('.re-search').animate({
      "bottom": "0"
    });
    $(this).addClass("up").removeClass("down");
  } else {
    $('.re-search').animate({
      "bottom": "-54rem"
    });
    $(this).addClass("down").removeClass("up");
  }
 
})

//see kakao profile
function seeProfile(kakaoId) {
  $('.kakao-profile__id').html(kakaoId);
  $('.kakao-profile-back').addClass('kakao-profile-back__scaleUp')
  $('.kakao-profile').css("display", "block");

}

//close kakao profile

$('.kakao-profile__closer').on('click', function(){
  $('.kakao-profile-back').removeClass('kakao-profile-back__scaleUp')
  $('.kakao-profile').css("display", "none");
})