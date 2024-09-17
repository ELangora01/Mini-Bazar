


let exploreBtn=document.getElementById('explore');
exploreBtn.addEventListener('click', explore)
function explore(){

    window.location.href="../html/allProducts.html";
 
}

//--------------------Navigation to allProducts page------------------------

function navigateToCategory(category) {
  window.location.href = `../html/allProducts.html?category=${category}`;
}



//-----------------------------SignOut------------------------------

let signOutBtn=document.getElementById('signOut');
signOutBtn.addEventListener('click',sign_out)

function sign_out(){
    history.pushState(null, '', '../index.html');
    location.replace('../index.html');
}



//------------------------------Menu-----------------------

let menuOptions=document.querySelector('.menu');
 
let homeMenuShowBtn=document.querySelector('.menuShow img');
let homeMenuHideBtn=document.querySelector('.menuHide img');
homeMenuHideBtn.classList.add('hide');
let homeMenuBtn=document.getElementById('menu_Button');
homeMenuBtn.addEventListener('click',visible);
function visible(){
  menuOptions.classList.toggle('visible');
  homeMenuShowBtn.classList.toggle('hide');
  homeMenuHideBtn.classList.toggle('show');
}

