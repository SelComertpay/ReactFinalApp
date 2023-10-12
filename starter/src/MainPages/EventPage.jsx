import React from "react";
import {
  Center,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Tag,
  TagLabel,
  Avatar,
  Text,
  Box,
  Spacer,
  Image,
  useToast,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

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
  const toast = useToast();
  const categoryIds = Array.isArray(event.categoryIds) ? event.categoryIds : [];
  const categoryNames = categoryIds.map((id) =>
    categories.find((category) => category.id === id)?.name || "Unknown"
  );
 
  const reverseString = (date) => {
    const splitDate = date.split("-");
    const reverseArray = splitDate.reverse();
    const joinArray = reverseArray.join("-");
    return joinArray;
  };
  
  const user = users.find((user) => user.id === event.createdBy) || {};
  const finalEvent = {
    ...event,
    date: reverseString(event.startTime?.slice(0, 10).toString() || ""),
    startTime: event.startTime
      ? event.startTime.split("T")[1]?.slice(0, 5).toString()
      : "",
    endTime: event.endTime ? event.endTime.split("T")[1]?.slice(0, 5).toString() : "",
    categoryNames: categoryNames,
    userName: user.name || "Unknown",
    userImage: user.image || "DefaultImageURL",
  };
  
  const showToast = (id) => {
    toast({
      title: "Warning",
      description: `You deleted ${id.title}`,
      duration: 2000,
      isClosable: true,
      status: "warning",
      position: "top",
    });
  };
  
  const handleDelete = () => {
    const toastId = "delete-confirmation";
  toast({
    id: toastId,
    render: () => (
     
      <Button
        color="darkgreen"
        onClick={() => {
          fetch(`http://localhost:3000/events/${event.id}`, {
            method: "DELETE",
          })
            .then(() => {
              toast.close(toastId);
              showToast(event);
              history.push("/events");
            })
            .catch((error) => {
                            console.error("Error deleting event:", error);
            });
        }}
         >
        Are you 100% sure?
      </Button>
    ),
    position: "top-right",
    duration: 2000,
    isClosable: true,
  });
};
  
const text = (label, content) => (
    <Flex>
      <Text fontStyle="italic" fontWeight="bold">
        {label} {" =>"}
      </Text>
      <Text>{content}</Text>
    </Flex>
  );
  
  const listItems = (items) => (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>{item}</ListItem>
      ))}
    </List>
  );
 
  return (
    <Center display="flex" flexDir="column" align="center" bg="slateblue">
      <Card minW={450} h="full">
        <CardHeader fontWeight="bold">
          <h1>{finalEvent.title}</h1>
          <CardHeader m={0} p={0}>
            <Flex flexDir="column" color="white">
              <Image src={finalEvent.image} w="100%" h="15em" />
            </Flex>
          </CardHeader>
        </CardHeader>
        
        <CardBody align="center">
          {text("Activity", finalEvent.description)}
          {text("Date", finalEvent.date)}
          {text("Time", `${finalEvent.startTime} - ${finalEvent.endTime} hrs`)}
          {text("Location", finalEvent.location)}
          {finalEvent.categoryNames ? (
            <List>
              <ListItem>
                {text("Categories", listItems(finalEvent.categoryNames))}
              </ListItem>
            </List>
          ) : (
            <p>No categories available.</p>
          )}
        </CardBody>
        <hr />
        
        <CardFooter pl={-5} pr={0}>
          <Flex w="100%">
            <Box w="50%">
              <Tag size="lg" borderRadius="full" bgColor="white">
                <Avatar
                  src={finalEvent.userImage}
                  size="md"
                  name={finalEvent.userName}
                  ml={-3}
                  mr={3}
                />
                <TagLabel font={9}> {finalEvent.userName}</TagLabel>
              </Tag>
            </Box>
           
            <Spacer />
            <Box w="16.5%">
              <Link to={`/events/${event.id}/edit`}>
                <Button
                  colorScheme="green"
                  size="sm"
                  padding={4}
                  onClick={(event) => {
                    event.target.value;
                  }}
                >
                  edit
                </Button>
              </Link>
            </Box>
            <Spacer />
           
            <Box w="16.5%">
              <Link to={"/"}>
                <Button
                  colorScheme="red"
                  size="sm"
                  padding={4}
                  onClick={handleDelete}
                >
                  delete
                </Button>
              </Link>
            </Box>
           
            <Spacer />
            <Box w="16.5%">
              <Link to={"/"}>
                <Button colorScheme="blue" size="sm" padding={4}>
                  back
                </Button>
              </Link>
            </Box>
          </Flex>
        </CardFooter>
      </Card>
    </Center>
  );
};