<?php
$phone = $_GET['phone'] ?? '';
$conn = mysqli_connect("localhost", "root", "", "doctordata");

if (!$phone) {
    echo json_encode(["error" => "Phone number missing"]);
    exit;
}

// Get latest appointment for this phone
$apt = mysqli_query($conn, "SELECT id FROM appointments WHERE patient_phonenum = '$phone' ORDER BY id DESC LIMIT 1");
$aptRow = mysqli_fetch_assoc($apt);
$appointment_id = $aptRow['id'] ?? 0;

$result = mysqli_query($conn, "SELECT offer FROM videocall_signals WHERE appointment_id = '$appointment_id'");
$row = mysqli_fetch_assoc($result);

// echo json_encode([
//   'offer' => $row['offer'] ?? null,
//   'appointment_id' => $appointment_id
// ]);

$offerJson = $row['offer'] ?? null;

// Decode it if it's a JSON string, otherwise set to null
$offerDecoded = $offerJson ? json_decode($offerJson, true) : null;

echo json_encode([
  'offer' => $offerDecoded,
  'appointment_id' => $appointment_id
]);

?>
