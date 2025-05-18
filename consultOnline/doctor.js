
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
  let appointmentId = null; // Set this from booking confirmation (optional if you can fetch it)



  // Get speciality from URL (eg: ?speciality=Cardiologist)
  const params = new URLSearchParams(window.location.search);
  const selectedSpeciality = params.get('speciality');

  fetch('../php/getDoctors.php')
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
      docCard.classList.add('doctor-card');
      docCard.innerHTML = `
      <div class="doctor-card-inner">
          <div class="doctor-image">
            <img src="${doctor.Profile_Image}" alt="${doctor.name}">
          </div>
        <div class="doctor-details">
          <h3>${doctor.name}</h3>
          <p><strong>${doctor.experience} years, ${doctor.speciality}</strong></p>
          <p><strong>${doctor.qualification}</strong></p>
          <p>Languages: ${doctor.languages || "English, Hindi"}</p>
          <p>${doctor.discription}</p>
        </div>
        
        <div class="doctor-appointment">
          <p><strong>Mon - Sat</strong></p>
          <p>(${doctor["appnt_time_from"]} - ${doctor["appnt_time_to"]})</p>
          <button onclick="bookCall('${doctor.Id}')">BOOK AN VIDEO CALL</button>
        </div>
      </div>
  `;
      container.appendChild(docCard);
    });
  }

  //function bookCall(id) {
  //  alert("Booking video call with doctor ID: " + id);
  //}

//for Slide tab👇

// function bookCall(Id) {
//   document.getElementById('doctor_id').value = Id;
//   document.getElementById('slideForm').style.right = '0';

//   startPolling();
// }

function bookCall(Id) {
  document.getElementById('doctor_id').value = Id;
  document.getElementById('slideForm').style.right = '0';

  const form = document.getElementById('appointmentForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const phone = formData.get('patient_phonenum');

    // ✅ Store phone for polling
    localStorage.setItem('patient_phone', phone);

    // Send booking data to server
    fetch(form.action, {
      method: 'POST',
      body: formData
    })
      .then(res => res.text())
      .then(_msg => {
        alert("Appointment booked. Now waiting for doctor's call...");
        startPolling(); // ✅ Now polling starts after booking
      });
  }, { once: true }); // prevent multiple bindings
}


function closeSlide() {
  document.getElementById('slideForm').style.right = '-490px';
}
 



// function showPopupToAccept(offerSdp, appointmentId) {
//   if (confirm("Doctor is calling you. Accept?")) {
//     // open the video call page with offer in URL
//     // const offerEncoded = encodeURIComponent(offerSdp);
//     // window.open(`../vedioCall/patient_call.html?offer=${offerEncoded}&appointment_id=${appointmentId}`, '_blank');
//     window.open(`../vedioCall/patient_call.html?appointment_id=${appointmentId}`, '_blank');
//   } else {
//     console.log("Patient rejected the call.");
//   }
// }

  function showPopupToAccept(offerSdp, appointmentId) {
    if (confirm("Doctor is calling you. Accept?")) {
      // Save offer in localStorage
      localStorage.setItem("offer_sdp", JSON.stringify(offerSdp));
      localStorage.setItem("appointment_id", appointmentId);

      // Open clean call page
      // window.open("../vedioCall/patient_call.html", "_blank");
        window.location.href = "../vedioCall/patient_call.html";

      // setTimeout(() => {
      //   window.open("../vedioCall/patient_call.html", "_blank");
      // }, 500); // wait half a second to ensure it's stored
    }
  }


  function startPatientCall(offerSdp, appointmentId) {
    const peer = new RTCPeerConnection();

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        document.body.innerHTML += '<video autoplay muted id="localV"></video><video autoplay id="remoteV"></video>';
        document.getElementById("localV").srcObject = stream;
        stream.getTracks().forEach(track => peer.addTrack(track, stream));

        peer.ontrack = (e) => {
          document.getElementById("remoteV").srcObject = e.streams[0];
        };

        peer.setRemoteDescription({ type: "offer", sdp: offerSdp });

        peer.createAnswer().then(answer => {
          peer.setLocalDescription(answer);
          sendAnswerToServer(answer.sdp, appointmentId);
        });
      });
  }

  function sendAnswerToServer(answerSdp, appointmentId) {
    fetch('../vedioCall/send_answer.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: answerSdp, appointment_id: appointmentId })
    });
  }




// Start polling
function startPolling(){

  // setInterval(() => {
  //   fetch(`../vedioCall/check_offer.php?phone=${phone}`)  // Use phone number to match
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.offer && !window.offerReceived) {
  //         window.offerReceived = true;
  //         showPopupToAccept(data.offer, data.appointment_id);
  //       }
  //     });
  // }, 3000);

   const phone = localStorage.getItem('patient_phone');
  console.log("Polling started for phone:", phone);
  if (!phone) {
    console.warn("No patient phone found in localStorage.");
    return;
  }

  setInterval(() => {
    console.log("Polling server for offer...");
    fetch(`../vedioCall/check_offer.php?phone=${phone}`)
      .then(res => res.json())
      .then(data => {
        console.log("Offer data received:", data);
        if (data.offer && !window.offerReceived) {
          window.offerReceived = true;

        // Save offer SDP to localStorage here!
        localStorage.setItem("offer_sdp", JSON.stringify(data.offer));
        localStorage.setItem("appointment_id", data.appointment_id);

          showPopupToAccept(data.offer, data.appointment_id);
        }
      })
      .catch(err => console.error('Polling error:', err));
  }, 3000);
}
  
window.showPopupToAccept = showPopupToAccept;
