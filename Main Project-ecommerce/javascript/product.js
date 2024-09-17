const parameter=new URLSearchParams(window.location.search);
const pid=parameter.get('pid');
const fetchData=async()=>{
    const res=await fetch(`https://dummyjson.com/products/${pid}`)
    const data= await res.json();
    displayData(data)
}
fetchData();
let leftDiv=document.getElementById('left');
let rightDiv=document.getElementById('right');
function displayData(data){
    // ----------------------left side--------------------------
    let proImage=document.createElement('img');
    proImage.src=data.thumbnail;
    proImage.alt=data.title;
    let addCartButton=document.createElement('button');
    addCartButton.innerText="Add To Cart";
    addCartButton.addEventListener('click',()=>{
        updateCount(data);
        displayProductPageMsg();

    });// calling this fn present in common.js
    leftDiv.append(proImage,addCartButton);


    function displayProductPageMsg(){
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
//----------------------- right side----------------------------
    let proTitle=document.createElement('h2');
    proTitle.textContent=data.title;
    let proDesc=document.createElement('p');
    proDesc.innerText=data.description;
    let price=document.createElement('div');
    price.classList.add('finalPrice')
    let discount=document.createElement('h4');
    discount.textContent="- "+data.discountPercentage+"%";
    discount.style.color="red"
    let proPrice=document.createElement('h2');
    let indianPrice=((data.price)*83).toFixed(2);
    proPrice.innerText="₹ "+indianPrice;
    price.append(discount,proPrice);
    let mrpPrice=document.createElement('del');
    let mrp=((((data.discountPercentage/100)*data.price)+data.price)*83).toFixed(2);
    mrpPrice.textContent="₹ "+mrp;
    let tax=document.createElement('p');
    tax.innerText="Inclusive of all taxes"
    let specification=document.createElement('h3');
    specification.innerText="Product information:"
    //----------------table Data---------------------------------
    let specificationTable=document.createElement('table')
    let firstRow=document.createElement('tr');
    let brand=document.createElement('th');
    brand.innerText="Brand  ";
    let brandvalue=document.createElement('td');
    brandvalue.innerText=data.brand;
    if(!data.brand){

    }
    else{
    firstRow.append(brand,brandvalue);
    }
    
    let secondRow=document.createElement('tr');
    let model=document.createElement('th');
    model.innerText="Model  ";
    let modalValue=document.createElement('td');
    modalValue.innerText=data.sku;
    secondRow.append(model,modalValue);

    let thirdRow=document.createElement('tr');
    let warranty=document.createElement('th');
    warranty.innerText="Warranty  ";
    let WarrantyValue=document.createElement('td');
    WarrantyValue.innerText=data.warrantyInformation;
    thirdRow.append(warranty,WarrantyValue);

    let fourthRow=document.createElement('tr');
    let ShippingInfo=document.createElement('th');
    ShippingInfo.innerText="Shipping Information  ";
    let shippingInfoValue=document.createElement('td');
    shippingInfoValue.innerText=data.shippingInformation;
    fourthRow.append(ShippingInfo,shippingInfoValue)

    let fifthRow=document.createElement('tr');
    let availability=document.createElement('th');
    availability.innerText="Availability  ";
    let availabilityValue=document.createElement('td');
    availabilityValue.innerText=data.availabilityStatus;
    availabilityValue.style.color="rgb(0, 100, 0)"
    fifthRow.append(availability,availabilityValue)

    specificationTable.append(firstRow,secondRow,thirdRow,fourthRow,fifthRow);
   
    //------------------------------------------------------------------------------------

    let ProductImage=document.createElement('h3');
    ProductImage.innerText="Product Images :"
    let proImages=document.createElement('div')
    let imageArr=data.images||[];
    imageArr.forEach(image => {
        let productsImg=document.createElement('div');
        productsImg.classList.add('moreProductImages');
        let moreProductImg=document.createElement('img');
        moreProductImg.src=image;
        moreProductImg.style.maxWidth="50vw"
        productsImg.append(moreProductImg);
        proImages.append(productsImg)
    });

    //---------------------reviews-----------------------------------------------------------
    let reviewText=document.createElement('h3');
    reviewText.innerText="Reviews :"
    let allReviews=document.createElement('div');
    allReviews.classList.add('allReviews')
    

    let reviewArr=data.reviews||[]
    reviewArr.forEach(data => {
    var reviews=document.createElement('div');
    reviews.classList.add('reviewData');
    
    let reviewUser=document.createElement('div');
    reviewUser.classList.add('reviewUser');
    let userImage=document.createElement('img');
    userImage.src="../assets/user-solid.svg";
    userImage.alt="User Image";
    userImage.style.maxWidth="30px"
    userImage.style.maxHeight="30px"
    let reviewerName=document.createElement('b');
    reviewerName.innerText=data.reviewerName;
    reviewUser.append(userImage,reviewerName);
    reviews.append(reviewUser);

    let reviewStars=document.createElement('div');
        reviewStars.classList.add('reviewStars');
    for(let i=0;i<data.rating;i++){
        
        let individualStar=document.createElement('span');
        let stars=document.createElement('img');
        stars.src="../assets/star-solid.svg";
        stars.alt="Star Emoji"
        stars.style.maxWidth="30px";
        stars.style.maxheight="30px";
        individualStar.append(stars);
        reviewStars.appendChild(individualStar)
        if(data.rating>=4){
        reviewStars.style.backgroundColor="green";
        }
        else if(data.rating>=3){
            reviewStars.style.backgroundColor="orange";
        }
        else if(data.rating<=2){
            reviewStars.style.backgroundColor="red";
        }
        
        reviews.append(reviewStars)
    }

    let comment=document.createElement('p');
    comment.innerText=data.comment;
    reviews.append(comment)
    allReviews.append(reviews)

    });
    
    rightDiv.append(proTitle,proDesc,price,mrpPrice,tax,specification,specificationTable,ProductImage,proImages,reviewText,allReviews);
    
}

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