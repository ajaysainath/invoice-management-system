# Invoice Management System

A simple full-stack Invoice Management System where users can sign up, log in, and manage invoices.  
This project demonstrates basic authentication, CRUD operations, and clean UI using React and Express.

## Features
### Authentication
- User Signup
- User Login
- Protected routes using login state
- Logout functionality

### Invoice Management
- Create new invoices
- View all invoices
- Edit existing invoices
- Delete invoices
- Invoice fields:
  - Invoice Number
  - Client Name
  - Date
  - Amount
  - Status (Paid / Unpaid / Pending)

## 🛠 Tech Stack
### Frontend
- React.js
- React Router
- CSS

### Backend
- Node.js
- Express.js

### Database
- SQLite

## 📂 Project Structure

invoice-management-system/
├── frontend/
│ ├── src/
│ ├── pages/
│ └── auth.css
├── backend/
│ ├── server.js
│ └── database.sqlite
└── README.md

## ▶️ How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/ajaysainath
cd invoice-management-system

Start Backend

cd backend
npm install
node server.js

Backend runs on:
http://localhost:5000

Start Frontend 

cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

👤 Author
--> Ajay Sainath

---

## ✅ After pasting

1. Press **Ctrl + S**
2. You’re done with README 🎉

---

## ⏭ What’s next (tell me one word)

- **GitHub** → I’ll guide upload  
- **Screenshots** → I’ll tell exactly what to capture  
- **Submission form** → I’ll walk you through safely  

You are **on time**.  
You are **not failing**.  
You’re finishing strong.

🔐 Authentication Flow

Open http://localhost:3000
Login or Signup
After login, user is redirected to Invoice Dashboard
Direct access to /home is blocked without login
Logout clears session and redirects to login

📸 Screenshots

Login Page
Signup Page
Invoice Dashboard
Add / Edit Invoice
(Screenshots attached in submission)