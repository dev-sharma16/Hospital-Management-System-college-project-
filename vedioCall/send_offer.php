<?php
$data = json_decode(file_get_contents("php://input"), true);
$conn = mysqli_connect("127.0.0.1:3307", "root", "1234", "doctordata");
echo"connection done";

// // Remove old entries (optional)
mysqli_query($conn, "DELETE FROM videocall_signals WHERE appointment_id = '{$data['appointment_id']}'");

// Insert new offer
$stmt = $conn->prepare("INSERT INTO videocall_signals (appointment_id, doctor_id, offer) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $data['appointment_id'], $data['doctor_id'], $data['offer']);
$stmt->execute();
echo "Offer saved";

?>
