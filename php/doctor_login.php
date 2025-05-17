<?php
session_start();

$mycon=mysqli_connect("localhost","root","","doctordata");
// echo"connection done";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $doctor_id = $_POST['doctor_id'];
    $doctor_password = $_POST['doctor_password'];

    // Query to check if doctor exists with the given ID and password
    $query = "SELECT * FROM `docdata` WHERE `Id` = '$doctor_id' AND `docPassword` = '$doctor_password'";
    $result = mysqli_query($mycon, $query);

    if (mysqli_num_rows($result) == 1) {
        // Login successful, set session variables
        $_SESSION['doctor_id'] = $doctor_id;
        $_SESSION['doctor_logged_in'] = true;
        header("Location: doctor_dashboard.php");  // Redirect to doctor dashboard
    } else {
        echo "Invalid ID or Password";
    }
}
?>
