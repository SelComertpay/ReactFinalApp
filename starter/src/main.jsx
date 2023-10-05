import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./MainPages/EventPage";
import { EventsPage, loader as eventsListLoader } from "./MainPages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/SecPages/Root";
import { loader as eventDetailsLoader } from "./MainPages/EventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/", // Default route for listing events
        element: <EventsPage />,
        loader: eventsListLoader,
      },
      {
        path: "/events/:eventId", // Route for individual event details
        element: <EventPage />,
        loader: eventDetailsLoader,
      },
      {
        path: "/events", // Add this route for the "/events" path
        element: <EventsPage />,
        loader: eventsListLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
