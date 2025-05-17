const params = new URLSearchParams(window.location.search);
const offerSDP = params.get("offer");
const appointmentId = params.get("appointment_id");

const peer = new RTCPeerConnection();

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .catch(() => {
    alert("No camera found. Joining with audio only.");
    return navigator.mediaDevices.getUserMedia({ video: false, audio: true });
  })
  .then(stream => {
    if (!stream) {
      alert("Mic/Camera not found. Cannot join call.");
      return;
    }

    document.getElementById("localVideo").srcObject = stream;
    stream.getTracks().forEach(track => peer.addTrack(track, stream));

    peer.ontrack = (event) => {
      document.getElementById("remoteVideo").srcObject = event.streams[0];
    };

    peer.setRemoteDescription({ type: "offer", sdp: offerSDP });

    peer.createAnswer().then(answer => {
      peer.setLocalDescription(answer);
      sendAnswer(answer.sdp);
    });
  });

function sendAnswer(answerSdp) {
  fetch('../vedioCall/send_answer.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      answer: answerSdp,
      appointment_id: appointmentId
    })
  });
}
