<?php
session_start();
if (!isset($_SESSION['doctor_logged_in']) || $_SESSION['doctor_logged_in'] !== true) {
    header("Location: doctor_login.php");  // Redirect if not logged in
    exit;
}

// Get doctor info from the database (optional)
$doctor_id = $_SESSION['doctor_id'];
// Query to fetch doctor's data (appointments, details, etc.)

$mycon=mysqli_connect("127.0.0.1:3307","root","1234","doctordata");

// Fetch doctor’s name
$sql_name = "SELECT name FROM docdata WHERE Id = '$doctor_id'";
$result_name = mysqli_query($mycon, $sql_name);
$doctor = mysqli_fetch_assoc($result_name);
$doctor_name = $doctor['name'];

// Fetch appointments for the selected date (default is today)
$selected_date = isset($_POST['selected_date']) ? $_POST['selected_date'] : date('Y-m-d');

$sql_appointments = "SELECT * FROM appointments WHERE docId = '$doctor_id' AND booking_date = '$selected_date' ORDER BY booking_date";
$result_appointments = mysqli_query($mycon, $sql_appointments);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Doctor Dashboard</title>
    <link rel="stylesheet" href="../doctorLogin_dash/doc_dashboard.css">


</head>
<body>

<div class="container">
    <h2>Welcome, Dr. <?php echo htmlspecialchars($doctor_name); ?>!</h2>
    <h3>Your Online Appointments:</h3>

    <!-- Date Filter Form -->
    <form class="showDate" method="POST" action="doctor_dashboard.php">
        <label for="selected_date">Select Date:</label>
        <input type="date" name="selected_date" value="<?php echo $selected_date; ?>" class="date-picker">
        <button type="submit" class="submit-btn">Show Appointments</button>
    </form>

    <!-- Display appointments for the selected date -->
    <?php if (mysqli_num_rows($result_appointments) > 0): ?>
        <table>
            <tr>
                <th class="">SNo.</th>
                <th class="">Patient Name</th>
                <th class="">Phone</th>
                <th class="">Age</th>
                <th class="">Actions</th>
            </tr>
            <?php while ($row = mysqli_fetch_assoc($result_appointments)): ?>
                <tr>
                    <td><?php echo htmlspecialchars($row['id']); ?></td>
                    <td><?php echo htmlspecialchars($row['patient_name']); ?></td>
                    <td><?php echo htmlspecialchars($row['patient_phonenum']); ?></td>
                    <td><?php echo htmlspecialchars($row['patient_age']); ?></td>
                    <td>
                      <a href="video_call.php?appointment_id=<?php echo $row['id']; ?>&doctor_id=<?php echo $doctor_id; ?>">
                        <button class="video-call-btn">Start Video Call</button>
                      </a>
                    </td>
                </tr>
            <?php endwhile; ?>
        </table>
    <?php else: ?>
        <p>No appointments found for this date.</p>
    <?php endif; ?>
</div>


</body>
</html>
