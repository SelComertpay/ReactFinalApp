 import React, { useState, useEffect } from "react";
import { EventPanel } from "./EventPanel";
import { useLoaderData, Link } from "react-router-dom";
import {
  Spacer,
  Flex,
  Wrap,
  WrapItem,
  Center,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Input,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const loader = async () => {
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
  const { events, categories } = useLoaderData();
  const [searchField, setSearchField] = useState("");
  const [radioValue, setRadioValue] = useState("");

  const eventsWithCategories = events.map((event) => ({
    ...event,
    categories: Array.isArray(event.categoryIds)
      ? event.categoryIds.map((id) =>
          categories.find((category) => category.id === id).name
        )
      : [], 
  }));

  const [filteredEvents, setFilteredEvents] = useState(eventsWithCategories);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchField(searchParam);
      handleEventSearchChange(searchParam);
    }
  }, [searchParams]);

  const handleEventSearchChange = (value) => {
    setSearchField(value);
    setSearchParams({ search: value });

    setFilteredEvents(
      eventsWithCategories.filter((event) => {
        return event.title.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

 const handleRadioButtonChange = (value) => {
  setRadioValue(value);

  if (value === "All") {
    setFilteredEvents(eventsWithCategories);
  } else {
    setFilteredEvents(
      eventsWithCategories.filter((event) => {
        return event?.categories.includes(value.toLowerCase());
      })
    );
  }
};

  const handleAddEventClick = () => {
    navigate("/add"); 
  };

  return (
    <Center bg="slateblue" minH="100vh">
      <Flex flexDirection="column">
        <Flex flexDir="row">
          <Flex flexDir="column">
            <Input
              m="25px"
              placeholder="Search event"
              width="auto"
              borderColor="Dark Gray"
              variant="filled"
              type="text"
              id="searchField"
              name="searchField"
              value={searchField}
              onChange={(event) => handleEventSearchChange(event.target.value)}
            />
           
            <Flex justifyContent="center">
              <RadioGroup
                m="0 0 15px 20px"
                onChange={handleRadioButtonChange}
                value={radioValue}
                colorScheme="pink"
              >
                <Stack align="center" direction="row">
                  <Radio value="All">All events</Radio> 
                  <Radio value="Sports">Sports</Radio>
                  <Radio value="Games">Games</Radio>
                  <Radio value="Relaxation">Relaxation</Radio>
                  
                </Stack>
              </RadioGroup>
            </Flex>
          </Flex>
          <Spacer />
        
          <Button
            color="white"
            bg="darkorchid"
            m="25px"
            onClick={handleAddEventClick}
          >
            Add a new Event
          </Button>
        </Flex>
        
        <Wrap>
          {filteredEvents.length === 0 ? (
            <Center flexDirection="column" alignItems="center">
              <Text>No events found, please refresh the webpage.</Text>
            </Center>
          ) : (
            filteredEvents.map((event) => (
              <WrapItem key={event.id}>
                <Center gap={4}>
                  <Link to={`/events/${event.id}`}>
                    <EventPanel item={event} key={event.id} />
                  </Link>
                </Center>
              </WrapItem>
            ))
          )}
        </Wrap>
      </Flex>
    </Center>
  );
};