import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage, loader as eventsListLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Searchbars/Root";
import { loader as eventDetailsLoader } from "./pages/EventPage";

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