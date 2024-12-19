import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { LuArrowLeftRight } from "react-icons/lu";
import axios from "axios";

const CurrencyBox = () => {
  const [currency, setCurrency] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const API_KEY = "6763980c17msh6204558b8766f1ep125f62jsn3332e24212a0";

  const loadCurrency = async () => {
    try {
      const res = await axios.get(
        "https://currency-converter18.p.rapidapi.com/api/v1/supportedCurrencies",
        {
          headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "currency-converter18.p.rapidapi.com",
          },
        }
      );
      setCurrency(res.data);
    } catch (error) {
      setError("Failed to load currencies. Please try again later.");
    }
  };

  const swapCurrencies = () => {
    setToCurrency(fromCurrency);
    setFromCurrency(toCurrency);
  };

  const convertCurrency = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://currency-converter18.p.rapidapi.com/api/v1/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`,
        {
          headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "currency-converter18.p.rapidapi.com",
          },
        }
      );
      setConvertedAmount(res.data);
    } catch (error) {
      setError("Failed to convert currency. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleFavourite = (currencySymbol) => {
    setFavourites((prev) =>
      prev.includes(currencySymbol)
        ? prev.filter((fav) => fav !== currencySymbol)
        : [...prev, currencySymbol]
    );
  };
  useEffect(() => {
    loadCurrency();
  }, []);

  console.log(favourites);

  return (
    <div className="backdrop-blur-sm border-slate-200 border bg-slate-50/15 shadow-md rounded-md w-[500px] p-5">
      <h1 className="text-center text-red-400 text-3xl mb-10 font-bold">
        Currency Converter
      </h1>
      <div className="flex justify-between items-end">
        <Dropdown
          currency={currency}
          selectedCurrency={setFromCurrency}
          toCurrency={toCurrency}
          fromCurrency={fromCurrency}
          title="From"
          selectedFavorites={fromCurrency}
          favourites={favourites}
          setFavourite={setFavourites}
          handleFavourite={handleFavourite}
        />
        <button
          onClick={swapCurrencies}
          className="border rounded-full p-3 shadow-lg hover:bg-slate-100 transition-all"
        >
          <LuArrowLeftRight />
        </button>
        <Dropdown
          currency={currency}
          selectedCurrency={setToCurrency}
          toCurrency={toCurrency}
          fromCurrency={fromCurrency}
          title="To"
          handleFavourite={handleFavourite}
          favourites={favourites}
          setFavourite={setFavourites}
          selectedFavorites={toCurrency}
        />
      </div>
      <div className="w-full mt-3">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-transparent border rounded-md h-9 py-3 px-2 outline-none"
        />
      </div>
      <div className="w-full mt-8">
        <button
          disabled={!amount || isLoading}
          onClick={convertCurrency}
          className="text-center bg-violet-700 py-3 w-full text-white font-bold rounded-md disabled:bg-violet-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Converting..." : "Convert"}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {convertedAmount && (
          <p className="font-medium text-green-700 mt-4 text-right">
            {`Current price of ${convertedAmount?.result?.amountToConvert} ${
              convertedAmount?.result?.from
            } 
            to ${
              convertedAmount?.result?.to
            } is ${(convertedAmount?.result?.convertedAmount).toFixed(2)} ${
              convertedAmount?.result?.to
            }`}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyBox;
