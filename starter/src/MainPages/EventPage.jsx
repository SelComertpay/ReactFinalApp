
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, Center, Text, List, ListItem, Tag, TagLabel, Box } from "@chakra-ui/react";
import { Popup2 } from "../components/ShowUp/Popup2";
import { UpdateEventForm } from "../components/Fills/UpdateEventForm";
import { Popup3 } from "../components/ShowUp/Popup3";
import deleteEvent from "../components/SecPages/DeleteEvent"; // Import the DeleteEvent module

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  const eventData = await event.json();
  const categoryData = await categories.json();
  const userData = await users.json();

  return {
    event: eventData,
    categories: categoryData,
    users: userData,
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  const [buttonPopup, setButtonPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleEventDeletion = async () => {
    try {
      const deleted = await deleteEvent(event.id); // Call the DeleteEvent module
      if (deleted) {
        // If the deletion is successful, you can perform any additional actions here
        console.log('Event deleted successfully');
        // You can also navigate back to the events page or update the UI as needed
        navigate('/events');
      } else {
        // Handle errors if the deletion fails
        console.error('Error deleting event');
        // Optionally, display an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const customStyles = {
    backgroundColor: "darkgrey", // Set background color to dark grey
    color: "darkgoldenrod", // Set font color to dark yellow
  };

  return (
    <Center>
      <div className="event-details">
        <Button
          className="back-button"
          colorScheme="teal"
          variant="outline"
          style={{ marginBottom: "10px" }}
          onClick={() => navigate("/events")}
        >
          Back to Events
        </Button>

        <Button colorScheme="yellow" onClick={() => setButtonPopup(true)}>
          Edit Event
        </Button>
        <Popup2 trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>Edit Event</h3>
          <UpdateEventForm event={event} />
        </Popup2>

        <Button colorScheme="red" onClick={() => setShowDeleteConfirmation(true)}>
          Delete Event
        </Button>
        
        <Popup3
          trigger={showDeleteConfirmation}
          setTrigger={setShowDeleteConfirmation}
          onDelete={handleEventDeletion} // Pass the handleEventDeletion function
          event={event}
        >
          {showDeleteConfirmation && (
            <>
              <h3>Are you 100% sure you want to delete this event?</h3>
              <Button
                colorScheme="red"
                onClick={() => {
                  // You can remove the local onClick handler for "Confirm" button
                  setShowDeleteConfirmation(false);
                }}
                style={customStyles}
              >
                Confirm
              </Button>
            </>
          )}
        </Popup3>

        <List>
          <ListItem
            key={event.id}
            className="event-info"
            style={customStyles}
          >
            <img className="image" src={event.image} alt="Event" />
            <Text as="h2" fontSize="xl" fontWeight="bold" color="teal.600">
              {event.title}
            </Text>
            <Text color="gray.600">{event.description}</Text>
            <Text>Start time: {event.startTime}</Text>
            <Text>End time: {event.endTime}</Text>
            <Text>
              Categories:{" "}
              {categories
                .filter((category) => event.categoryIds?.includes(category.id))
                .map((category) => (
                  <Tag key={category.id} size="sm" colorScheme="blue">
                    <TagLabel>{category.name}</TagLabel>
                  </Tag>
                ))}
            </Text>
            <Text>
              Created by:{" "}
              {users.find((user) => event.createdBy === user.id)?.name}
              <Box>
                <img
                  className="image-user"
                  src={users.find((user) => event.createdBy === user.id)?.image}
                  alt="User"
                />
              </Box>
            </Text>
          </ListItem>
        </List>
      </div>
    </Center>
  );
};
