import { useEffect, useState } from "react";
import { useDarkMode } from "./useDarkMode";
import axios from "axios";

const useCurrencyConverter = () => {
  const { isDarkMode } = useDarkMode();
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ILS");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://api.exchangerate-api.com/v4/latest/";

  const CURRENCIES = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "INR",
    "AUD",
    "CAD",
    "CHF",
    "ILS",
  ];

  useEffect(() => {
    const fetchConversionRate = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}${fromCurrency}`);
        const rate = response.data.rates[toCurrency];
        setConvertedAmount(amount * rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversionRate();
  }, [fromCurrency, toCurrency, amount]);

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      try {
        const today = new Date();
        const pastWeek = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(today.getDate() - i);
          return d.toISOString().split("T")[0];
        });

        const historicalRates = await Promise.all(
          pastWeek.map(async (date) => {
            const response = await axios.get(`${API_URL}${fromCurrency}`);
            return { date, rate: response.data.rates[toCurrency] };
          })
        );

        setHistoricalData(historicalRates.reverse());
      } catch (error) {
        console.error("Error fetching historical exchange rates:", error);
      }
    };

    fetchHistoricalRates();
  }, [fromCurrency, toCurrency]);

  return {
    isDarkMode,
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    CURRENCIES,
    toCurrency,
    setToCurrency,
    loading,
    convertedAmount,
    historicalData,
  };
};

export default useCurrencyConverter;
