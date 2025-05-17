<?php
$data = json_decode(file_get_contents("php://input"), true);
$conn = mysqli_connect("localhost:3307", "root", "1234", "doctordata");

$stmt = $conn->prepare("UPDATE videocall_signals SET answer = ?, patient_response = 'accepted' WHERE appointment_id = ?");
$stmt->bind_param("si", $data['answer'], $data['appointment_id']);
$stmt->execute();
echo "Answer saved";



?>
