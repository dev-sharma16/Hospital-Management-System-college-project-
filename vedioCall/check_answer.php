<?php
$appointment_id = $_GET['appointment_id'];
$conn = mysqli_connect("localhost:3307", "root", "1234", "doctordata");

$result = mysqli_query($conn, "SELECT answer FROM videocall_signals WHERE appointment_id = '$appointment_id'");
$row = mysqli_fetch_assoc($result);

echo json_encode(['answer' => $row['answer'] ?? null]);
?>
