// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoanCalculator from "./components/LoanCalculator";
import About from "./pages/About";
import ExchangeRates from "./pages/ExchangeRates";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoanCalculator />} />
        <Route path="/about" element={<About />} />
        <Route path="/exchange-rates" element={<ExchangeRates />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
