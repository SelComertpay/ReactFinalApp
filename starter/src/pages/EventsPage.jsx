import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AddEventForm } from './AddEventForm'; // Import the AddEventForm component
import eventData from "../../events.json"; // Import your JSON data
import "../styles/styles.css"; //

export const EventsPage = () => {
  const initialEvents = eventData.events; // Use all events from eventData
  const [events, setEvents] = useState(initialEvents);

  // Function to handle adding a new event
  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <h1>List of Events</h1>
      <AddEventForm onAddEvent={handleAddEvent} /> {/* Add the AddEventForm component */}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>
              <Link to={`/event/${event.id}`}>{event.title}</Link>
            </h2>
            <p>{event.description}</p>
            <p>Start Time: {event.startTime}</p>
            <p>End Time: {event.endTime}</p>
            <p>Categories: {event.categoryIds.join(', ')}</p>
            <img src={event.image} alt={event.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};
