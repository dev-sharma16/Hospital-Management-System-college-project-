<?php
$conn = mysqli_connect("127.0.0.1:3307", "root", "1234", "doctordata");
  echo"connection done";


  
  

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $docId = $_POST['docId'];
    $name = $_POST['patient_name'];
    $phone = $_POST['patient_phonenum'];
    $age = $_POST['patient_age'];
    $date = $_POST['booking_date'];

    // 1. Doctor's available time
    $docQuery = "SELECT `appnt_time_from`, `appnt_time_to` FROM docdata WHERE id = $docId";
    $docRes = $conn->query($docQuery);
    
    if ($docRes && $row = $docRes->fetch_assoc()) {
        $start = strtotime($row['appnt_time_from']);
        $end = strtotime($row['appnt_time_to']);

        // 2. Get already booked time slots for this doctor & date
        $bookedSlots = [];
        $checkQuery = "SELECT time_slot FROM appointments WHERE docId=$docId AND booking_date='$date'";
        $res = $conn->query($checkQuery);
        while ($r = $res->fetch_assoc()) {
            $bookedSlots[] = strtotime($r['time_slot']);
        }

        // 3. Loop through 15 min slots to find the next available one
        $assignedSlot = null;
        while ($start + 900 <= $end) {
            if (!in_array($start, $bookedSlots)) {
                $assignedSlot = date("H:i:s", $start);
                break;
            }
            $start += 900; // 15 min = 900 sec
        }
        echo $assignedSlot;

        if ($assignedSlot) {
            // 4. Save to DB
            $stmt = $conn->prepare("INSERT INTO appointments (docId, patient_name, patient_phonenum, patient_age, booking_date, time_slot) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ississ", $docId, $name, $phone, $age, $date, $assignedSlot);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                echo "<script>alert('Appointment booked at $assignedSlot'); window.location.href='your_redirect_page.html';</script>";
            } else {
                echo "<script>alert('Error booking appointment');</script>";
            }
        } else {
            echo "<script>alert('No available slots for selected date.');</script>";
        }
    } else {
        echo "<script>alert('Doctor not found');</script>";
    }
}
?>
