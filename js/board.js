//Auth
function isSignIn() {
  if (user) {
    window.location.replace("./pages/makeup.html");
  } else {
    window.location.replace("./pages/signin.html")
  }
}

//data download
var firestore = firebase.firestore();
const docRef = firestore.collection("donghang");


docRef.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
  });
});

//menu
$('.board__menu').each(function (index) {
  
  $('.board__list').eq(0).css("display", "block");

  $(this).on("click", function () {
    $(this).addClass('board__on').siblings().removeClass('board__on');
    $('.board__list').eq(index).css("display", "block").
    siblings().css("display", "none");
    
  })

});

