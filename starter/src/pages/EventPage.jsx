import React, { useState } from "react";
import { Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { AddEventForm } from "./AddEventForm";


export const loader = async ({ params }) => {
  const eventResponse = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const usersResponse = await fetch("http://localhost:3000/users");

  const event = await eventResponse.json();
  const categories = await categoriesResponse.json();
  const users = await usersResponse.json();

  return {
    event,
    categories,
    users,
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();

  const [events, setEvents] = useState([]); // State to keep track of events

  const handleAddEvent = (newEvent) => {
    // Add the new event to the list of events
    setEvents([...events, newEvent]);
  };

  if (!event) {
    // Handle the case where event data is undefined or still loading
    return <div>Loading event details...</div>;
  }

  return (
    <div className="event-details">
      <Heading>Event</Heading>

      {/* AddEventForm to allow adding more events */}
      <AddEventForm onAddEvent={handleAddEvent} />

      {/* List of events */}
      <ul>
        {events.map((addedEvent) => (
          <div key={addedEvent.id} className="event">
            {/* Display details of each added event */}
            <h2>{addedEvent.title}</h2>
            <p>{addedEvent.description}</p>
            {/* Add other details */}
          </div>
        ))}
      </ul>
    </div>
  );
};