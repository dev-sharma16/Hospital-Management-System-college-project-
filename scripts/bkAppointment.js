onLoad();

function onLoad(){
    displayDoctors();
}


function displayDoctors() {
    let displayElements = document.querySelector(".doctors");
    if(!displayElements){
        return;
    }

    let innerHtml ="";
    doctorList.forEach((item)=> {
      
        innerHtml +=`
        <div class="doctor-card">
            <div class="left-section">
                <img src="${item.image}" alt="Dr Jaganmani Sreekanth">
            </div>
            <div class="right-section">
                <h2>${item.docName}</h2>
                <a href="#" class="speciality">${item.yrCat}</a>
                <p class="deg"></p>${item.degree}</p>
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
    })
    ;displayElements.innerHTML = innerHtml;

}
