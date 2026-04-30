# 📚 Welcome to Book Lover!

Book Lover is a web application designed to help users organize and manage their reading lists.

Book Lover has reached a stable MVP stage. New features are currently being planned for future releases.

## 🌐 Live Demo

[Visit Book Lover webiste](https://booklover-app-t8uj5.ondigitalocean.app)

## ⚙️ Tech Stack

- React – UI development
- Vite – fast development environment
- React Router – client-side routing
- Supabase – authentication, database, and backend services
- Playwright – End-to-End Testing
- Digital Ocean – deployment

## ✨ Key Features

- User authentication (Supabase)
- Create, update and manage reading lists
- Book tracking system
- Multi-language support (i18n)
- Responsive design (mobile-first)
- PWA installable application

## 📱 Progressive Web App (PWA)

Book Lover is a **Progressive Web App (PWA)**, which means it can be installed on both desktop and mobile devices like a native application.

### Install on Desktop (Chrome / Edge)

1. Open the app in your browser
2. Look for the **install icon** in the address bar (or open the browser menu ⋮)
3. Click **"Install Book Lover"**
4. The app will be installed and open in a standalone window (no browser UI)

### Install on Mobile

#### Android (Chrome)

1. Open the app in Chrome
2. Tap the **menu (⋮)** in the top-right corner
3. Select **"Add to Home screen"** or **"Install app"**
4. Confirm installation

#### iOS (Safari)

1. Open the app in Safari
2. Tap the **Share button**
3. Select **"Add to Home Screen"**
4. Confirm
  
## ⚡ Getting Started

### Prerequisites

- Node.js ≥ 18
- A Supabase account

### Installation

Install the dependencies:

```bash
npm install
```

### Environment variables

Create a .env file at the root of the project:

```bash
SUPABASE_URL="http://127.0.0.1:XXXXX"
SUPABASE_PUBLISHABLE_KEY="your_publishable_key"
SESSION_SECRET="your_secret"
TEST_USER_EMAIL="john@test.com"
TEST_USER_PASSWORD="your_password"
VITE_API_URL="http://localhost:XXXX"
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

## 📅 Project Management

Project planning and task tracking are managed using GitHub Projects:
[Project](https://github.com/users/ChloeGarciaMillerand/projects/5)

## 📊 Project Status

Book Lover has reached the MVP stage.
The project focuses on clean architecture, core features, and real-world workflows (authentication, CRUD operations, testing, and deployment).

## 💡 Why this project?

This project demonstrates:

- the ability to design and structure a React application
- integration of a real backend (auth + database)
- handling of common product features (auth, CRUD, routing)
- testing and deployment in a realistic environment
- the ability to make technical decisions and manage a project from concept to delivery

Book Lover was born from a real personal need: my family and I read a lot, and we wanted a simple and efficient way to organize and track our reading lists.
This real-world context guided both the functional scope and the technical choices made throughout the project.

## 🖌️ Design

The application was initially designed using Figma, where I created the first mockups and user flows.
This design phase is something I genuinely enjoy and consider essential for building coherent and user-focused applications.

![BookLover](https://github.com/ChloeGarciaMillerand/BookLover/blob/main/booklover_mockup.png?raw=true)
