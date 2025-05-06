// src/hooks/useExchangeRates.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://v6.exchangerate-api.com/v6/a41112889f184cd14096ae73/latest/USD";

export default function useExchangeRates() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(API_URL);
        setRates(res.data.conversion_rates || {});
      } catch (err) {
        console.error("Failed to fetch exchange rates:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return { rates, loading, error };
}
