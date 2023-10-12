import { useLoaderData, redirect, Form, Link } from "react-router-dom";
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

export const createAction = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());

  const modifyStartTime = data.date.concat(`T${data.startTime}`);
  const modifyEndTime = data.date.concat(`T${data.endTime}`);
  const categoryToInteger = [parseInt(data.categoryIds)];
  const userIdToInteger = parseInt(data.createdBy);
  const finalData = {
    ...data,
    createdBy: userIdToInteger,
    categoryIds: categoryToInteger,
    startTime: modifyStartTime,
    endTime: modifyEndTime,
  };

  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(finalData),
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .then(json => json.id);

  return redirect(`/events/${newId}`);
};

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  return {
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventCreation = () => {
  const { users, categories } = useLoaderData();
  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Submit",
      description: "new event succesfully added",
      duration: 3000,
      isClosable: true,
      status: "success",
      position: "top",
    });
  };

  return (
    <>
      <Card
        minw="500px"
        variant="elevated"
        borderRadius={10}
        align="center"
        m="10"
      >
        <Heading padding="5px" fontSize="md">
          Enter new Event
        </Heading>

        <Form method="POST" action="/add">
          <FormControl>
            <Input
              type="text"
              name="title"
              width="sm"
              placeholder="title"
              mt="4"
              required
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
            />
          </FormControl>
          
          <FormControl>
            <Textarea
              name="description"
              placeholder="Enter a description of the event"
              rows="8"
              mt="4"
              w="sm"
            />
          </FormControl>
          
          <FormControl display="flex" ml="2" mt="4">
            <HStack spacing="4">
              <FormLabel mb="0">Category</FormLabel>
              <Select variant="outline" name="categoryIds">
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>

              <FormLabel mb="0">Creator</FormLabel>

              <Select name="createdBy">
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </HStack>
          </FormControl>
         
          <FormControl display="flex" m="2">
            <FormLabel width="20">Where</FormLabel>
            <Input type="text" name="location" width="75" />
          </FormControl>
         
          <FormControl display="flex" m="2">
            <FormLabel width="20">Date</FormLabel>
            <Input type="date" name="date" w="75" />
          </FormControl>
         
          <FormControl display="flex" m="2">
            <FormLabel width="20">From</FormLabel>
            <Input type="time" name="startTime" w="75" />
          </FormControl>
         
          <FormControl display="flex" m="2">
            <FormLabel width="20">Till</FormLabel>
            <Input type="time" name="endTime" width="75" />
          </FormControl>

          <Stack>
            <Button
              colorScheme="green"
              size="sm"
              type="submit"
              onClick={showToast}
            > sumbit
            </Button>
         
            <Link to={"/"}>
              <Button colorScheme="gray" size="sm" width="100%">
                back
              </Button>
            </Link>
          </Stack>
        </Form>
      </Card>
    </>
  );
};