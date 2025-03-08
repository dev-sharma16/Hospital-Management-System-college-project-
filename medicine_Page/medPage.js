
let bagItems = [];
onLoad()

function onLoad(){
    let bagItemsStr = localStorage.getItem('bagItems');   // get the items from bagitems[] array saves from refresh claer.
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayItemCount();

}


// pushes the item according to the id in the bagItems[] array 👇 also stores it in local storage
function addToBag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayItemCount();
}

//updates the number of items in cart icon 👇
function displayItemCount(){
    let bagItemCountElement = document.querySelector('.bag-item-count');
    if(bagItems.length > 0){
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText = bagItems.length;
    }else{
        bagItemCountElement.style.visibility = 'hidden';
    }
}



//this function runs the carousel👇
document.addEventListener("DOMContentLoaded", function(){
    //first_Carousel
    const carousel1 = document.querySelector('#carousel1');
    const prevBtn1 = document.querySelector('#prev-btn1');
    const nextBtn1  = document.querySelector('#next-btn1');
    addProducts('carousel1', products1);
    

    nextBtn1.addEventListener('click',() => { 
        carousel1.scrollBy({left:250, behavior: 'smooth'})
    })

    
    prevBtn1.addEventListener('click',() => { 
        carousel1.scrollBy({left:-250, behavior: 'smooth'})
    })

//Second_Carousel
const carousel2 = document.querySelector('#carousel2');
const prevBtn2 = document.querySelector('#prev-btn2');
const nextBtn2  = document.querySelector('#next-btn2');
adBannerSlider('carousel2', products2);


nextBtn2.addEventListener('click',() => { 
    carousel2.scrollBy({left:250, behavior: 'smooth'})
})


prevBtn2.addEventListener('click',() => { 
    carousel2.scrollBy({left:-250, behavior: 'smooth'})
})


    //Third_Carousel
    const carousel3 = document.querySelector('#carousel3');
    const prevBtn3 = document.querySelector('#prev-btn3');
    const nextBtn3  = document.querySelector('#next-btn3');
    addProducts('carousel3', products3);
    

    nextBtn3.addEventListener('click',() => { 
        carousel3.scrollBy({left:250, behavior: 'smooth'})
    })

    
    prevBtn3.addEventListener('click',() => { 
        carousel3.scrollBy({left:-250, behavior: 'smooth'})
    })
});


//this is the dynamic method for entering the products 👇 
function addProducts(carouselId, products) {

    const carousel = document.getElementById(carouselId);
    if(!carousel){
        return;
    }


    products.forEach(product => {
        carousel.innerHTML += 
        `
        <div class="product">
            <img src="../assets/assetsSlider/${product.image}" alt="">
            <p>${product.name}</p>
            <span class="price">${product.price} </span>
            <span class="mrp">${product.mrp} </span>
            <span class="discount"> ${product.discount} </span>
            <button class="add-btn" onclick="addToBag(${product.id})" >ADD</button>
        </div>
        `;
    });

}

//this is the dynamic method for entering the adBanner 👇 
function adBannerSlider(carouselId, adBanner) {

    const carousel = document.getElementById(carouselId);

    adBanner.forEach(product => {
        carousel.innerHTML += 
        `
        
            <img  class="ad-banner" src="../assets/assetsSlider/${product.image}" alt="">
        
        `;
    });

}