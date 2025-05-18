<?php
  $conn = mysqli_connect("localhost", "root", "", "doctordata");
  
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