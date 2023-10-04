import React from "react";

export const SearchResult = ({ result }) => {
  return (
    <div>
      <h2>{result.title}</h2>
      <p>{result.description}</p>
      <p>Scroll down to check out this event!</p>
    </div>
  );
};