
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);

  return {
    event: await event.json(),
  };
};
export const DeleteEvent = async () => {
  const navigate = useNavigate();
  const { event } = useLoaderData();
  const response = await fetch(`http://localhost:3000/events/${event.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    navigate(`/events`);
  }
};

export default DeleteEvent; // Provide a default export