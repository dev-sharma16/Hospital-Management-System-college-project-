// // const params = new URLSearchParams(window.location.search);
// // const offerSDP = params.get("offer");
// // const appointmentId = params.get("appointment_id");

// // const offerSDP = JSON.parse(localStorage.getItem("offer_sdp"));
// const appointmentId = localStorage.getItem("appointment_id");

// const peer = new RTCPeerConnection({
//   iceServers: [
//     { urls: "stun:stun.l.google.com:19302" }
//   ]
// });

// // ✅ Add this immediately after creating the peer
// peer.ontrack = (event) => {
//   console.log("Doctor's video received on patient.");
//   document.getElementById("remoteVideo").srcObject = event.streams[0];
// };

// //Add local vedio
// navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//   .catch(() => {
//     alert("No camera found. Joining with audio only.");
//     return navigator.mediaDevices.getUserMedia({ video: false, audio: true });
//   })
//   .then(stream => {
//     if (!stream) {
//       alert("Mic/Camera not found. Cannot join call.");
//       return;
//     }

//     document.getElementById("localVideo").srcObject = stream;
//     stream.getTracks().forEach(track => peer.addTrack(track, stream));


//     // Get offer from localStorage
//     const offerString = localStorage.getItem("offer_sdp");

//       if (!offerString) {
//           alert("No offer found. Please refresh or wait for the doctor to start the call.");
//           return;
//       }

//       let offerSDP;
//       try {
//           offerSDP = JSON.parse(offerString);
//       } catch (e) {
//           alert("Failed to parse offer SDP. Please refresh.");
//           return;
//       }

//       if (!offerSDP.type || !offerSDP.sdp) {
//           alert("Invalid offer data. Please refresh or try again.");
//           return;
//       }

//      // Set remote offer and send answer
//     peer.setRemoteDescription(new RTCSessionDescription(offerSDP))
//       .then(() => peer.createAnswer())
//       .then(answer => {
//         peer.setLocalDescription(answer);
//         sendAnswer(answer.sdp);
//       })
//       .catch(err => {
//         console.error("SDP Error: ", err);
//       });
//   });

// function sendAnswer(answerSdp) {
//   fetch('../vedioCall/send_answer.php', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       answer: answerSdp,
//       appointment_id: appointmentId
//     })
//   });
// }



//NEW👇

const appointmentId = localStorage.getItem("appointment_id");
const offerSDP = localStorage.getItem("offer_sdp");

const peer = new RTCPeerConnection({
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
});

// ICE candidates from patient to server
peer.onicecandidate = (event) => {
  if (event.candidate) {
    fetch('../vedioCall/send_ice_candidate.php', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appointment_id: appointmentId,
        candidate: event.candidate
      })
    }).then(res => res.json())
      .then(data => console.log("ICE candidate sent:", data))
      .catch(err => console.error("ICE send error:", err));
  }
};

// Show remote stream
peer.ontrack = (event) => {
  document.getElementById("remoteVideo").srcObject = event.streams[0];
};

(async () => {
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  } catch {
    stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    alert("No camera, using audio only.");
  }

  document.getElementById("localVideo").srcObject = stream;
  stream.getTracks().forEach(track => peer.addTrack(track, stream));

  if (!offerSDP) {
    alert("No offer found. Please wait or refresh.");
    return;
  }

  const offer = JSON.parse(offerSDP);
  await peer.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);

  await fetch('../vedioCall/send_answer.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      appointment_id: appointmentId,
      answer: JSON.stringify(answer)
    })
  });
})();
