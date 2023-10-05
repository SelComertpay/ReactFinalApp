import React, { useState } from "react";
import {
  Button,
  Center,
  List,
  ListItem,
  Tag,
  TagLabel,
  Text,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { Popup } from "../components/ShowUp/Popup";
import { SearchBar } from "../components/SecPages/SearchBar";
import { SearchResultsList } from "../components/SecPages/SearchResultsList";
import { CatSearchBar } from "../components/SecPages/CatSearchBar";
import { CatSearchResultsList } from "../components/SecPages/CatSearchResultsList";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const { events, categories } = useLoaderData();

  const [results, setResults] = useState([]);
  const [resultsCat, setResultsCat] = useState([]);

  return (
    <Center display="flex" flexDir="column" align="center" bg="lightgrey">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results} />
      </div>
      <div className="cat-search-bar-container">
        <CatSearchBar setResultsCat={setResultsCat} />
        <CatSearchResultsList results={resultsCat} />
      </div>
      <Button
        className="add-event"
        onClick={() => setButtonPopup(true)}
        colorScheme="blue"
      >
        Add Event
      </Button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        {/* Include a form for creating events here */}
        <h3>Create Event</h3>
        {/* Add input fields, submit button, etc. */}
      </Popup>
      <List>
        {events.map((event) => (
          <ListItem key={event.id} className="event">
            <Link to={`/events/${event.id}`}>
              <Box w="100%">
                <img
                  className="image"
                  src={event.image}
                  alt="Event"
                  style={{ width: "900px", height: "600px" }}
                />
              </Box>
            </Link>
            <Box className="information">
              <Text as="h2">{event.title}</Text>
              <Text>{event.description}</Text>
              <Text>Start time: {event.startTime}</Text>
              <Text>End time: {event.endTime}</Text>
              <Text>
                Categories:
                {categories
                  .filter((category) =>
                    event.categoryIds?.includes(category.id) ? category.name : ""
                  )
                  .map((category) => (
                    <Tag key={category.id} size="sm" colorScheme="blue">
                      <TagLabel>{category.name}</TagLabel>
                    </Tag>
                  ))}
              </Text>
            </Box>
          </ListItem>
        ))}
      </List>
    </Center>
  );
};
