// src/pages/ExchangeRates.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination, Typography
} from "@mui/material";

const API_URL = "https://v6.exchangerate-api.com/v6/a41112889f184cd14096ae73/latest/USD";

export default function ExchangeRates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        const data = res.data.conversion_rates;
        const rateList = Object.entries(data).map(([currency, rate]) => ({
          currency,
          rate,
        }));
        setRates(rateList);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>Live Exchange Rates (Base: USD)</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Currency</strong></TableCell>
                  <TableCell><strong>Rate</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rates
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.currency}>
                      <TableCell>{row.currency}</TableCell>
                      <TableCell>{row.rate}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={rates.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Paper>
      )}
    </div>
  );
}
