<?php
session_start();
if (!isset($_SESSION['doctor_logged_in'])) {
  header("Location: doctor_login.php");
  exit;
}
$appointment_id = $_GET['appointment_id'];
$doctor_id = $_GET['doctor_id'];
// echo $appointment_id."and".$doctor_id;
?>

<html>
  <head>
    <title>Doctor Video Call</title>
    <style>
      
      body {
        /* height:calc(100% - 100px); */
        font-family: Arial, sans-serif;
        background: linear-gradient(to right, #8ff2ff, #f9f9f9, #8ff2ff);
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:center;
      }
    
      h3 {
        margin-top: 30px;
        color: #2c3e50;
        font-size: 28px;
        font-weight: bold;
      }
    
      .video-container {
        background:rgba(237, 242, 243, 0.2);
        height:;
        width:fit-content;
        display: flex;
        justify-content: center;
        align-items:center;
        margin: 20px 100px;
        border-radius:25px  ;
        gap: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        padding:20px;
      }
    
      video {
        
        background: black;
        border: 2px solid #3498db;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }
      #localVideo{
        width: 50vw;
        height: 35vw;
      }
      #remoteVideo{
        width: 20vw;
        height: 20vw;
      }
    
      @media screen and (max-width: 1000px) {
        video {
          width: 90%;
          height: auto;
        }
      }
    </style>

    </style>
  </head>
  <body>
  <h3></h3>
  <div class="video-container">
    <video id="localVideo" autoplay ></video>
    <video id="remoteVideo" autoplay></video>
  </div>
  
  <!-- <script>
    let localStream, peerConnection;
    const appointmentId = "<?php echo $appointment_id; ?>";
    const doctorId = "<?php echo $doctor_id; ?>";
    console.log(`${appointmentId} and ${doctorId}`);
  
    // Start local camera
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      document.getElementById("localVideo").srcObject = stream;
      localStream = stream;
  
      // Create peer connection
      peerConnection = new RTCPeerConnection();
  
      // Add stream to connection
      localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
  
      // When remote track received
      peerConnection.ontrack = (e) => {
        document.getElementById("remoteVideo").srcObject = e.streams[0];
      };
  
      // Create and send offer
      peerConnection.createOffer().then(offer => {
        peerConnection.setLocalDescription(offer);
        sendOfferToServer(offer);
      });
  
    }).catch(err => alert("Camera error: " + err));
  
    function sendOfferToServer(offer) {
      fetch('./send_offer.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointment_id: appointmentId, doctor_id: doctorId, offer: offer.sdp })
      });
    }
  
    // Poll every 3 seconds for patient answer
    setInterval(() => {
      fetch(`./check_answer.php?appointment_id=${appointmentId}`)
        .then(res => res.json())
        .then(data => {
          if (data.answer && !peerConnection.remoteDescription) {
            peerConnection.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: data.answer }));
          }
        });
    }, 3000);
  </script> -->
  
  <script>
    async function startCall() {
      let stream = null;
      const appointmentId = "<?php echo $appointment_id; ?>";
      const doctorId = "<?php echo $doctor_id; ?>";
      console.log(`${appointmentId} and ${doctorId}`);
    
      try {
        // Try to get both video and audio
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        console.log("Video and audio access granted.");
      } catch (videoError) {
        try {
          // If video fails, try audio only
          stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
          alert("No camera found. Continuing with audio only.");
          console.log("Audio-only access granted.");
        } catch (audioError) {
          alert("No microphone or camera available. Cannot start call.");
          console.error("Media error:", audioError);
          return;
        }
      }
    
      // Show local stream in the video element (video will be blank if only audio)
      document.getElementById("localVideo").srcObject = stream;
    
      // Continue with setting up the peer connection
      const peer = new RTCPeerConnection();
    
      // Add all tracks (audio or video) to the peer connection
      stream.getTracks().forEach(track => {
        peer.addTrack(track, stream);
      });
    
      // Create offer and send to server
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
    
      // Send offer to backend via fetch
      fetch("send_offer.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: appointmentId,
          doctor_id: doctorId,
          offer: JSON.stringify(peer.localDescription)
        })
      })
      .then(res => res.text())
      .then(msg => console.log("Offer sent:", msg))
      .catch(err => console.error("Error sending offer:", err));
    
      // Polling for answer from patient
      const checkAnswerInterval = setInterval(async () => {
        const res = await fetch(`check_answer.php?appointment_id=1`);
        const data = await res.json();
      
        if (data.answer) {
          clearInterval(checkAnswerInterval);
          const remoteDesc = new RTCSessionDescription(JSON.parse(data.answer));
          await peer.setRemoteDescription(remoteDesc);
        }
      }, 3000);
    
      // When remote track is received
      peer.ontrack = event => {
        document.getElementById("remoteVideo").srcObject = event.streams[0];
      };
    }
  
    // Start the call when page loads or button clicked
    startCall();
  </script>
  
  </body>
</html>
