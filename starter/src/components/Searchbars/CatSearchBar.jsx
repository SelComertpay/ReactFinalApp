import { useState } from "react";
import React from "react";
import "./CatSearchBar.css";

export const CatSearchBar = ({ setResultsCat }) => {
  const fetchData = (value) => {
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((json) => {
        const resultsCat = json.filter((event) => {
          return (
            value &&
            event &&
            event.categoryIds &&
            event.categoryIds.includes((value = Number(value)))
          );
        });
        setResultsCat(resultsCat);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const [input, setInput] = useState("");
  return (
    <div className="input-wrapper-cat">
      <h2>Search for event category:</h2>
      <p>Type 1 for sports</p>
      <p>Type 2 for games</p>
      <p>Type 3 for relaxation</p>
      <input
        className="input-searchbar-cat"
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};