import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import { AuthProvider } from "@propelauth/react";
import Profile from "./Pages/Profile";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./lib/firebaseConfig";
import Login from "./Pages/Login";
import AuthRoute from "./components/AuthRoute";
import { onAuthStateChanged, getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export interface IApplicationProps {}

const App: React.FC<IApplicationProps> = (props) => {
  return (
    <>
      {" "}
      <Router>
        {" "}
        <div className="App">
          <header>
            <Header />
          </header>
          <AuthRoute>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />

              <Route path="/coins/:id" element={<CoinPage />} />
            </Routes>
          </AuthRoute>
        </div>{" "}
      </Router>
    </>
  );
};

export default App;
