<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "";
$database = "doctordata";

$conn = new mysqli($servername, $username, $password, $database);

$sql = "SELECT * FROM docdata";
$result = $conn->query($sql);

$doctors = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $doctors[] = $row;
    }
}

echo json_encode($doctors);
?>

