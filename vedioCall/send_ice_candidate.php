<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

// Get raw POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['appointment_id']) || !isset($data['candidate'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing appointment_id or candidate"]);
    exit;
}

$appointment_id = $data['appointment_id'];
$candidate = $data['candidate'];  // This is an associative array

// Convert the ICE candidate to JSON string for storage
$candidate_json = json_encode($candidate);

// Connect to MySQL
$conn = new mysqli("localhost:3307", "root", "1234", "doctordata");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

// Save to DB
$stmt = $conn->prepare("INSERT INTO ice_candidates (appointment_id, candidate, role) VALUES (?, ?, 'patient')");
$stmt->bind_param("ss", $appointment_id, $candidate_json);
if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Insert failed"]);
}
$conn->close();
?>
