import React from "react";
import { useState } from "react";
import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CreateEventForm = () => {
  const navigate = useNavigate();

  const handleChange = (key, value) =>
    setEventObject({ ...eventObject, [key]: value });

  const handleCategoryChange = (id) => {
    if (eventObject.categoryIds.includes(id)) {
      setEventObject((prevEventObject) => ({
        ...prevEventObject,
        categoryIds: prevEventObject.categoryIds.filter(
          (catId) => catId !== id
        ),
      }));
    } else {
      setEventObject((prevEventObject) => ({
        ...prevEventObject,
        categoryIds: [...prevEventObject.categoryIds, (id = Number(id))],
      }));
    }
  };

  const [eventObject, setEventObject] = useState({
    title: "",
    description: "",
    image: "",
    categoryIds: [],
    location: "",
    startTime: "",
    endTime: "",
    createdBy: [],
  });

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventObject),
    });
    const json = await response.json();
    if (response.ok) {
      navigate(`/event/${json.id}`);
    }
  };

  return (
    <div className="new-event">
      <Form onSubmit={handleSubmit}>
        <label>
          <h2>Title</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={eventObject.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </label>
        <label>
          <h2>Description</h2>
          <textarea
            name="description"
            placeholder="Desription"
            value={eventObject.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </label>
        <label>
          <h2>Image</h2>
          <input
            type="text"
            name="image"
            placeholder="ImageURL"
            value={eventObject.image}
            onChange={(e) => handleChange("image", e.target.value)}
          />
        </label>
        <h2>Categories</h2>
        <input
          type="checkbox"
          id="sports"
          name="sports"
          value={1}
          onChange={(e) => handleCategoryChange(e.target.value)}
        />
        <label htmlFor="sports">Sports</label>
        <input
          type="checkbox"
          id="games"
          name="games"
          value={2}
          onChange={(e) => handleCategoryChange(e.target.value)}
        />
        <label htmlFor="games">Games</label>
        <input
          type="checkbox"
          id="relaxation"
          name="relaxation"
          value={3}
          onChange={(e) => handleCategoryChange.number(e.target.value)}
        />
        <label htmlFor="relaxation">Relaxation</label>
        <label>
          <h2>Location</h2>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={eventObject.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </label>
        <label>
          <h2>Start Time</h2>
          <input
            type="text"
            name="startTime"
            placeholder="Start Time"
            value={eventObject.startTime}
            onChange={(e) => handleChange("startTime", e.target.value)}
          />
        </label>
        <label>
          <h2>End Time</h2>
          <input
            type="text"
            name="endTime"
            placeholder="End Time"
            value={eventObject.endTime}
            onChange={(e) => handleChange("endTime", e.target.value)}
          />
        </label>
        <label>
          <h2>User</h2>
          <input
            type="radio"
            name="createdBy"
            value={1}
            onChange={(e) =>
              handleChange(
                "createdBy",
                (e.target.value = Number(e.target.value))
              )
            }
          />{" "}
          Ignacio Doe
          <input
            type="radio"
            name="createdBy"
            value={2}
            onChange={(e) =>
              handleChange(
                "createdBy",
                (e.target.value = Number(e.target.value))
              )
            }
          />{" "}
          Jane Bennett
        </label>
        <button type="submit">Add event</button>
      </Form>
    </div>
  );
};