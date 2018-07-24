//Auth
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

//loading
function loadingAni() {
  $('.loading__circle').animate({
    'margin': '0.5rem'
  }, 500, function () {
    $('.loading__circle').animate({
      'margin': '0'
    }, 500)
    loadingAni();
  })
}
loadingAni();

//data download
let searchValue = "";

function getSearchValue() {
  const db = firebase.firestore();
  const docRefSearch = db.doc("searchValue/value");

  return docRefSearch.get().then(function (doc) {
    if (doc.exists) {
      searchValue = doc.data().selectedCity
    } else {
      console.log("No such document!");
    }
    return searchValue
  });
}


function getDataList() {
  const db = firebase.firestore();
  const docRef = db.collection("donghang");
  let dataList = [];

  return docRef.where("city", "==", searchValue).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      let key = doc.id;
      let data = doc.data();

      dataList = [...dataList, data];

    });

    dataList.map(function (data, i) {

      let addLi = document.createElement('li');
      let addDivForTitle = document.createElement('div');
      let addDivForContent = document.createElement('div');
      let addParaForCity = document.createElement('p');
      let addParaForPlace = document.createElement('p');
      let addParaForDate = document.createElement('p');
      let addParaForTime = document.createElement('p');
      let addParaForHowMany = document.createElement('p');
      let addParaForContent = document.createElement('p');


      addLi.classList.add('board__list-item');
      addDivForTitle.classList.add('board__list-title', 'heading-tertiary');
      addDivForContent.classList.add('board__content', 'para');

      document.querySelector('.board__list').appendChild(addLi);
      document.querySelectorAll('.board__list-item')[i].appendChild(addDivForTitle);
      document.querySelectorAll('.board__list-item')[i].appendChild(addDivForContent);
      document.querySelectorAll('.board__content')[i].appendChild(addParaForCity);
      document.querySelectorAll('.board__content')[i].appendChild(addParaForPlace);
      document.querySelectorAll('.board__content')[i].appendChild(addParaForDate);
      document.querySelectorAll('.board__content')[i].appendChild(addParaForTime);
      document.querySelectorAll('.board__content')[i].appendChild(addParaForHowMany);
      document.querySelectorAll('.board__content')[i].appendChild(addParaForContent);



      addDivForTitle.innerHTML = data.title;
      addParaForCity.innerHTML = `도시: ${data.city}`;
      addParaForPlace.innerHTML = `장소: ${data.place}`;
      addParaForDate.innerHTML = `날짜: ${data.date}`;
      addParaForTime.innerHTML = `시간: ${data.time}`;
      addParaForHowMany.innerHTML = `동행인원: ${data.howMany}`;
      addParaForContent.innerHTML = `내용: ${data.content}`;

    })
    return dataList;
  });
}

async function asyncCall() {
  //loading 
  document.querySelector('.loading').classList.add('ing');
  const searchValue = await getSearchValue();
  const dataList = await getDataList();
  //done 
  document.querySelector('.loading').classList.remove('ing');
  listOpenContent();
}
asyncCall();

//tab menu
$('.board__menu').each(function (index) {

  $('.board__list').eq(0).css("display", "block");

  $(this).on("click", function () {
    $(this).addClass('board__menu-on').siblings().removeClass('board__menu-on');
    $('.board__list').eq(index).css("display", "block").
    siblings().css("display", "none");
  })
})

function listOpenContent() {
  $('.board__list-item').each(function (index) {
    $(this).on("click", function () {
      $(this).find('.board__content').slideToggle();
      $(this).siblings().find('.board__content').css("display", "none");
    })
  })
}