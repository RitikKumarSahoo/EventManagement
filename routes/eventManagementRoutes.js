import express from "express";
import Event from "../models/event.js"; // Import the event model

const router = express.Router();

// Fetch all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    res.status(200).json({ error: false, events });
  } catch (error) {
    res.status(500).json({ error: true, reason: error.message });
  }
});

// Create a new event
router.post("/create", async (req, res) => {
  try {
    const { title, description, date, time, location, privacySetting } =
      req.body;

    if (!title || !date || !time || !location) {
      return res.status(400).json({
        error: true,
        reason: "Title, Date, Time, and Location are required fields.",
      });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      privacySetting,
    });

    await newEvent.save(); // Save the new event in the database
    res.status(201).json({ error: false, event: newEvent });
  } catch (error) {
    res.status(500).json({ error: true, reason: error.message });
  }
});

// Update an existing event
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
      new: true,
    }); // Find event by ID and update

    if (!updatedEvent) {
      return res.status(404).json({ error: true, reason: "Event not found." });
    }

    res.status(200).json({ error: false, event: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: true, reason: error.message });
  }
});

// Delete an event
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id); // Find and delete event by ID

    if (!deletedEvent) {
      return res.status(404).json({ error: true, reason: "Event not found." });
    }

    res
      .status(200)
      .json({ error: false, message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: true, reason: error.message });
  }
});

export default router;
