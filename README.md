# 🩺 MedBook - Appointment Booking System

A full-stack **Appointment Booking System** built using the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js). MedBook allows users to schedule and manage doctor appointments through a clean, responsive, and user-friendly interface.

The application uses **MongoDB Atlas** as the cloud database and implements **Formik** and **Yup** for robust form validation, along with **React Hot Toast** for interactive notifications.

---

## 🚀 Features

- 👨‍⚕️ Schedule appointments with multiple doctors
- 📅 Select appointment date and time
- 📝 Add reason for visit (disease/symptoms)
- 💰 Specify consultation fee
- 📌 Manage appointment status
- 📋 View all scheduled appointments
- 📄 Organized appointment list view
- ✅ Form validation using **Formik** and **Yup**
- 🔔 Instant notifications using **React Hot Toast**
- ☁️ MongoDB Atlas cloud database integration
- 🌐 Responsive and intuitive user interface
- 🔗 RESTful API architecture

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS
- Formik
- Yup
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Nodemon

---

## 🧰 Libraries & Tools

| Library | Purpose |
|---------|---------|
| **Formik** | Form handling |
| **Yup** | Form validation |
| **React Hot Toast** | Toast notifications |
| **Mongoose** | MongoDB Object Data Modeling (ODM) |
| **Nodemon** | Automatically restarts the backend server during development |

---

# 📸 Screenshots

### 🏠 Dashboard
Displays all appointments along with their current status for quick management.

> Replace with your screenshot:

```
/screenshots/dashboard.png
```

---

### 📋 Appointments List
Shows all scheduled appointments in a clean list view with complete details.

> Replace with your screenshot:

```
/screenshots/appointments-list.png
```

---

### ➕ Create New Appointment
Form for scheduling a new appointment with doctor selection, date, time, fee, and reason for visit.

> Replace with your screenshot:

```
/screenshots/create-appointment.png
```

---

## 📂 Project Structure

```
MedBook
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   ├── vite.config.js
│   └── dist
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/MedBook.git
cd MedBook
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** folder and add:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Start the backend development server:

```bash
npm run dev
```

---

## 💻 Frontend Setup

Open a new terminal.

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on the Vite development server.

---

## 🎯 Future Enhancements

- 🔐 User Authentication
- 👨‍⚕️ Doctor Authentication
- ✏️ Edit Appointment
- ❌ Cancel Appointment
- 🔄 Reschedule Appointment
- 🔍 Search & Filter
- 📧 Email Notifications
- 💳 Payment Gateway Integration
- 📊 Dashboard Analytics

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

## 📄 License

This project is developed for learning and educational purposes.

---

## 👩‍💻 Author

**Nyx**

If you found this project helpful, consider giving it a ⭐ on GitHub!
