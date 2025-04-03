# 💰 Fullstack Expense Tracker App

A fullstack Expense Tracker application built with **NestJS**,**GraphQL** (backend), **React with TypeScript** (frontend), **MongoDB** (database) and JWT(for authentication/role based authorization) It allows users to manage transactions (expenses/income), set budget limits, and automatically extract transaction data from scanned receipts.

Includes a full **admin dashboard** to manage **users, roles, permissions, and app settings**.

## LIVE Deploy In React.ts And NestJS (May take a minute or less to load)

<img src="https://www.svgrepo.com/show/316501/arrow-down-small.svg" width='260px' height='260px'/>

https://backend-expense-tracker-nestjs.onrender.com

## GraphQL Docs (Server Documentation) (May take a minute or less to load)

<img src="https://www.svgrepo.com/show/316501/arrow-down-small.svg" width='260px' height='260px'/>

https://backend-expense-tracker-nestjs.onrender.com/graphql

## Table of Contents

- [Features](#features)
  - [🔐 User Features](#-user-features)
  - [🛠 Admin Features](#-admin-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [🚀 Backend Setup (NestJS)](#-backend-setup-nestjs)
- [🔐 Environment Variables](#-environment-variables)
- [💻 Frontend Setup (React)](#-frontend-setup-react)
- [Architecture Design](#architecture-design)
- [Screenshots](#screenshots)
  - [Authentication](#authentication)
    - [Login](#login)
    - [Register](#register)
    - [Forgot Password](#forgot-password)
    - [Reset Password](#reset-password)
  - [Main Content](#main-content)
    - [Dashboard](#dashboard)
    - [Add New Transaction](#add-new-transaction)
    - [Transactions](#transactions)
    - [Edit Transaction](#edit-transaction)
    - [Remove Transaction](#remove-transaction)
    - [Remove ALL Transactions](#remove-all-transactions)
    - [Export Transactions to Excel](#export-transactions-to-excel)
    - [Add Budget](#add-budget)
    - [Budgets](#budgets)
    - [Edit Budget](#edit-budget)
    - [Remove Budget](#remove-budget)
    - [Remove ALL Budgets](#remove-all-budgets)
    - [Scan From Receipt](#scan-from-receipt)
    - [Currency Converter](#currency-converter)
    - [Profile](#profile)
    - [Edit Profile](#edit-profile)
    - [Application Settings](#application-settings)
  - [Admin](#admin)
    - [Admin Dashboard](#admin-dashboard)
    - [Add New User](#add-new-user)
    - [Assign Roles To User](#assign-roles-to-user)
    - [Remove Roles From User](#remove-roles-from-user)
    - [Users Management](#users-management)
    - [Edit User Profile](#edit-user-profile)
    - [Delete User](#delete-user)
    - [Delete ALL Users](#delete-all-users)
    - [Export Users to Excel](#export-users-to-excel)
    - [Roles Management](#roles-management)
    - [Manage User Permissions](#manage-user-permissions)
- [Video demo](#video-demo)

## Features

### 🔐 User Features

- Add, edit, and delete **income** and **expense** transactions
- Set **monthly budget limits** per category
- Upload and **scan receipts** using OCR (Mindee API) to auto-fill transaction data
- View categorized data with **tags**, **dates**, and **payment methods**
- Responsive UI with dark/light mode

### 🛠 Admin Features

- Manage **users**
- Assign and modify **roles** and **permissions**
- Update **application settings**

## Tech Stack

| Layer              | Tech                                                                         | Logo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------ | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend           | React, TypeScript, Tailwind CSS, Redux, React Router DOM, React-icons, Axios | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="130"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="130"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="130"/> <img src="https://camo.githubusercontent.com/03b5d4eb60ed24ad69bed81548fdfe5e91bc98e60431e6228559410203ee8597/68747470733a2f2f656e637279707465642d74626e302e677374617469632e636f6d2f696d616765733f713d74626e3a414e64394763525f4275497a5931343161356e495a6f4745516b4659504e5f6633625164644334757535637452504f3146747036424e795f695635666f65627745495965736e5a4c41366326757371703d434155" width="130"/> <img src="https://axios-http.com/assets/logo.svg" width="130"/> |
| Backend            | NestJS, TypeScript, Multer, Axios, FormData, GraphQL                         | <img src="https://nestjs.com/img/logo-small.svg" width="130"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="130"/> <img src="https://axios-http.com/assets/logo.svg" width="130"/> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT98DxugSAuOVaFkvEL8Lz8Xxl-oCrSVx1dvg&s" width="130"/>                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Auth               | JWT (Access Token, Refresh Token)                                            | <img src="https://jwt.io/img/pic_logo.svg" width="130"/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| OCR                | Mindee API                                                                   | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXZ74z4RYdcCXj4Kv3-9wDotwnaQMn4rlNLQ&s" width="130"/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Currency Converter | Currency Conversion API                                                      | <img src="https://cdn-b.saashub.com/images/app/service_logos/49/875fff4a1c90/large.png?1557742002" width="130"/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Database           | MongoDB, Mongoose                                                            | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="130"/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Dev Tools          | ESLint, Prettier                                                             | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" width="130"/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| DevOps             | Docker, Docker Compose                                                       | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="130"/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Cloud              | Render.com                                                                   | <img src="https://mms.businesswire.com/media/20241112181390/en/2301437/23/Render_logo_-_Black.jpg" width="130"/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB
- Mindee API Key (free tier available)
- (Optional) Docker & Docker Compose

## 🚀 Backend Setup (NestJS)

## 🔐 Environment Variables

create .env file at the root of the backend folder with these fields:
<b> PORT=
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_DB_NAME=
MONGO_PORT=
MONGO_HOST=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
JWT_REFRESH_TOKEN_SECRET=
JWT_REFRESH_TOKEN_EXPIRES_IN=
MINDEE_API_KEY= </b>

than:

```bash
cd backend
npm install
npm run start:dev
```

## 💻 Frontend Setup (React)

cd frontend
npm install
npm start

## Architecture Design

![alt text](./backend/assets/system%20architecture%20expense%20tracker.png)

## Screenshots

## Authentication

## Login

![alt text](./backend/assets/image.png)

## Register

![alt text](./backend/assets/image1.png)

## Forgot Password

![alt text](./backend/assets/image2.png)

## Reset Password

![alt text](./backend/assets/image3.png)

## Main Content

# App Info Modal

![alt text](./backend/assets/image33.png)

## Dashboard

![alt text](./backend/assets/image4.png)
![alt text](./backend/assets/image5.png)

## Add New Transaction

![alt text](./backend/assets/image32.png)

## Transactions

![alt text](./backend/assets/image6.png)

## Edit Transaction

![alt text](./backend/assets/image9.png)

## Remove Transaction

![alt text](./backend/assets/image11.png)

## Remove ALL Transactions

![alt text](./backend/assets/image12.png)

## Export Transactions to Excel

![alt text](./backend/assets/image13.png)

## Add Budget

![alt text](./backend/assets/image7.png)

## Budgets

![alt text](./backend/assets/image8.png)

## Edit Budget

![alt text](./backend/assets/image10.png)

## Remove Budget

![alt text](./backend/assets/image14.png)

## Remove ALL Budgets

![alt text](./backend/assets/image15.png)

## Scan From Receipt

![alt text](./backend/assets/image16.png)

## Currency Converter

![alt text](./backend/assets/image17.png)

## Profile

![alt text](./backend/assets/image18.png)

## Edit Profile

![alt text](./backend/assets/image19.png)

## Application Settings

![alt text](./backend/assets/image20.png)

## Admin

## Admin Dashboard

![alt text](./backend/assets/image21.png)

## Add New User

![alt text](./backend/assets/image22.png)

## Assign Roles To User

![alt text](./backend/assets/image23.png)

## Remove Roles From User

![alt text](./backend/assets/image24.png)

## Users Management

![alt text](./backend/assets/image25.png)

## Edit User Profile

![alt text](./backend/assets/image26.png)

## Delete User

![alt text](./backend/assets/image27.png)

## Delete ALL Users

![alt text](./backend/assets/image28.png)

## Export Users to Excel

![alt text](./backend/assets/image29.png)

## Roles Management

![alt text](./backend/assets/image30.png)

## Manage User Permissions

![alt text](./backend/assets/image31.png)
