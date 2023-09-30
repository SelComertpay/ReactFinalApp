import express from "express";
import { createReadStream } from "fs";

const app = express();
const port = process.env.PORT || 4000;

// Body parsing middleware to handle JSON data
app.use(express.json());

// Events data (in-memory storage for simplicity)
const events = [];

// Serve your static files (e.g., index.html)
app.get("/", (req, res) => {
  createReadStream("index.html").pipe(res);
});

// API route for adding events and retrieving all events
app
  .route("/api/events")
  .get((req, res) => {
    res.status(200).json({ events });
  })
  .post((req, res) => {
    const eventData = req.body;

    // Assuming you're using an array to store events
    events.push(eventData);

    res
      .status(201)
      .json({ message: "YES! Event added successfully", eventData });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
