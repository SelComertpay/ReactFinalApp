import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  FormControl,
  Input,
  Textarea,
  Heading,
  FormLabel,
  Button,
  Stack,
  HStack,
  Select,
  useToast,
} from "@chakra-ui/react";

export const loader = async ({ params }) => {
  const eventId = params.eventId;
  const event = await fetch(`http://localhost:3000/events/${eventId}`);
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventEdit = () => {
  const { event, users, categories } = useLoaderData();
  const [eventObject, setEventObject] = useState(event);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault(); 
    showToast();

    eventObject.startTime = `${eventObject.date}T${eventObject.startTime}`;
    eventObject.endTime = `${eventObject.date}T${eventObject.endTime}`;

    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        body: JSON.stringify(eventObject),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Resource updated successfully");
        navigate("/");
      } else {
        alert("Failed to update resource");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toast = useToast();

const showToast = () => {
  toast({
    title: "Submit",
    description: "You successfully changed the event",
    duration: 4000,
    isClosable: true,
    status: "success",
    position: "top",
    colorScheme: "pink", // Set the color scheme to "pink"
    variant: "subtle", // You can choose "subtle", "solid", or "left-accent" for the variant
  });
};

const { title, image, description, date, startTime, endTime, location } = eventObject;

  return (
    <Card variant="elevated" borderRadius={10} align="center" m="10">
      <Heading padding="5px" fontSize="md">
        Make your changes
      </Heading>

      <form onSubmit={onSubmit}>
        
        <FormControl>
          <Input
            type="text"
            name="title"
            width="sm"
            placeholder="title"
            mt="4"
            value={title}
            onChange={(e) =>
              setEventObject({ ...eventObject, title: e.target.value })
            }
          />
        </FormControl>
       
        <FormControl>
          <Input
            type="url"
            name="image"
            pattern="https://.*"
            width="sm"
            placeholder="http://image-url"
            mt="4"
            value={image}
            onChange={(e) =>
              setEventObject({ ...eventObject, image: e.target.value })
            }
          />
        </FormControl>
       
        <FormControl>
          <Textarea
            name="description"
            placeholder="Event description"
            rows="8"
            mt="4"
            w="sm"
            value={description}
            onChange={(e) =>
              setEventObject({
                ...eventObject,
                description: e.target.value,
              })
            }
          />
        </FormControl>
        
        <FormControl display="flex" ml="2" mt="4">
          <HStack spacing="4">
            <FormLabel mb="0">Category</FormLabel>
            <Select variant="outline" name="categoryIds">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>

            <FormLabel mb="0">Creator</FormLabel>

            <Select name="createdBy">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </HStack>
        </FormControl>
       
        <FormControl display="flex" m="2">
          <FormLabel width="20">Where</FormLabel>
          <Input
            type="text"
            name="location"
            width="75"
            value={location}
            onChange={(e) =>
              setEventObject({ ...eventObject, location: e.target.value })
            }
          />
        </FormControl>
        
        <FormControl display="flex" m="2">
          <FormLabel width="20">Date</FormLabel>
          <Input
            type="date"
            name="date"
            w="75"
            value={date}
            onChange={(e) =>
              setEventObject({ ...eventObject, date: e.target.value })
            }
          />
        </FormControl>
       
        <FormControl display="flex" m="2">
          <FormLabel width="20">From</FormLabel>
          <Input
            type="time"
            name="startTime"
            w="75"
            value={startTime}
            onChange={(e) =>
              setEventObject({ ...eventObject, startTime: e.target.value })
            }
          />
        </FormControl>
      
        <FormControl display="flex" m="2">
          <FormLabel width="20">Till</FormLabel>
          <Input
            type="time"
            name="endTime"
            width="75"
            value={endTime}
            onChange={(e) =>
              setEventObject({ ...eventObject, endTime: e.target.value })
            }
          />
        </FormControl>
      
        <Stack>
          <Button colorScheme="blue" size="sm" type="submit">
            Submit
          </Button>
          <Link to={"/"}>
            <Button colorScheme="gray" size="sm" width="100%">
              Go Back
            </Button>
          </Link>
        </Stack>
      
      </form>
    </Card>
  );
};
