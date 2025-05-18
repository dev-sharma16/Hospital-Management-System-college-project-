# 🏥 Hospital Website Management System

A fully functional hospital website for a specific hospital. This system allows patients to book doctor appointments, schedule medical tests, shop for medicines, and even experience basic video consultation functionality.

---

## 🚀 Features

### 1. 👨‍⚕️ Doctor Listing & Appointment Booking
- View all available doctors from a specific hospital.
- Book appointments directly from the website.
- Stores patient and appointment data in MySQL.

### 2. 🧪 Medical Test Booking
- Book tests such as Blood Test, ECG, etc.
- Stores test bookings in the database.

### 3. 🔍 Doctor Filter System
- Filter doctors based on:
  - Specialization
  - Gender
- Includes a "Clear Filter" option.

### 4. 🛒 E-commerce Pharmacy Store
- Browse and add items (medicines/products) to cart.
- View total cost and quantity in real-time.
- Checkout form collects:
  - Name
  - Phone number (used as a unique identifier)
  - Address
- Checkout data is saved in MySQL.

### 5. 📲 Booking History via Phone Number
- Patients can enter their phone number to:
  - View their past doctor appointments
  - See booked test reports

### 6. 🎥 Video Call Consultation (Prototype)
- A functional demo using WebRTC for video consultation.
- Doctor starts the call → user receives a popup → both can see their own camera.
- Remote feed implementation (WebRTC signaling) is a future enhancement.

---

## 🛠️ Tech Stack

| Layer         | Technology             |
|---------------|------------------------|
| Frontend      | HTML, CSS, JavaScript  |
| Backend       | PHP                    |
| Database      | MySQL                  |
| Video Calling | WebRTC (Prototype only)|

---

## 📁 Folder Structure Overview

```
├── consultOnline/           # Video call HTML/CSS/JS
├── css/                     # Appointment and styling CSS
├── docData/                 # Doctor list JS
├── doctorLogin_dash/       # Doctor login & dashboard
├── medicine_Page/          # Medicine shop pages
│   ├── CART/
│   └── Checkout/
├── pages/                  # Booking page
├── php/                    # All PHP backend files
├── scripts/                # JS for appointment
├── vedioCall/              # WebRTC logic for video call
├── index.html              # Homepage
└── README.md               # Project documentation
```

---

## 🎯 How to Run This Project

1. Clone the repository.
2. Set up a local Apache server (e.g., XAMPP).
3. Place project folder in the `htdocs/` directory.
4. Create a MySQL database and import the SQL file (if available).
5. Start Apache and MySQL via XAMPP.
6. Access via `localhost/project-folder-name/index.html`.

---

## 🛠️ Future Enhancements

- Full WebRTC video/audio integration.
- Doctor self-registration with verification.
- Improved UI/UX for mobile responsiveness.
- Payment gateway integration for medicine orders.

---

## 📞 Contact

Project by Dev Sharma  
College Project Submission  
For queries: [devsharma1683@gmail.com]


