//------------------------------Menu-----------------------

let menuOptions=document.querySelector('.menu');
 
let menuShowBtn=document.querySelector('.menuShow img');
let menuHideBtn=document.querySelector('.menuHide img');
menuHideBtn.classList.add('hide');
let homeMenuBtn=document.getElementById('menu_Button');
homeMenuBtn.addEventListener('click',visible);
function visible(){
  menuOptions.classList.toggle('visible');
  menuShowBtn.classList.toggle('hide');
  menuHideBtn.classList.toggle('show');
}