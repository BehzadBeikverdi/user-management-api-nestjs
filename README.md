# 🚀 NestJS Modular API Project

A **modular NestJS application** implementing authentication, role-based access control, global logging, and a clean architecture using TypeORM with PostgreSQL.

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [⚡ Installation](#-installation)
- [🔑 Environment Variables](#-environment-variables)
- [▶️ Running the Application](#-running-the-application)
- [📦 Modules](#-modules)
- [📄 API Documentation](#-api-documentation)
- [📝 Logging](#-logging)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## ✨ Features

```text
- 🔐 JWT-based authentication
- 🛡 Role-based access control (`USER`, `ADMIN`)
- 🏗 Modular design and shared contracts
- 🐘 PostgreSQL integration via TypeORM
- ⚡ Global exception handling with custom responses
- 📊 Centralized logging for requests, responses, and exceptions
- 📚 Swagger API documentation
```/
---

## 🛠 Tech Stack
```text
- **Backend:** [NestJS](https://nestjs.com/) ⚡
- **Database:** PostgreSQL 🐘
- **ORM:** TypeORM 🏗
- **Authentication:** JWT (Passport) 🔐
- **Logging:** Custom Logger + Interceptors & Middleware 📝
- **Documentation:** Swagger 📚
```
---

## 📂 Project Structure

```text
src/
├─ common/
│  ├─ filters/
│  │  └─ custom-exception.ts
│  ├─ logger/
│  │  ├─ custom-logger.service.ts
│  │  └─ logger.interceptor.ts
│  ├─ jwt-auth-guard.ts
│  ├─ roles.decorator.ts
│  └─ roles.guard.ts
├─ modules/
│  ├─ auth/
│  │  ├─ auth.controller.ts
│  │  ├─ auth.service.ts
│  │  └─ login.dto.ts
│  ├─ user/
│  │  ├─ user.controller.ts
│  │  ├─ user.service.ts
│  │  ├─ user.entity.ts
│  │  └─ create-user.dto.ts
│  └─ math/
│     ├─ math.controller.ts
│     └─ math.service.ts
├─ shared/
│  └─ contracts/
│     └─ user-service.interface.ts
└─ app.module.ts
```
---
## ⚡ Installation

```text
Clone the repository:

git clone https://github.com/yourusername/nest-modular-api.git
cd nest-modular-api


Install dependencies:

npm install
```
---
## 🔑 Environment Variables

```text
Create a .env file at the root:

DATABASE_URL=postgres://postgres:password@localhost:5432/nestdb

JWT_SECRET=your_super_secret_key
PORT=3000
```
---
## ▶️ Running the Application
# Development
```bash
  npm run start:dev
```

# Production
```bash
  npm run start:prod
```
---
# 📦 Modules
## Auth Module

```text
- POST /auth/login → Generate JWT token 

- GET /auth/dashboard → Admin-only access

- GET /auth/profile → User & Admin access
```

## User Module

```text
- GET /users → Get all users

- GET /users/:id → Get user by ID

- POST /users → Create new user

- DELETE /users/:id → Delete user
```
---
# 📄 API Documentation

```text
Swagger is available at:

- http://localhost:3000/swagger

JWT authentication can be tested directly in Swagger via the "Authorize" button.

Role-based access control is applied to specific endpoints.
```
---
# 📝 Logging

```text
All requests, responses, and exceptions are logged via CustomLoggerService.

Logs are categorized by status codes (2xx, 4xx, 5xx) and can rotate daily.

Global exception filter returns structured responses:

{
  "success": false,
  "message": "Unexpected error occurred",
  "payload": null,
  "errors": ["Error details..."],
  "timestamp": "2025-12-07T08:02:11.275Z"
}
```
---
# 🤝 Contributing

```text
Fork the repository.

Create your feature branch: git checkout -b feature/your-feature

Commit your changes: git commit -m 'Add some feature'

Push to the branch: git push origin feature/your-feature

Open a pull request.
```
---
# 📜 License

```text
This project is licensed under the MIT License.

If you want, I can **also add badges for build, coverage, and Node/Nest versions** at the top to make it even more professional.

Do you want me to add those?
```