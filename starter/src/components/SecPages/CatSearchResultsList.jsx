import React from "react";
import { CatSearchResult } from "./CatSearchResult";

export const CatSearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <CatSearchResult result={result} key={id} />;
      })}
    </div>
  );
};