let personName=document.getElementById('name');
let personEmail=document.getElementById('email');
let personMsg=document.getElementById('suggestion');
let emptyIndicator=document.querySelector('.fieldIndicator p')
function sendEmail(){
    if(personName.value==""||personEmail.value==""||personMsg.value==""){
        emptyIndicator.textContent="*Enter all fields";
        emptyIndicator.style.color="red";
    }
    else{
    var params={
        name:personName.value,
        email:personEmail.value,
        message:personMsg.value
    };
    const serviceId="service_ywsa0ui";
    const templateId="template_2dhyzgs";
    emailjs.send(serviceId,templateId,params)
    .then((response)=>{
        alert(`hey ${personName.value} your feedback sent successfully`)
       console.log(response)
        document.getElementById('name').value="";
        document.getElementById('email').value="";
        document.getElementById('suggestion').value="";
        
    })
    .catch((error)=>{
        console.log(error)
    })
}
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
