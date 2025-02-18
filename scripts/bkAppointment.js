document.addEventListener("DOMContentLoaded", function () {
  onLoad();
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  const overlay2 = document.getElementById("overlay2");

  hamburgerBtn.addEventListener("click", function () {
    mobileMenu.style.right = "0";
    overlay2.style.display = "block";
  });

  closeMenuBtn.addEventListener("click", function () {
    mobileMenu.style.right = "-70%";
    overlay2.style.display = "none";
  });

  overlay2.addEventListener("click", function () {
    mobileMenu.style.right = "-70%";
    overlay2.style.display = "none";
  });

  appointmentPage.style.right = "-100%";
  overlay3.style.display = "none";
  
  // logic for specialites section
  const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get("category");

    if (selectedCategory) {
       
        // document.getElementById("categoryFilter").value = selectedCategory;
        const filteredDoctors = doctorData.filter(
          (doc) => doc.category === selectedCategory
        );
        displayDoctors(filteredDoctors);
    }
        

});

const categoryFilter = document.getElementById("categoryFilter");
const genderFilter = document.getElementById("genderFilter");
const clearFilter = document.getElementById("clearFilter");

const overlay3 = document.getElementById("overlay3");
const appointmentPage = document.getElementById("appointmentPage");
const closeBtn = document.getElementById("closeBtn");
let selectedDoctor = null;
let selectedDate = null;
let selectedTime = null;

function onLoad() {
  displayDoctors(doctorData);
  categoryFilter.selectedIndex = 0;
  genderFilter.selectedIndex = 0;
}

// function for displaying doctorlist
function displayDoctors(doctorList) {
  let displayElements = document.querySelector(".doctors");
  if (!displayElements) {
    return;
  }

  if (doctorList.length === 0) {
    displayElements.innerHTML = `<p class="no-results">No results found ..!</p>`;
    return;
  }

  let innerHtml = "";
  doctorList.forEach((item) => {
    innerHtml += `
        <div class="doctor-card">
            <div class="left-section">
                <img src="${item.image}" alt="Dr Jaganmani Sreekanth">
            </div>
            <div class="right-section">
                <h2>${item.docName}</h2>
                <a href="#" class="speciality">${item.year}, ${item.category}</a>
                <p class="deg">${item.degree}</p>
                <p>${item.language}</p>
                <p class="decs">${item.description}</p>
            </div>
            <div class="appointment-section">
                <p class="days">Mon - Sat</p>
                <p class="time">${item.appntTime}</p>
                <button class="appointment-btn" onclick="openAppointment(${item.id})">BOOK AN APPOINTMENT</button>
            </div>
        </div>
        `;
  });
  displayElements.innerHTML = innerHtml;
}

// filter for doctor list
categoryFilter.addEventListener("change", function () {
  const selectedCategory = categoryFilter.value;
  const filteredDoctors = doctorData.filter(
    (doc) => doc.category === selectedCategory
  );
  if (genderFilter.value !== "") {
    filteredDoctors = filteredDoctors.filter(
      (doc) => doc.gender === genderFilter.value
    );
  }
  displayDoctors(filteredDoctors);
});

genderFilter.addEventListener("change", function () {
  const selectedCategory = categoryFilter.value;
  const selectedGender = genderFilter.value;
  let filteredDoctors = doctorData;

  if (selectedCategory !== "") {
    filteredDoctors = filteredDoctors.filter(
      (doc) => doc.category === selectedCategory
    );
  }
  if (selectedGender !== "") {
    filteredDoctors = filteredDoctors.filter(
      (doc) => doc.gender === selectedGender
    );
  }
  displayDoctors(filteredDoctors);
});

clearFilter.addEventListener("click", function () {
  categoryFilter.selectedIndex = 0;
  genderFilter.selectedIndex = 0;
  displayDoctors(doctorData);
});

// appointment form
function openAppointment(doctorId) {
  selectedDoctor = doctorData.find((doc) => doc.id == doctorId);

  document.getElementById("docName").innerText = selectedDoctor.docName;
  document.getElementById("docImage").src = selectedDoctor.image;
  document.getElementById("docCat").innerText = selectedDoctor.category;

  loadDates();
  loadTimes(selectedDoctor.availableTimes);

  document.getElementById("userForm").style.display = "none";
  document.getElementById("appointmentConfirmation").style.display = "none";

  appointmentPage.style.right = "0";
  overlay3.style.display = "block";
}

closeBtn.addEventListener("click", function () {
  appointmentPage.style.right = "-100%";
  overlay3.style.display = "none";
});
overlay3.addEventListener("click", function () {
  appointmentPage.style.right = "-100%";
  overlay3.style.display = "none";
});

function loadDates() {
  const datesContainer = document.querySelector(".dates-container");
  datesContainer.innerHTML = "";
  
  let date = new Date();
  date.setDate(date.getDate() + 1); 

  for (let i = 0; i < 14; i++) { 
      if (date.getDay() === 0) { 
          date.setDate(date.getDate() + 1);
          continue;
      }

      let dateBox = document.createElement("div");
      dateBox.innerText = `${date.toLocaleString("en-US", { weekday: "short" })} ${date.getDate()}`;
      dateBox.classList.add("date-box");
      
      dateBox.onclick = function () {
          document.querySelectorAll(".date-box").forEach(box => box.classList.remove("selected-date"));
          dateBox.classList.add("selected-date");
          
          selectedDate = new Date(date);
          loadTimes(selectedDoctor.availableTimes);
      };

      datesContainer.appendChild(dateBox);
      date.setDate(date.getDate() + 1);
  }
}

function loadTimes(timeArray) {
  const timeContainer = document.querySelector(".time-slots");
  timeContainer.innerHTML = "";
  
  timeArray.forEach((time) => {
      let timeBox = document.createElement("div");
      timeBox.innerText = time;
      timeBox.classList.add("time-box");
      
      timeBox.onclick = function () {
          document.querySelectorAll(".time-box").forEach(box => box.classList.remove("selected-time"));
          timeBox.classList.add("selected-time");
          
          selectedTime = time;
          document.getElementById("userForm").style.display = "block";
      };

      timeContainer.appendChild(timeBox);
  });
}

document.getElementById("submitBtn").addEventListener("click", function () {
  const userName = document.getElementById("userName").value;
  const userPhone = document.getElementById("userPhone").value;

  if (userName && userPhone) {
      document.getElementById("appointmentConfirmation").innerHTML = `
          <h3>Appointment Confirmed</h3>
          <p><strong>Doctor:</strong> ${selectedDoctor.docName}</p>
          <p><strong>Date:</strong> ${selectedDate.toDateString()}</p>
          <p><strong>Time:</strong> ${selectedTime}</p>
      `;

      document.getElementById("appointmentConfirmation").style.display = "block";
      document.getElementById("userForm").style.display = "none"; 
  } else {
      alert("Please fill in all details.");
  }
});