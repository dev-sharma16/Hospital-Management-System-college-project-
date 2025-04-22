<?php

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
// error_log("Received date: " . $data['date']); // Check the date in server logs

include('database.php');

// Add headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Check database connection
if (!$conn) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
}

// Get JSON input from request body
$data = json_decode(file_get_contents('php://input'), true);


// Validate required fields
if (!isset($data['doctors']) || !isset($data['date']) || !isset($data['time']) || 
    !isset($data['name']) || !isset($data['mobile_no'])) 
{
    die(json_encode(['status' => 'error', 'message' => 'Missing required fields']));
}

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO user_bkappointment (doctors, date, time, name, mobile_no) 
                        VALUES (?, ?, ?, ?, ?)");

if (!$stmt) {
    die(json_encode(['status' => 'error', 'message' => 'SQL prepare failed: ' . $conn->error]));
}

// Bind parameters
$stmt->bind_param("sssss", 
    $data['doctors'], 
    $data['date'], 
    $data['time'], 
    $data['name'], 
    $data['mobile_no']
);

// Execute the statement
if (!$stmt->execute()) {
    die(json_encode(['status' => 'error', 'message' => 'Error saving appointment: ' . $stmt->error]));
}

// Success response
echo json_encode(['status' => 'success', 'message' => 'Appointment saved successfully']);

// Close resources
$stmt->close();
$conn->close();

?>
