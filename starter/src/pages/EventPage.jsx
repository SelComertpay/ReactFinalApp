import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import eventData from '../../events.json'; // Import your JSON data
import "../styles/styles.css";
export const EventPage = () => {
  const { eventId } = useParams();

  // Find the event with the matching eventId
  const event = eventData.events.find((event) => event.id === parseInt(eventId));

  if (!event) {
    // Handle the case where the event is not found
    return <p>Event not found.</p>;
  }

  const { title, description, startTime, endTime, categoryIds, image } = event;

  return (
    <div>
      <Heading>{title}</Heading>
      <Text>{description}</Text>
      <Text>Start Time: {startTime}</Text>
      <Text>End Time: {endTime}</Text>
      <Text>Categories: {categoryIds.join(', ')}</Text>
      <img src={image} alt={title} />
    </div>
  );
};
