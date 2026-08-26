# 🛡️ InsurAI – Corporate Policy Automation System with Google Gemini AI

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/Dharnishkumaran0831/InsurAI-Project)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203.5-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot)
[![React Vite](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue?logo=react)](https://reactjs.org/)
[![Google Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini%20AI-orange?logo=google)](https://aistudio.google.com/)

**InsurAI** is an enterprise-grade full-stack insurance platform that automates corporate insurance policy creation, AI-powered compliance auditing, policy recommendation, claims processing, and renewal workflows using **Spring Boot**, **React**, and **Google Gemini AI**.

---

## 🚀 Live Links & Repository

- **GitHub Repository:** [https://github.com/Dharnishkumaran0831/InsurAI-Project](https://github.com/Dharnishkumaran0831/InsurAI-Project)
- **Deploy Setup:**
  - **Vercel (Frontend):** Pre-configured with [`frontend/vercel.json`](file:///d:/InsurAI-Project-main/InsurAI-Project-main/frontend/vercel.json)
  - **Render (Full Stack):** Pre-configured with [`render.yaml`](file:///d:/InsurAI-Project-main/InsurAI-Project-main/render.yaml)

---

## 🤖 Google Gemini AI Features

1. **AI Policy Recommendation Engine (`/policy-recommendation`)**
   - Generates personalized corporate policy options based on employee profile, department, and coverage requirements using Gemini AI.
2. **AI Compliance Checker (`/compliance-check`)**
   - Audits corporate policy documents, detects missing clauses and high-risk conditions, calculates compliance scores (0-100), and records audit history in the backend database.
3. **Gemini AI Policy Assistant**
   - Multi-turn AI Assistant panel on HR and Employee dashboards to answer corporate insurance queries instantly.

> [!NOTE]
> **Security First:** The Google Gemini API key is managed securely on the Spring Boot backend via environment variables (`GEMINI_API_KEY`) and is **never exposed** in client-side browser bundles or committed to version control.

---

## 🏗️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite, Lucide Icons, Sonner Toasts
- **Backend:** Java 17+, Spring Boot 3.5, Spring Security, JWT Authentication, Spring Data JPA
- **Database:** H2 In-Memory (Development) / MySQL 8.0 (Production)
- **AI Integration:** Google Gemini AI API (v1beta REST)

---

## 🛠️ How to Run Locally

### 1. Spring Boot Backend
```bash
cd backend
./mvnw spring-boot:run
```
- **Backend URL:** `http://localhost:8080`
- **Environment Variable (Optional):** Set `GEMINI_API_KEY` in terminal if overriding `application.properties`.

### 2. React Vite Frontend
```bash
cd frontend
npm install
npm run dev
```
- **Frontend URL:** `http://localhost:5173`

---

## 👨‍💻 Developer & Repository
- **Repository:** [Dharnishkumaran0831/InsurAI-Project](https://github.com/Dharnishkumaran0831/InsurAI-Project)
