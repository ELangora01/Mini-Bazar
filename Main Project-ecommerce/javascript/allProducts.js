

    let mainDiv=document.getElementById('productsList');

    const fetchData=async()=>{
        const response=await fetch('https://dummyjson.com/products')
        const data=await response.json();
        console.log(data)
        displayData(data.products)
    }

    
    function displayData(data){
        mainDiv.textContent='';
        data.forEach((val,i) => {
            proDiv=document.createElement('div');
            proDiv.classList.add('product');
            proImage=document.createElement('img');
            proImage.src=val.thumbnail;
            proImage.alt=val.title;
            const proImageLink=document.createElement('a');
            proImageLink.appendChild(proImage);
            proImageLink.href=`./product.html?pid=${val.id}`;
            const proTitle = document.createElement('h5');
            proTitle.textContent = val.title;
            const proPrice=document.createElement('h4');
            proPrice.textContent=`Price: ₹ ${((val.price)*83).toFixed(2)}`;
            const proLink=document.createElement('a');
            proLink.append(proTitle);
            proLink.href=`../html/product.html?pid=${val.id}`;
            const proButton=document.createElement('button');
            proButton.textContent="ADD to Cart";
            proButton.addEventListener('click',()=>{

                updateCount(val,i)

            displayIndexPageMsg(i)

        });
            proDiv.append(proImageLink,proLink,proPrice,proButton);
            mainDiv.appendChild(proDiv)
            
        });
       
    }



let count=document.getElementById('headCount');
count.innerText=localStorage.getItem('cartCount') ?? 0;
let cartArr=JSON.parse(localStorage.getItem('cartItems')) ?? [];
function updateCount(item,index){
    let c=count.innerText;
    c++;
    count.innerText=c;
    localStorage.setItem('cartCount',c);
    cartArr.push(item);
    localStorage.setItem('cartItems',JSON.stringify(cartArr))

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
    
    
    
    
    const categoriesList = document.querySelector('.categoriesList');
    
    function fetchCategories() {
        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then((data) => {
                categoriesList.innerHTML = ''; // Clear any existing checkboxes
                const filterText=document.createElement('h2') // To show filter text on the screen above the check box
                filterText.textContent="Filter"
                categoriesList.appendChild(filterText)
    
                data.forEach((d) => {
                    const label = document.createElement('label');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = d.slug;
                    checkbox.className = 'category-checkbox';
                    label.textContent=d.name;
                    label.prepend(checkbox);
                   
                    categoriesList.appendChild(label);
                });
    
                // Add event listener to checkboxes
                categoriesList.addEventListener('change', function (e) {
                        handleCheckboxChange();   
                });
            })
            .catch((err) => console.log(err));
    }
    fetchCategories();
    
    function handleCheckboxChange() {
        const selectedCategories = [];
    document.querySelectorAll('.category-checkbox:checked').forEach((checkedBoxes) => {
        selectedCategories.push(checkedBoxes.value);
    });
    
            if(selectedCategories.length===0){
                mainDiv.innerHTML=''
                fetchData();
            }
    
        if (selectedCategories.length > 0) {
            Promise.all(selectedCategories.map(cat =>
                fetch(`https://dummyjson.com/products/category/${cat}`)
                    .then(res => res.json())
                    .then(data => data.products)
            ))
            // adding all extracted products to an array allProducts
            .then(results => {
                const allProducts = [];
                results.forEach((subArray)=>{
                    allProducts.push(...subArray)
                })
                displayData(allProducts);
            })
            .catch(err => console.log(err));
        }
    }
    
    

    //------------------------------Menu-----------------------



let menuShowBtn=document.querySelector('.menuShow img');
let menuHideBtn=document.querySelector('.menuHide img');
menuHideBtn.classList.add('hide');
let menuBtn=document.getElementById('menu_Button');
menuBtn.addEventListener('click',visible);
function visible(){
  categoriesList.classList.toggle('visible');
  menuShowBtn.classList.toggle('hide');
  menuHideBtn.classList.toggle('show');
}


//--------------------------------------Sign Out-----------------------------

let signOutButton=document.getElementById('sign-out');
signOutButton.addEventListener('click',sign_out)

function sign_out(){
    history.pushState(null, '', '../index.html');
    location.replace('../index.html');
}
    
//--------------------Display only specific category products from home.html------------------------

    function fetchAndDisplayProducts(category) {
        let url;
        if (category) {
            url = `https://dummyjson.com/products/category/${category}`;
        } else {
            fetchData();
        }
    
        fetch(url)
            .then((response) => response.json())
            .then((data) => displayData(data.products))
            .catch((err) => console.log(err));
    }




    // Function to check for query parameters and fetch category data
function handleQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    fetchAndDisplayProducts(category);
}
handleQueryParams();










