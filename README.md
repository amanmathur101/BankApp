# 🏦 Banking Management System

Bank Application is a full-stack web application that simulates real-world banking operations such as account creation, authentication, deposits, withdrawals, transfers, and transaction history tracking.

The application is built using Spring Boot (Java) for backend and React.js (Vite + Tailwind CSS) for frontend, with secure authentication implemented using JWT (JSON Web Token).

The project is fully deployed on Render (Backend) and Vercel (Frontend) with PostgreSQL cloud database integration.

---

## 🚀 Live Demo

🔗 Backend (Render)  
https://bankapp-dcft.onrender.com 

🔗 Frontend (Vercel)  
https://bank-gemioi7o9-aman-kumars-projects-8e4adb13.vercel.app

<img width="1909" height="861" alt="Screenshot 2026-02-18 103557" src="https://github.com/user-attachments/assets/f1de42a6-5a57-4356-b9a7-05b947006603" />
<img width="738" height="567" alt="Screenshot 2026-02-18 103828" src="https://github.com/user-attachments/assets/e90547a8-173b-49ec-9c4c-f869904cc4f7" /> <img width="714" height="499" alt="Screenshot 2026-02-18 103837" src="https://github.com/user-attachments/assets/54455707-c8ed-495b-b9bf-22f468a4b5a4" /> <img width="723" height="604" alt="Screenshot 2026-02-18 103844" src="https://github.com/user-attachments/assets/6e984296-2884-4404-ad6a-2ab83881c71f" /> <img width="982" height="774" alt="Screenshot 2026-02-18 103858" src="https://github.com/user-attachments/assets/e32357a6-004d-4e38-a995-28f21a412ca6" />






---

## ✨ Features

- 🔐 Secure User Registration & Login (JWT Authentication)
- 💰 Deposit & Withdraw Funds
- 🔁 Account-to-Account Money Transfer
- 📜 Transaction History Tracking
- 🛡 Role-Based Authorization (USER / ADMIN)
- 🌐 Production CORS Configuration
- 🐳 Dockerized Backend Deployment
- ☁ Cloud Hosting (Render + Vercel)
- 🗄 PostgreSQL Cloud Database Integration

---

## 🛠 Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- PostgreSQL
- JWT Authentication
- Docker

### Frontend
- React.js (Vite)
- Axios
- Context API
- Tailwind CSS

### Deployment
- Render (Backend API Hosting)
- Vercel (Frontend Hosting)
- Render PostgreSQL Database

---

## 🏗 System Architecture

React Frontend
↓
Spring Boot REST API
↓
PostgreSQL Database


### 🔐 Authentication Flow

1. User registers or logs in  
2. JWT token is generated  
3. Token is sent in Authorization header  
4. Secured endpoints validate token via custom JWT filter  

---

## 📌 API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### Transactions
- `POST /api/transactions/deposit`
- `POST /api/transactions/withdraw`
- `POST /api/transactions/transfer`

---

## ⚙️ Environment Variables (Production)

DATABASE_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
PORT

---

## 👨‍💻 Author

**Aman Kumar**  
Full Stack Java Developer  

---

⭐ If you found this project helpful, please consider giving it a star!




