<?php
 include("database.php");

 if($_SERVER["REQUEST_METHOD"] == "POST"){
   
   $_name = mysqli_real_escape_string($conn, $_POST["name"]);
   $_age = mysqli_real_escape_string($conn, $_POST["age"]);
   $_phone_no = mysqli_real_escape_string($conn, $_POST["phone_no"]);
   $_test_type = mysqli_real_escape_string($conn, $_POST["test_type"]);
   
   
   if(empty($_phone_no)) {
     echo "Phone number cannot be empty!";
     exit();
   }
   
   
   $check_sql = "SELECT * FROM user_bktest WHERE mobile_no = '$_phone_no'";
   $result = mysqli_query($conn, $check_sql);
   
   if(mysqli_num_rows($result) > 0) {
     echo "This phone number is already registered for a test!";
   } else {
     $sql = "INSERT INTO user_bktest(name, age, mobile_no, test_type)
             VALUES ('$_name', '$_age', '$_phone_no', '$_test_type')";
      
     if (mysqli_query($conn, $sql)) {
         echo "Data inserted successfully! Your test has been booked.";
        // return;
     } else {
         echo "Error: " . mysqli_error($conn);
     }
   }
 }
?>