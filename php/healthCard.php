<?php
 include("database.php");

$conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$mobile_no = "";
$test_results = [];
$appointment_results = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mobile_no = mysqli_real_escape_string($conn, $_POST["mobile_no"]);

    // Fetch tests
    $test_sql = "SELECT * FROM user_bktest WHERE mobile_no = '$mobile_no'";
    $test_results = mysqli_query($conn, $test_sql);

    // Fetch appointments
    $appt_sql = "SELECT * FROM user_bkappointment WHERE mobile_no = '$mobile_no'";
    $appointment_results = mysqli_query($conn, $appt_sql);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Check Bookings</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }

    .container {
      max-width: 900px;
      margin: 40px auto;
      padding: 30px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 123, 138, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    h1 {
      text-align: center;
      color: #007c9d;
    }

    .search-form {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }
    
    .search-form input[type="text"] {
      width: 60%;
      padding: 12px 16px;
      border: 1.5px solid #007c9d;
      border-right: none;
      border-radius: 8px 0 0 8px;
      font-size: 16px;
      outline: none;
    }
    
    .search-form input[type="submit"] {
      padding: 12px 20px;
      background-color: #007c9d;
      color: white;
      border: 1.5px solid #007c9d;
      border-left: none;
      border-radius: 0 8px 8px 0;
      cursor: pointer;
      font-size: 16px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #007c9d;
      color: white;
    }

    .section-title {
      margin-top: 30px;
      font-size: 22px;
      color: #007c9d;
    }

    .no-record {
      text-align: center;
      padding: 20px;
      color: #888;
    }
  </style>
</head>
<body>
    
  <div class="container">
    <h2>Check your appointments and bookings</h2>
    <form method="POST" class="search-form">
      <input type="text" name="mobile_no" placeholder="Enter your phone number" required>
      <input type="submit" value="Search">
    </form>

    <?php if ($_SERVER["REQUEST_METHOD"] == "POST"): ?>
      <h3>Test Bookings</h3>
      <?php if (mysqli_num_rows($test_results) > 0): ?>
        <table>
          <tr><th>Name</th><th>Age</th><th>Test Type</th></tr>
          <?php while ($row = mysqli_fetch_assoc($test_results)): ?>
            <tr>
              <td><?= $row['name'] ?></td>
              <td><?= $row['age'] ?></td>
              <td><?= $row['test_type'] ?></td>
            </tr>
          <?php endwhile; ?>
        </table>
      <?php else: ?>
        <p>No test bookings found.</p>
      <?php endif; ?>

      <h3>Appointments</h3>
      <?php if (mysqli_num_rows($appointment_results) > 0): ?>
        <table>
          <tr><th>Doctor</th><th>Date</th><th>Time</th><th>Name</th></tr>
          <?php while ($row = mysqli_fetch_assoc($appointment_results)): ?>
            <tr>
              <td><?= $row['doctors'] ?></td>
              <td><?= $row['date'] ?></td>
              <td><?= $row['time'] ?></td>
              <td><?= $row['name'] ?></td>
            </tr>
          <?php endwhile; ?>
        </table>
      <?php else: ?>
        <p>No appointments found.</p>
      <?php endif; ?>
    <?php endif; ?>
  </div>
</body>
</html>
