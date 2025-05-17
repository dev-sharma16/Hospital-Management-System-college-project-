<?php
  $conn = mysqli_connect("localhost:3307", "root", "1234", "doctordata");
  
  $appointment_id = $_GET['appointment_id'] ?? '';
  
  if (!$appointment_id) {
      // echo json_encode(['error' => 'Missing appointment_id']);
      echo json_encode(['offer' => null]);
  
      exit;
  }
  
  $res = mysqli_query($conn, "SELECT offer FROM videocall_signals WHERE appointment_id = '$appointment_id'");
  $row = mysqli_fetch_assoc($res);
  
  echo json_encode(['offer' => $row['offer'] ?? null]);

?>