document.addEventListener("DOMContentLoaded", function () {
  onLoad();
});

const categoryFilter = document.getElementById("categoryFilter");
const genderFilter = document.getElementById("genderFilter");
const clearFilter = document.getElementById("clearFilter");

function onLoad() {
  displayDoctors(doctorData);
  categoryFilter.selectedIndex = 0;
  genderFilter.selectedIndex = 0;
}

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
                <button class="appointment-btn">BOOK AN APPOINTMENT</button>
            </div>
        </div>
        `;
  });
  displayElements.innerHTML = innerHtml;
}

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
