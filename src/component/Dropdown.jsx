import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Dropdown = ({
  currency,
  toCurrency,
  fromCurrency,
  selectedCurrency,
  title,
  favourites,
  selectedFavorites,
  setFavourites,
  handleFavourite,
}) => {
  return (
    <div className="flex flex-col relative">
      <label className="text-indigo-700 font-bold" htmlFor={title}>
        {title}:
      </label>
      <select
        name="currency"
        id={title.toLowerCase()}
        value={title === "From" ? fromCurrency : toCurrency}
        onChange={(e) => selectedCurrency(e.target.value)}
        className="w-28 border border-slate-300 outline-none p-2 rounded-md focus:ring-indigo-500 focus:ring-2"
      >
        {favourites.map((fav, i) => (
          <option key={i} title={fav} value={fav}>
            {fav}
          </option>
        ))}
        <hr />
        {currency
          ?.filter((curr) => curr == curr)
          .map((currencies, i) => (
            <option key={i} title={currencies.name} value={currencies.symbol}>
              {currencies.symbol}
            </option>
          ))}
      </select>
      <button
        title="Favourite"
        className="absolute  right-5 top-9"
        onClick={() => handleFavourite(selectedFavorites)}
      >
        {favourites.includes(selectedFavorites) ? (
          <FaStar fill="orange" />
        ) : (
          <FaRegStar fill="orange" />
        )}
      </button>
    </div>
  );
};

export default Dropdown;
