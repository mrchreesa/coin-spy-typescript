import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";

const App: React.FC = () => {
  // const classes = useStyles();
  return (
    <>
      {" "}
      <Router>
        <div className="App">
          <header>
            <Header />
          </header>

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
