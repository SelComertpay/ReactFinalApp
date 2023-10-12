import {
  Text,
  Tag,
  TagLabel,
  CardFooter,
  Heading,
  Grid,
  Card,
  CardHeader,
  CardBody,
  Image,
  HStack,
  Flex, 
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  return {
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPanel = (event) => {
  const { categories, users } = useLoaderData();
  const categoryIds = Array.isArray(event.item.categoryIds)
    ? event.item.categoryIds
    : [];

  const createdByUser = users.find((user) => user.id === event.item.createdBy);
  const userName = createdByUser ? createdByUser.name : 'Unknown';
  const userImage = createdByUser ? createdByUser.image : 'DefaultImageURL';
  const categoryNames = categoryIds.map((id) =>
    categories.find((category) => category.id === id)?.name || 'Unknown'
  );

  const date = event.item.startTime ? event.item.startTime.slice(0, 10) : 'Unknown';
  const startTime = event.item.startTime ? (event.item.startTime.split("T")[1]?.slice(0, 5) || 'Unknown') : 'Unknown';
  const endTime = event.item.endTime ? (event.item.endTime.split("T")[1]?.slice(0, 5) || 'Unknown') : 'Unknown';

  return (
    <Grid>
      <Card
        backgroundColor="gray.100"
        variant="elevated"
        borderRadius={10}
        border="solid"
        cursor="pointer"
        _hover={{
          shadow: "dark-lg",
          backgroundColor: "lightgreen",
        }}
      >
       
        <CardHeader>
          <Heading color="362FD9" size="md" align="center">
            <Flex flexDirection="column" alignItems="center"> {/* Wrap in a Flex container */}
              <Image src={event.item.image} borderRadius="5px" w="350px" h="250px" /> {/* Set your desired image dimensions */}
              <Text>{event.item.title}</Text>
            </Flex>
          </Heading>

          <HStack padding={2} spacing={2}>
            {categoryNames.map(category => (
              <Tag key={category} variant="outline" color="red">
                <TagLabel>{category}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </CardHeader>

        <CardBody pt={0}>
          <Text fontSize="1em">{event.item.description}</Text>
        </CardBody>

        <CardFooter fontSize="0.9em">
          On {date} from {startTime} till {endTime}
        </CardFooter>

        <CardFooter fontSize="0.9em">
          Created by: {userName}
        </CardFooter>

        <CardFooter fontSize="0.9em">
          <Image src={userImage} alt={userName} boxSize="20px" borderRadius="50%" />
        </CardFooter>
      </Card>
    </Grid>
  );
};
