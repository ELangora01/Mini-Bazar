
/*
let count=document.getElementById('headCount');
count.innerText=localStorage.getItem('cartCount') ?? 0;
let cartArr=JSON.parse(localStorage.getItem('cartItems')) ?? [];
function updateCount(item,index){
    console.log('button clicked')
    let c=count.innerText;
    c++;
    count.innerText=c;
    localStorage.setItem('cartCount',c);
    cartArr.push(item);
    localStorage.setItem('cartItems',JSON.stringify(cartArr))

}

function displayProductPageMsg(){
    let leftDiv=document.getElementById('left');
    let existingMsg = leftDiv.querySelector('.product-message');
    if (existingMsg) {
        leftDiv.removeChild(existingMsg);
    }
    productPageMsg=document.createElement('p');
    productPageMsg.textContent="Product added to cart successfully";
    productPageMsg.style.color="green";
    productPageMsg.className = 'product-message';
   leftDiv.appendChild(productPageMsg);

}
function displayIndexPageMsg(index){
    let indexPageMsg=document.querySelectorAll('.product')[index];//[index] is used to select the particular product
    let existingMessage=indexPageMsg.querySelector('.pro-message')
    if(existingMessage){
        indexPageMsg.removeChild(existingMessage)
    }
    let cartSuccess=document.createElement('p');
    cartSuccess.innerText="Product added to cart successfully";
    cartSuccess.style.color="green";
    cartSuccess.className="pro-message"
    indexPageMsg.appendChild(cartSuccess);

}

*/
