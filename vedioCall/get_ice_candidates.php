<?php
// Get appointment_id and role from GET params
$appointment_id = $_GET['appointment_id'] ?? '';
$role = $_GET['role'] ?? '';

if (!$appointment_id || !$role) {
    http_response_code(400);
    echo json_encode(['candidates' => []]);
    exit;
}

// Connect to DB
$mysqli = new mysqli("localhost", "root", "", "doctordata");
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['candidates' => []]);
    exit;
}

// We want to fetch candidates from the **other** role (because each peer fetches the other's candidates)
$other_role = $role === 'doctor' ? 'patient' : 'doctor';

$stmt = $mysqli->prepare("SELECT id, candidate FROM ice_candidates WHERE appointment_id = ? AND role = ?");
$stmt->bind_param("ss", $appointment_id, $other_role);
$stmt->execute();
$result = $stmt->get_result();

$candidates = [];
$ids_to_delete = [];

while ($row = $result->fetch_assoc()) {
    $candidates[] = json_decode($row['candidate']);
    $ids_to_delete[] = $row['id'];
}

$stmt->close();

// Delete returned candidates so they are not sent again
if (!empty($ids_to_delete)) {
    $ids_str = implode(",", $ids_to_delete);
    $mysqli->query("DELETE FROM ice_candidates WHERE id IN ($ids_str)");
}

$mysqli->close();

echo json_encode(['candidates' => $candidates]);
?>
