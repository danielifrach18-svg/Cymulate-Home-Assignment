# Phishing Simulation Project

Full‑stack web application for phishing simulation and management.

---

## Project Structure

* **client** — React + TypeScript frontend
* **phishing-management-server** — NestJS backend (port **3000**)
* **phishing-simulation-server** — NestJS backend for sending/recording phishing attempts (port **8000**)

---

## Features

* Admin **Login** & **Registration** (JWT)
* Send phishing emails
* Track phishing attempts (email, subject, status)
* Protected routes using JWT Guard
* Clean UI with form validation

---

## Routing Overview

### 🔹 Management Server (port 3000)

| Route                          | Method | Description                                          |
| ------------------------------ | ------ | ---------------------------------------------------- |
| `/auth/register`               | POST   | Register admin user                                  |
| `/auth/login`                  | POST   | Login and receive JWT                                |
| `/manage-phishing/send?email=` | POST   | Send phishing email (forwarded to simulation server) |
| `/manage-phishing/all`         | GET    | Get all phishing attempts                            |

---

### 🔹 Simulation Server (port 8000)

| Route                    | Method | Description                         |
| ------------------------ | ------ | ----------------------------------- |
| `/phishing/send?email=`  | POST   | Send phishing email + store attempt |
| `/phishing/click?email=` | GET    | Mark attempt as clicked             |
| `/phishing/all`          | GET    | Get all attempts from DB            |

---

## Installation & Running

### Management Server

```bash
cd phishing-management-server
npm install
npm run start:dev
```

### Simulation Server

```bash
cd phishing-simulation-server
npm install
npm run start:dev
```

### Frontend

```bash
cd client
npm install
npm start
```

---

## Default URLs

* **Frontend:** http://localhost:5173
* **Management API:** http://localhost:3000
* **Simulation API:** http://localhost:8000

---

## Notes

* Management server communicates with the simulation server for sending emails + fetching attempts.
* JWT Guard protects `/manage-phishing/*` routes.
* Forms include validation and error messages.
