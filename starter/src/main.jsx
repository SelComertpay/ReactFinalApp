import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { Root } from './components/Root';
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";
import { AddEventForm } from "./pages/AddEventForm";
import Modal from 'react-modal'; // Import Modal from react-modal

// Set the app element
Modal.setAppElement('#root'); // Replace '#root' with the appropriate selector for your root element

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <EventsPage />,
      },
      {
        path: '/event/:eventId',
        element: <EventPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <RouterProvider router={router}>
          <Route />
        </RouterProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
