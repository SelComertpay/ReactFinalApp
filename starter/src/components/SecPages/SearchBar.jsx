import { useState } from "react";
import React from "react";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const fetchData = (value) => {
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((event) => {
          return (
            value &&
            event &&
            event.title &&
            event.title.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const [input, setInput] = useState("");
  return (
    <div className="input-wrapper">
      <h2>Search for event title:</h2>
      <input
        className="input-searchbar"
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};