# 🛡️ InsurAI – Corporate Policy Automation System

### 🚀 Live Demo
[View Live Demo](https://frontend-eight-nu-66.vercel.app)

InsurAI is a full-stack corporate insurance policy management system developed during the **Infosys Springboard Internship Program**.

The platform helps automate corporate insurance workflows such as policy applications, policy verification, claim submission, and policy tracking.

> **My Role:** Frontend Developer — React.js, TypeScript, UI development, routing, and REST API integration.


📌 Problem Statement

In the insurance industry, corporate clients require customized insurance policies involving multiple manual steps such as:

Policy creation

Validation & compliance checks

Claim processing

Renewal management

Traditional systems rely heavily on documentation and human verification, leading to:

Delays

Errors

Inconsistent policy handling

InsurAI addresses these issues by automating insurance workflows with a secure and scalable architecture.

🎯 Objectives

Automate corporate insurance policy management

Provide secure login and role-based access

Simplify policy application and claim processing

Reduce human errors and processing time

Enable employees to verify and manage policies efficiently

🏗️ System Architecture Frontend (React) ↓ REST API calls Backend (Spring Boot) ↓ JPA / Hibernate Database (MySQL) ↓ JWT Authentication & Authorization

🧑‍💼 User Roles 👤 User

Register & login

Apply for new insurance policies

Upload claim images/documents

View applied and approved policies

👨‍💻 Employee

Login securely

View user policy requests

Verify claims and policies

Update policy status

🛠️ Admin / HR

Manage employees

Monitor system activities

Oversee policies and claims

🔐 Authentication & Security

JWT (JSON Web Token) based authentication

Secure REST APIs

Role-based authorization

Password encryption using BCrypt

Protected routes for employees and users

🛠️ Tech Stack Frontend

React.js

TypeScript

Tailwind CSS

React Router

Axios

Backend

Java

Spring Boot

Spring Security

JWT

JPA / Hibernate

Database

MySQL

Tools

Maven

Git & GitHub

Postman

VS Code

📂 Project Structure InsurAI-Project │ ├── backend │ ├── controller │ ├── service │ ├── repository │ ├── entity │ ├── security │ └── dto │ ├── frontend │ ├── pages │ ├── components │ ├── services │ ├── context │ └── routes │ └── README.md

🔄 Core Features

RESTful API architecture

Secure JWT-based login system

Policy creation and tracking

Claim submission with image upload

Employee verification dashboard

Clean frontend-backend separation

▶️ How to Run the Project Backend (Spring Boot) cd backend mvn clean spring-boot:run

Backend runs on:

http://localhost:8080

Frontend (React) cd frontend npm install npm run dev

Frontend runs on:

http://localhost:4200

🧪 API Testing

Tested using Postman

Endpoints include:

/api/auth/register

/api/auth/login

/api/policies

/api/claims

🚀 Future Enhancements

AI-based policy recommendation system

NLP-powered document verification

Cloud deployment (AWS / Render)

Notification system (Email / SMS)

Advanced analytics dashboard

## 👥 Project Information

This project was developed as part of the **Infosys Springboard Internship Program**.

### Project Type
Team Project

### Maintained By
**Dharnish Kumaran**

## 👨‍💻 My Contributions

This was a team project developed during the Infosys Springboard Internship Program. My primary contribution was on the frontend.

- Developed user interfaces using React.js and TypeScript
- Built reusable UI components
- Implemented client-side routing using React Router
- Integrated frontend with backend REST APIs using Axios
- Developed and improved application pages and user workflows
- Worked with the team to test and refine the user interface
⭐ Conclusion

InsurAI is a secure, scalable, and efficient insurance automation platform that modernizes corporate insurance workflows using Spring Boot, React, REST APIs, and JWT authentication.


