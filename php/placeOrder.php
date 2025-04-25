<?php
  include("database.php");

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  // Get raw JSON input
  $rawData = file_get_contents("php://input");
  $data = json_decode($rawData, true); // true to return associative array

  // Extract data from JSON
  $name = $conn->real_escape_string($data['name']);
  $phone = $conn->real_escape_string($data['phone']);
  $address = $conn->real_escape_string($data['address']);
  $pincode = $conn->real_escape_string($data['pincode']);
  $state = $conn->real_escape_string($data['state']);
  $payment = $conn->real_escape_string($data['payment']);
  $items = $conn->real_escape_string(json_encode($data['items'])); // convert items to JSON string

  $deliveryDate = $conn->real_escape_string($data['deliveryDate']);

  // Insert into database
  $sql = "INSERT INTO orders (name, phone, address, pincode, state, payment_method, items, delivery_date)
          VALUES ('$name', '$phone', '$address', '$pincode', '$state', '$payment', '$items', '$deliveryDate')";

  if ($conn->query($sql) === TRUE) {
    echo "Order placed successfully";
  } else {
    echo "Error: " . $conn->error;
  }

  $conn->close();
  
?>
