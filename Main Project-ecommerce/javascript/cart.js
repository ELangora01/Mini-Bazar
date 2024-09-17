
let cartLeftDiv=document.getElementById('cartLeft');
let cartItems=JSON.parse(localStorage.getItem('cartItems'));
let cartCount=JSON.parse(localStorage.getItem('cartCount'))

let cartEmptyMsg=document.querySelectorAll('.cartEmpty')
    cartEmptyMsg.forEach(msg => msg.classList.add('hide'));

    function emptyCart(count) {
        if (count === 0) {
            cartEmptyMsg.forEach(msg => {
                msg.classList.remove('hide');
                msg.classList.add('show');
            });
        } else {
            cartEmptyMsg.forEach(msg => {
                msg.classList.remove('show');
                msg.classList.add('hide');
            });
        }
    }
    




function cartLeftDisplay(data) {
    cartLeftDiv.innerHTML = ''; // Clear existing items

    data.forEach((product, index) => {
        const cartDiv = document.createElement('div');
        cartDiv.classList.add('cartItem');

        const cartImg = document.createElement('div');
        cartImg.classList.add('cartImg');

        const cartImage = document.createElement('img');
        cartImage.src = product.thumbnail;
        cartImage.alt = product.title;
        let cartProImgLink = document.createElement('a');
        cartProImgLink.appendChild(cartImage);
        cartProImgLink.href = `../html/product.html?pid=${product.id}`;
        cartImg.append(cartProImgLink);

        const cartDec = document.createElement('div');
        cartDec.classList.add('cartDec');

        const cartTitle = document.createElement('h5');
        cartTitle.textContent = product.title;
        let cartProLink = document.createElement('a');
        cartProLink.appendChild(cartTitle);
        cartProLink.href = `../html/product.html?pid=${product.id}`;

        const cartModelDiv = document.createElement('div');
        cartModelDiv.classList.add('cartModelDiv');
        const cartProModelText = document.createElement('b');
        cartProModelText.innerText = "Model: ";
        const cartProModel = document.createElement('p');
        cartProModel.innerText = product.sku;
        cartModelDiv.append(cartProModelText, cartProModel);

        const cartPriceDiv = document.createElement('div');
        cartPriceDiv.classList.add('cartPriceDiv');
        const cartMrpPrice = document.createElement('del');
        const mrp = ((((product.discountPercentage / 100) * product.price) + product.price) * 83).toFixed(2);
        cartMrpPrice.innerText = "₹" + mrp;
        const cartPrice = document.createElement('h4');
        const cartIndianPrice = ((product.price) * 83).toFixed(2);
        cartPrice.textContent = "₹" + cartIndianPrice;
        const cartDiscount = document.createElement('b');
        cartDiscount.innerText = product.discountPercentage + "% off";
        cartDiscount.style.color = "green";

        cartPriceDiv.append(cartMrpPrice, cartPrice, cartDiscount);

        const cartRemoveButton = document.createElement('button');
        cartRemoveButton.textContent = "Remove";
        cartRemoveButton.addEventListener('click', () => removeCart(index)); // Only pass index

        cartDec.append(cartProLink, cartModelDiv, cartPriceDiv, cartRemoveButton);
        cartDiv.append(cartImg, cartDec);
        cartLeftDiv.appendChild(cartDiv);
    });
}



//----------------Right Side-----------------------------------------------------

const cartRightDiv=document.getElementById('cartRight');
cartRightDiv.classList.add('cartRightDiv')

function cartRight(data,index){
    if(index<=0){
        cartRightDiv.innerHTML="";
        cartRightDiv.style.padding=0;
    }
   
    if(index>0){
    cartRightDiv.innerHTML="";
const PriceDetails=document.createElement('h4');
PriceDetails.innerText="PRICE DETAILS"

// ------------ actual price------------------

const originalPriceDiv=document.createElement('div')
originalPriceDiv.classList.add('originalpriceDiv');

    const originalPrice=document.createElement('p');
    originalPrice.innerText=`Price (${index} items)`
    const originalPriceValue=document.createElement('p');
    const originalValue=data.reduce((prev,curr)=>{
        let mrp=(((curr.discountPercentage/100)*curr.price)+curr.price)*83;
        return prev+parseFloat(mrp)
    },0)
    originalPriceValue.innerText="₹ "+originalValue.toFixed(2);
    originalPriceDiv.append(originalPrice,originalPriceValue);

//-----------discount-------------------------------------

const discountDiv=document.createElement('div');
discountDiv.classList.add('discountDiv');
    const discountPrice=document.createElement('p');
    discountPrice.innerText="Discount";
    const discountPriceValue=document.createElement('p');
    const discountValue=data.reduce((prev,curr)=>{
        let cartDiscount=(((curr.discountPercentage/100)*curr.price)*83);
        return prev+parseFloat(cartDiscount)
    },0)
    discountPriceValue.innerText="- ₹ "+discountValue.toFixed(2);
    discountPriceValue.style.color="green";
    discountDiv.append(discountPrice,discountPriceValue)

    //-------------------final price----------------------------

const cartRightFinalPriceDiv=document.createElement('div');
cartRightFinalPriceDiv.classList.add('cartRightFinalPriceDiv')

   const cartRightFinalPrice=document.createElement('h5');
   cartRightFinalPrice.innerText="Total Amount"
   const cartRightFinalPriceValue=document.createElement('h5');
    const total=data.reduce((prev,curr)=>{
        let indianPrice=(curr.price*83);
        return prev+parseFloat(indianPrice);
    },0)
    cartRightFinalPriceValue.innerText="₹ "+total.toFixed(2);
    cartRightFinalPriceDiv.append(cartRightFinalPrice,cartRightFinalPriceValue);

    //----------------Saved Message------------------------------
    const savedMsg=document.createElement('h6');
    savedMsg.innerText=`You will save ₹ ${discountValue.toFixed(2)} on this order`;
    savedMsg.style.color="green"

cartRightDiv.append(PriceDetails,originalPriceDiv,discountDiv,cartRightFinalPriceDiv,savedMsg)
    }

}

//-----------------removing product in cart--------------------------------

    function removeCart(index) {
        let items = JSON.parse(localStorage.getItem('cartItems')) || [];
        let count = JSON.parse(localStorage.getItem('cartCount')) || 0;

    
        if (index >= 0 && index < items.length) {
            items.splice(index, 1); // Remove item at the given index
    
            // Update localStorage with the new cartItems
            localStorage.setItem('cartItems', JSON.stringify(items));
            
            // Update cartCount
            count--;
            localStorage.setItem('cartCount', JSON.stringify(count));
            document.getElementById("headCount").textContent = count;
            emptyCart(count);
            cartRight(items, count);
            cartLeftDisplay(items); // Use the updated items list
        }
    }
    



emptyCart(cartCount);
cartLeftDisplay(cartItems);
cartRight(cartItems,cartCount);


//-------------------------------------------Cart Count----------------------------

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

//--------------------------------------Sign Out-----------------------------

let signOutBtn=document.getElementById('sign-out');
signOutBtn.addEventListener('click',sign_out)

function sign_out(){
    history.pushState(null, '', '../index.html');
    location.replace('../index.html');
}



