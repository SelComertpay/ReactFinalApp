import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Button, Center, Text, List, ListItem, Tag, TagLabel, Box } from "@chakra-ui/react";
import { Popup2 } from "../components/Popups/Popup2";
import { UpdateEventForm } from "../components/Form/UpdateEventForm";
import { Popup3 } from "../components/Popups/Popup3";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  const [buttonPopup, setButtonPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <div className="event-details">
      <Center>
        <Button colorScheme="blue" onClick={() => setButtonPopup(true)}>
          Edit Event
        </Button>
      </Center>
      <Popup2 trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3>Edit Event</h3>
        <UpdateEventForm event={event} />
      </Popup2>

      <Center>
        <Button colorScheme="red" onClick={() => setShowDeleteConfirmation(true)}>
          Delete Event
        </Button>
      </Center>

      <Popup3 trigger={showDeleteConfirmation} setTrigger={setShowDeleteConfirmation}>
        {showDeleteConfirmation && (
          <>
            <h3>Are you sure you want to delete this event?</h3>
            <Button
              colorScheme="red"
              onClick={() => {
                // Handle the deletion logic here
                // Once the event is deleted, you can close the confirmation dialog.
                setShowDeleteConfirmation(false);
              }}
            >
              Confirm
            </Button>
          </>
        )}
      </Popup3>

      <List>
        <ListItem key={event.id} className="event-info">
          <img className="image" src={event.image} alt="Event" />
          <Text as="h2" fontSize="xl" fontWeight="bold" color="teal.600">
            {event.title}
          </Text>
          <Text color="gray.600">{event.description}</Text>
          <Text>Start time: {event.startTime}</Text>
          <Text>End time: {event.endTime}</Text>
          <Text>
            Categories:
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
  );
};
