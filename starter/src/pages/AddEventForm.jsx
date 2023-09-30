import React, { useState } from 'react';
import Modal from 'react-modal'; // Import the Modal component
import "../styles/styles.css";
// Function to generate a unique ID (you can implement it as per your requirements)
const generateUniqueId = () => {
  // Generate a unique ID logic goes here
  // For simplicity, you can use a timestamp-based ID
  return Date.now().toString();
};

export const AddEventForm = ({ onAddEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    categoryIds: [],
    image: '',
  });

  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control the modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle adding a new event
  const handleAddEvent = () => {
    // Generate a unique ID for the new event
    const newEventWithId = { ...formData, id: generateUniqueId() };

    // Call the onAddEvent function to add the event
    onAddEvent(newEventWithId);

    // Clear the form data
    setFormData({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      categoryIds: [],
      image: '',
    });

    // Close the modal
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Add Event</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Event Modal"
      >
        <form>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          {/* Add other form fields here */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" onClick={handleAddEvent}>
              Add Event
            </button>
            <button type="button" onClick={() => setModalIsOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
