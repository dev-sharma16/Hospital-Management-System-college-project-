document.addEventListener("DOMContentLoaded", function () {
  // hamburger menu
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  const overlay2 = document.getElementById("overlay2");

hamburgerBtn.addEventListener("click",function(){
  mobileMenu.style.right="0";
  overlay2.style.display="block";
});

closeMenuBtn.addEventListener("click",function(){
  mobileMenu.style.right="-70%";
  overlay2.style.display="none"
});

overlay2.addEventListener("click",function(){
  mobileMenu.style.right="-70%";
  overlay2.style.display="none"
})


// booking form
const openFormBtn = document.getElementById("openFormBtn");
const openFormBtnEnd = document.getElementById("openFormBtnEnd");
const openFormMobile = document.getElementById("openFormMobile")
const closeFormBtn = document.getElementById("closeFormBtn");
const bookingFormContainer = document.getElementById("bookingFormContainer");
const overlay = document.getElementById("overlay");
const bookingForm = document.getElementById("bookingForm");
const confirmationMessage = document.getElementById("confirmationMessage");

function openBookingForm(event) {
  // event.preventDefault(); 
  bookingFormContainer.classList.add("show");
  overlay.classList.add("show");
}

openFormBtn.addEventListener("click", openBookingForm);
openFormBtnEnd.addEventListener("click", openBookingForm);
openFormMobile.addEventListener("click", openBookingForm);

closeFormBtn.addEventListener("click", function () {
  bookingFormContainer.classList.remove("show");
  overlay.classList.remove("show");
});

overlay.addEventListener("click", function () {
  bookingFormContainer.classList.remove("show");
  overlay.classList.remove("show");
});

bookingForm.addEventListener("submit", function (event) {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let phone = document.getElementById("phone").value;
  let testType = document.getElementById("testType").value;

  // Basic validation
  if (!name || !age || !phone || !testType) {
    event.preventDefault(); // Prevent form submission if validation fails
    confirmationMessage.textContent = "Please fill in all fields.";
    return false;
  }
  
  // Phone number validation (optional)
  if (phone.length < 10) {
    event.preventDefault();
    confirmationMessage.textContent = "Please enter a valid phone number.";
    return false;
  }

  
  console.log("User Details:");
  console.log("Name:", name);
  console.log("Age:", age);
  console.log("Phone:", phone);
  console.log("Selected Test:", testType);
  
  // The form will be submitted and handled by PHP
});

});