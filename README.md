# 📚 Book Store (Firebase & React)

A modern, responsive, and full-featured Book Store web application built using **React**, **Vite**, **Ant Design**, **Tailwind CSS**, and **Firebase** (Authentication & Firestore).

---

## 🚀 Features

- 🔐 **User Authentication**: Secure Login, Registration, and Password Reset powered by Firebase Auth.
- 👤 **User Profiles**: Automatic profile creation and user meta-data storage in Firebase Firestore.
- 🛡️ **Protected Routing**: Secure dashboard and customer areas utilizing React Router route guards.
- 🎨 **Modern & Responsive UI**: Clean and beautiful interface styled with Ant Design components and modern Tailwind CSS.
- ⚡ **Vite HMR**: Extremely fast development environment with Hot Module Replacement.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Ant Design](https://ant.design/)
- **Routing**: [React Router Dom v6](https://reactrouter.com/)
- **Backend as a Service**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Analytics)

---

## 📦 Getting Started

Follow these steps to set up and run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/SufyanAli-7/Book-Store-Firebase.git
cd "Book Store"
```

### 2. Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory (or copy from `.env.sample`):
```bash
cp .env.sample .env
```
Open the `.env` file and replace the placeholders with your actual Firebase Configuration keys:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

VITE_CONTINUE_URL=http://localhost:5173/auth/login
```

### 4. Run Development Server
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 5. Production Build
To build the application for production:
```bash
npm run build
```
The output files will be generated in the `dist` directory.

---

## 📁 Directory Structure
```text
Book Store/
├── public/
├── src/
│   ├── components/       # Reusable components (Header, Footer, Loaders, etc.)
│   ├── config/           # Configuration files (Firebase, global setup)
│   ├── context/          # Context API providers (AuthContext)
│   ├── pages/            # Application views (Frontend, Auth, Dashboard)
│   ├── App.jsx           # Main App entry with context provider
│   ├── main.jsx          # React DOM mounting
│   └── index.css         # Styling entryway
├── .env                  # Local environment config (gitignored)
├── .env.sample           # Sample environment file template
├── .gitignore            # Git ignore file list
├── package.json          # Dependencies and scripts list
└── vite.config.js        # Vite compilation config
```
