console.log('Ram Ram');
console.log(bagItems);

const CONVENIENCE_FEE = 99;
let BagItemsObjects = [];
let allProducts = [...products1,...products3];
onLoad();

function onLoad(){
  loadBagItemsObjects();
  displayBagItems();
  displayBagSummary();
}


// 👇 this function will load the items from bagItems[] to BagItemsObjects[];
function loadBagItemsObjects(){
    console.log(bagItems);
    BagItemsObjects = bagItems.map(itemId => {

        

      for(i=0 ; i<=allProducts.length ; i++){
        if(itemId == allProducts[i].id){
          return allProducts[i];
        }
      }
    });
    console.log(BagItemsObjects);
  }

// 👇 this function take item from BagItemsObjects[] and print it in html content;
function displayBagItems(){
    // console.log(bagItems);
    
    let containerElement = document.querySelector('.bag-items-container');
    let innerHTML ='';
    BagItemsObjects.forEach(bagItem =>{
      innerHTML += generateItemHtml(bagItem);
    })
    containerElement.innerHTML =innerHTML;
}

function removeFromBag(itemId){
  bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadBagItemsObjects();
  displayItemCount()
  displayBagItems();
  displayBagSummary();
}

// 👇 html from products
  function generateItemHtml(item){
    return `<div class="bag-item-container">
                <div class="item-left-part">
                  <img class="bag-item-img" src="../../assets/assetsSlider/${item.image}">
                </div>
                <div class="item-right-part">
                  <div class="company">${item.name}</div>
                  <div class="price-container">
                    <span class="current-price">Rs ${item.price}</span>
                    <span class="original-price">Rs ${item.mrp}</span>
                    <span class="discount-percentage">(${item.discount})</span>
                  </div>
                  <div class="return-period">
                    <span class="return-period-days">${item.return_period} days</span> return available
                  </div>
                  <div class="delivery-details">
                    Delivery by
                    <span class="delivery-details-days">${item.delivery_date}</span>
                  </div>
                </div>
    
              <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
              </div> `;
  }


// 👇 this whole function will lode the bag summary
function displayBagSummary(){
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalItem = BagItemsObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
    
    
    BagItemsObjects.forEach(bagItem => {
      totalMRP += bagItem.price;
      totalDiscount += bagItem.price - bagItem.mrp;
    });
  
    let totalPayment = totalMRP - totalDiscount + CONVENIENCE_FEE;

    if(BagItemsObjects == 0){
      return;
    }
    
    bagSummaryElement.innerHTML = ` <div class="bag-details-container">
                <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
                <div class="price-item">
                  <span class="price-item-tag">Total MRP</span>
                  <span class="price-item-value">Rs${totalMRP}</span>
                </div>
                <div class="price-item">
                  <span class="price-item-tag">Discount on MRP</span>
                  <span class="price-item-value priceDetail-base-discount">Rs${totalDiscount}</span>
                </div>
                <div class="price-item">
                  <span class="price-item-tag">Convenience Fee</span>
                  <span class="price-item-value">Rs 99</span>
                </div>
                <hr>
                <div class="price-footer">
                  <span class="price-item-tag">Total Amount</span>
                  <span class="price-item-value">Rs${totalPayment}</span>
                </div>
              </div>
              <button class="btn-place-order">
                <div class="css-xjhrni">PLACE ORDER</div>
              </button>`
  }
  


