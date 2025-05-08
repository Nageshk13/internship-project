# Charity Management System (CMS)

A full-featured web-based **Charity Management System** built using the **MERN stack (MongoDB, Express, React, Node.js)** to streamline the management of donors, volunteers, events, financial audits, and general organizational operations. This project was developed as part of an internship at **DLithe Consultancy Services**.

---

## 🌐 Live Demo

> [Coming Soon — Deployed URL]

---

## 📌 Features

### ✅ User Features
- **Home Page** with introduction, mission, and contact details.
- **Donation Form** auto-filling user data with secure submission.
- **Volunteer Registration** with editable profiles and participation tracking.
- **Events Section** showing upcoming and completed events.
- **Contact Us Form** to send messages or suggestions.

### 🛠️ Admin Features
Accessible after secure login:
- **Dashboard Overview**
  - Monthly donation bar chart.
  - Ongoing tasks list.
  - Completed events summary (downloadable as Excel).
- **Donor Management**
  - View donor profiles and history.
  - Export donor data as Excel.
- **Volunteer Management**
  - Approve/reject volunteer registrations.
  - Edit, delete, or track volunteers.
- **Event Management**
  - Create, update, and mark events as completed.
  - View event participants.
- **Audit Logs**
  - Track income/deductions.
  - Manual CRUD for deductions with reasons.
  - Total balance shown with Excel export.
- **Suggestions & Contact**
  - View messages from "Contact Us".
  - Download suggestion records as Excel.
- **Email Confirmation**
  - Automatic email with donation details & thank-you note (via Nodemailer).

---

## 🧑‍💻 Tech Stack

| Category     | Technology                    |
|--------------|-------------------------------|
| Frontend     | React, Tailwind CSS           |
| Backend      | Node.js, Express.js           |
| Database     | MongoDB (Mongoose ODM)        |
| Email        | Nodemailer                    |
| Charts       | Recharts                      |
| File Export  | xlsx (Excel export in Admin)  |
| Hosting (Planned) | Vercel (Frontend), Render/Heroku (Backend) |

---

## 🗂️ Folder Structure

charity/
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── App.js
│ └── public/
├── server/ # Node/Express Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── .gitignore
├── package.json
└── README.md

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repo

- git clone https://github.com/Nageshk13/internship-project.git

## 2. Backend Setup

- cd server
- npm install
# Create a .env file and configure MONGO_URI, EMAIL_USER, EMAIL_PASS, etc.
- npm start

## 3. Frontend Setup

cd client
npm install
npm start

## ✉️ .env Configuration

# For Backend (server/.env)
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/cms
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_password

## 📊 Screenshots
![home page](https://github.com/user-attachments/assets/dfca136a-1168-4098-b044-62388fddd617)
![admin](https://github.com/user-attachments/assets/d8b2fbb3-e3f4-467b-8d55-ceba925d1ced)
![volunteer dashboard](https://github.com/user-attachments/assets/cd966575-80c9-4234-8038-471bfbed04b8)
![donor dashboard](https://github.com/user-attachments/assets/9252aaa0-e5fc-4f8c-a7e2-1d79e72f5742)
![ongoing events](https://github.com/user-attachments/assets/7af1efa3-a786-4b44-a27e-d8b697c16399)
![Screenshot 2025-05-06 225941](https://github.com/user-attachments/assets/7d430671-4dca-4226-890c-85beae4e7e53)
![footer   contact form](https://github.com/user-attachments/assets/108c987a-dc87-4fc2-b60b-fb8c7deda176)

## 🧠 Learnings & Outcome
- Full-stack MERN project development lifecycle.
- Real-world application of Git/GitHub for version control.
- Practical experience with REST APIs, authentication, and form handling.
- Hands-on with data visualization and file export functionality.
- Exposure to deployment and environment management.

## 👨‍🏫 Developed During Internship @ DLithe Consultancy Services
- This project was completed as part of an internship focused on applying MERN stack development to solve real-world problems for nonprofit/charitable organizations.

## 🙋‍♂️ Author
Nagesh K
GitHub: https://github.com/Nageshk13/internship-project
Email: nageshk88611@gmail.com








