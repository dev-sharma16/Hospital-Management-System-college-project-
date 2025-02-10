const openFormBtn = document.getElementById("openFormBtn");
const openFormBtnEnd = document.getElementById("openFormBtnEnd");
const closeFormBtn = document.getElementById("closeFormBtn");
const bookingFormContainer = document.getElementById("bookingFormContainer");
const overlay = document.getElementById("overlay");
const bookingForm = document.getElementById("bookingForm");
const confirmationMessage = document.getElementById("confirmationMessage");

// openFormBtn.addEventListener("click", function (event) {
//   event.preventDefault();
//   bookingFormContainer.classList.add("show");
//   overlay.classList.add("show");
// });
function openBookingForm(event) {
  event.preventDefault(); 
  bookingFormContainer.classList.add("show");
  overlay.classList.add("show");
}

openFormBtn.addEventListener("click", openBookingForm);
openFormBtnEnd.addEventListener("click", openBookingForm);

closeFormBtn.addEventListener("click", function () {
  bookingFormContainer.classList.remove("show");
  overlay.classList.remove("show");
});

overlay.addEventListener("click", function () {
  bookingFormContainer.classList.remove("show");
  overlay.classList.remove("show");
});

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let phone = document.getElementById("phone").value;
  let testType = document.getElementById("testType").value;

  console.log("User Details:");
  console.log("Name:", name);
  console.log("Age:", age);
  console.log("Phone:", phone);
  console.log("Selected Test:", testType);

  if (name && age && phone && testType) {
    confirmationMessage.textContent = `Thank you, ${name}. Your ${testType} has been booked successfully!`;
    bookingForm.reset();

  } else {
    confirmationMessage.textContent = "Please fill in all fields.";
  }
});
