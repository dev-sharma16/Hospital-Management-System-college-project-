<?php
session_start();
if (!isset($_SESSION['doctor_logged_in'])) {
  header("Location: doctor_login.php");
  exit;
}
$appointment_id = $_GET['appointment_id'];
$doctor_id = $_GET['doctor_id'];
?>

<!DOCTYPE html>
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
      #remoteVideo{
        width: 50vw;
        height: 35vw;
      }
      #localVideo{
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
</head>
<body>
  <h2>Doctor Video Call</h2>
  <div class="video-container">
    <video id="remoteVideo" autoplay></video>
    <video id="localVideo" autoplay muted></video>
  </div>

  <script>
    const appointmentId = "<?php echo $appointment_id; ?>";
    const doctorId = "<?php echo $doctor_id; ?>";
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    // ICE candidates: send to server
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        fetch("send_ice_candidate.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appointment_id: appointmentId,
            candidate: event.candidate
          })
        });
      }
    };

    // Show remote stream
    peer.ontrack = (event) => {
      document.getElementById("remoteVideo").srcObject = event.streams[0];
    };

    async function startCall() {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
        alert("No camera, using audio only.");
      }

      document.getElementById("localVideo").srcObject = stream;
      stream.getTracks().forEach(track => peer.addTrack(track, stream));

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      // Send offer to patient
      await fetch("send_offer.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: appointmentId,
          doctor_id: doctorId,
          offer: JSON.stringify(offer)
        })
      });

      // Poll for answer
      const interval = setInterval(async () => {
        const res = await fetch(`check_answer.php?appointment_id=${appointmentId}`);
        const data = await res.json();

        if (data.answer) {
          clearInterval(interval);
          await peer.setRemoteDescription(new RTCSessionDescription(JSON.parse(data.answer)));
        }
      }, 2000);
    }

    startCall();
  </script>
</body>
</html>
