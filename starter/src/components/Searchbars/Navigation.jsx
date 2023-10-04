import { Link } from 'react-router-dom';
import React from "react";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
        <li>
          <Link to="/events/1">Event</Link>
        </li>
      </ul>
    </nav>
  );
};




