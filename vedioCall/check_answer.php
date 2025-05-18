<?php
// $appointment_id = $_GET['appointment_id'];
// $conn = mysqli_connect("localhost:3307", "root", "1234", "doctordata");

// $result = mysqli_query($conn, "SELECT answer FROM videocall_signals WHERE appointment_id = '$appointment_id'");
// $row = mysqli_fetch_assoc($result);

// echo json_encode(['answer' => $row['answer'] ?? null]);

$appointment_id = $_GET['appointment_id'];
$conn = new mysqli("localhost", "root", "", "doctordata");

$sql = "SELECT answer FROM videocall_signals WHERE appointment_id = '$appointment_id'";
$result = $conn->query($sql);

$response = [];

if ($row = $result->fetch_assoc()) {
    if (!empty($row['answer'])) {
        $response['answer'] = $row['answer'];
    }
}

echo json_encode($response);
?>
