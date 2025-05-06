// src/components/LoanCalculator.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext } from "../context/ThemeContext";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useExchangeRates from "../hooks/useExchangeRates";
import "../styles/LoanCalculator.css";

export default function LoanCalculator() {
  const { toggleColorMode } = useContext(ColorModeContext);
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [term, setTerm] = useState(5);
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const { rates, loading, error } = useExchangeRates();

  const calculateEmi = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate) / 100;
    const months = parseInt(term) * 12;

    const monthlyRate = annualRate / 12;
    const emiCalc =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setEmi(emiCalc.toFixed(2));

    // Amortization schedule
    const newSchedule = [];
    let balance = principal;
    for (let i = 1; i <= months; i++) {
      const interest = balance * monthlyRate;
      const principalPaid = emiCalc - interest;
      balance -= principalPaid;
      newSchedule.push({
        month: i,
        principal: principalPaid.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance.toFixed(2),
      });
    }
    setSchedule(newSchedule);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="title">Loan Calculator</div>
        <div className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/exchange-rates">EXCHANGE RATES (LIVE)</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/invalid-url">ERROR PAGE</Link>
          <IconButton onClick={toggleColorMode} color="inherit">
            <Brightness4Icon />
          </IconButton>
        </div>
      </nav>

      <div className="calculator">
        <Typography variant="h5" gutterBottom>EMI Calculator</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Loan Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Interest Rate (%)"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Loan Term (Years)"
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 2 }} onClick={calculateEmi}>
          Calculate EMI
        </Button>

        {emi && (
          <div className="result">
            <Typography variant="h6" mt={2}>Monthly EMI: ₹{emi}</Typography>

            {!loading && !error && (
              <div>
                <Typography variant="subtitle1" mt={2}>EMI in other currencies:</Typography>
                <ul>
                  <li>USD: ${(emi / rates["INR"]).toFixed(2)}</li>
                  <li>EUR: €{((emi / rates["INR"]) * rates["EUR"]).toFixed(2)}</li>
                  <li>GBP: £{((emi / rates["INR"]) * rates["GBP"]).toFixed(2)}</li>
                  <li>AED: د.إ{((emi / rates["INR"]) * rates["AED"]).toFixed(2)}</li>
                </ul>
              </div>
            )}

            <Typography variant="h6" mt={2}>Amortization Schedule</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Principal</TableCell>
                    <TableCell>Interest</TableCell>
                    <TableCell>Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedule.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.principal}</TableCell>
                      <TableCell>{row.interest}</TableCell>
                      <TableCell>{row.balance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
}
