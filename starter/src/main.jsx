import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventPageLoader } from "./MainPages/EventPage";
import { EventsPage, loader as eventsPageLoader } from "./MainPages/EventsPage";
import {
  createAction,
  EventCreation,
  loader as eventCreationLoader,
} from "./MainPages/EventCreation";
import { EventEdit, loader as eventEditLoader } from "./MainPages/EventEdit";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Components/Root";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsPageLoader,
      },

      {
        path: `/events/:eventId`,
        element: <EventPage />,
        loader: eventPageLoader,
      },

      {
        path: "/add",
        element: <EventCreation />,
        loader: eventCreationLoader,
        action: createAction,
      },
      {
        path: "/events/:eventId/edit",
        element: <EventEdit />,
        loader: eventEditLoader,
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