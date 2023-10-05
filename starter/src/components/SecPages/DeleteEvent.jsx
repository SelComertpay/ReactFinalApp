const deleteEvent = async (eventId) => {
  try {
    const response = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true; // Indicate success
    } else {
      console.error('Error deleting event:', response.status, response.statusText);
      return false; // Indicate failure
    }
  } catch (error) {
    console.error('Error:', error);
    return false; // Indicate failure
  }
};

export default deleteEvent; // Export as the default export
