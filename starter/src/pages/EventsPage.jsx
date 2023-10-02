import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";

export const loader = async () => {
  // Adjust the URLs to match your server endpoints
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return {
    events: await events.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventsPage = () => {
  const { events, categories, users } = useLoaderData();

  // State for search and filter
  const [searchField, setSearchField] = useState("");
  const [radioValue, setRadioValue] = useState("");

  const eventsWithCategories = events.map((event) => ({
    ...event,
    key: event.id,
    categories: event.categoryIds.map(
      (id) => categories.find((category) => category.id === id)?.name
    ),
  }));

  const [filteredEvents, setFilteredEvents] = useState(eventsWithCategories);

  const handleSearchInputChange = (value) => {
    setSearchField(value);
    setFilteredEvents(
      eventsWithCategories.filter((event) => {
        return event.title.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  const handleRadioButtonChange = (value) => {
    setRadioValue(value);

    setFilteredEvents(
      eventsWithCategories.filter((event) => {
        return event?.categories.includes(value.toLowerCase());
      })
    );
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg="lightsteelblue"
      padding="20px"
    >
      <Heading size="xl" color="blue.600" marginBottom="20px">
        Events Page
      </Heading>
      <Flex flexDirection="column" alignItems="center" width="100%">
        <Box width="100%" marginBottom="20px">
          <Input
            placeholder="Search by event name"
            borderColor="blue.500"
            variant="filled"
            type="text"
            id="searchField"
            name="searchField"
            value={searchField}
            onChange={(event) => handleSearchInputChange(event.target.value)}
          />
        </Box>
        <RadioGroup
          onChange={(value) => handleRadioButtonChange(value)}
          value={radioValue}
        >
          <Stack direction="row" spacing={4}>
            <Radio value={"Sports"} colorScheme="teal">
              Sports
            </Radio>
            <Radio value={"Games"} colorScheme="teal">
              Games
            </Radio>
            <Radio value={"Relaxation"} colorScheme="teal">
              Relaxation
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <Wrap spacing="20px" width="100%" justify="center">
        {filteredEvents.map((event) => (
          <WrapItem key={event.id}>
            <Link to={`/events/${event.id}`}>
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="4"
                bg="white"
                boxShadow="md"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.05)" }}
              >
                <Center>
                  {/* Center the event image */}
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{
                      display: "block",
                      margin: "0 auto",
                      maxWidth: "100%",
                    }}
                  />
                </Center>
                <Heading size="md" color="blue.600">
                  {event.title}
                </Heading>
                <p>{event.description}</p>
                <Center>
                  {/* Display the user image */}
                  <img
                    src={users.find((user) => user.id === event.createdBy)?.image}
                    alt=""
                    style={{
                      display: "block",
                      margin: "10px auto",
                      maxWidth: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </Center>
              </Box>
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
};
