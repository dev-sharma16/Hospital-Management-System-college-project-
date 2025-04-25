
//    //fetch('getDoctors.php')
//    fetch('http://localhost/Adding_DocData/getDoctors.php')
//      .then(response => response.json())
//      .then(data => {
//        const container = document.getElementById('doctor-container');
//    
//        data.forEach(doctor => {
//          const docCard = document.createElement('div');
//          docCard.innerHTML = `
//            <h3>${doctor.name}</h3>
//            <p>Speciality: ${doctor.speciality}</p>
//            <p>Experience: ${doctor.experience} years</p>
//            <p>Timing: ${doctor["appnt_time_from"]} to ${doctor["appnt_time_to"]}</p>
//            <button onclick="bookCall('${doctor.id}')">Book Video Call</button>
//          `;
//          container.appendChild(docCard);
//        });
//      });
//    
//    function bookCall(id) {
//      alert("Booking video call with doctor ID: " + id);
//    }



  let allDoctors = [];

  // Get speciality from URL (eg: ?speciality=Cardiologist)
  const params = new URLSearchParams(window.location.search);
  const selectedSpeciality = params.get('speciality');

  fetch('http://localhost/Adding_DocData/getDoctors.php')
    .then(res => res.json())
    .then(data => {
      allDoctors = data;
      if (selectedSpeciality && selectedSpeciality !== 'All') {
        const filtered = allDoctors.filter(doc => doc.speciality.toLowerCase() === selectedSpeciality.toLowerCase());
        displayDoctors(filtered);
      } else {
        displayDoctors(allDoctors);
      }
    });

  function displayDoctors(doctors) {
    const container = document.getElementById('doctor-container');
    container.innerHTML = '';

    doctors.forEach(doctor => {
      const docCard = document.createElement('div');
      docCard.innerHTML = `
        <h3>${doctor.name}</h3>
        <img src="${doctor.Profile_Image}" alt="${doctor.name}">
      <p>Experience: ${doctor.experience} years</p>
        <p>Speciality: ${doctor.speciality}</p>
        <p>Qualification: ${doctor.qualification} years</p>
        <p>Discription: ${doctor.discription} years</p>
        <p>Timing: ${doctor["appnt_time_from"]} to ${doctor["appnt_time_to"]}</p>
        <button onclick="bookCall('${doctor.Id}') ">Book Video Call</button>
      `;
      container.appendChild(docCard);
    });
  }

  //function bookCall(id) {
  //  alert("Booking video call with doctor ID: " + id);
  //}

//for Slide tab👇

function bookCall(Id) {
  document.getElementById('doctor_id').value = Id;
  document.getElementById('slideForm').style.right = '0';
}

function closeSlide() {
  document.getElementById('slideForm').style.right = '-400px';
}
 


