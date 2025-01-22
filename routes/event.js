import Event from "../models/event.js";
import { User } from "../models/user.js";

const eventRoutes = {
  // Create a new event
  async create(req, res) {
    try {
      // const { _id } = req.auth;
      const {
        title,
        description,
        date,
        time,
        price,
        location,
        privacySetting,
      } = req.body;


      // Validate required fields
      if (!title)
        return res
          .status(400)
          .json({ error: true, reason: "Title is required." });
      if (!description)
        return res
          .status(400)
          .json({ error: true, reason: "Description is required." });
      if (!time)
        return res
          .status(400)
          .json({ error: true, reason: "Time is required." });
      if (!location)
        return res
          .status(400)
          .json({ error: true, reason: "Location is required." });
      if (!price)
        return res
          .status(400)
          .json({ error: true, reason: "Price is required." });
      if (!privacySetting)
        return res
          .status(400)
          .json({ error: true, reason: "Privacy setting is required." });

      // Create the event
      const event = await Event.create({
        title,
        description,
        date,
        time,
        price,
        location,
        privacySetting,
        // createdBy: _id,
      });

      return res.status(201).json({ error: false, event });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, reason: error.message });
    }
  },

  // Retrieve all events
  async allEvents(req, res) {
    try { 
      const events = await Event.find();
      return res.status(200).json({ error: false, events });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, reason: error.message });
    }
  },

  // Retrieve a single event by ID
  async getEvent(req, res) {
    try {
      const { id } = req.auth;
      const { eventid } = req.params;

      const user = await User.findOne({ _id: id });
      if (user === null) {
        return res.status(400).json({ error: true, reason: "User not found." });
      }
      const event = await Event.findOne({ _id: eventid });
      if (event === null) {
        return res
          .status(400)
          .json({ error: true, reason: "Event not found." });
      }

      return res.status(200).json({ error: false, event });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, reason: error.message });
    }
  },

  // Update an event
  async updateEvent(req, res) {
    try {
      const{ isAdmin } = req.auth
      const { id } = req.params;
      const {
        title,
        description,
        date,
        time,
        price,
        location,
        privacySetting,
      } = req.body;

      if (!isAdmin) {
        return res.status(400).json({error: false, reason: "You are not admin"})
      }

      const event = await Event.findOne({_id: id}).exec()

      if (event === null) {
        return res.status(400).json({error: false, reason: "event not found with this id"})
      }

      if (title !== undefined) event.title = title
      if (description !== undefined) event.description = description
      if (date !== undefined) event.date = date
      if (time !== undefined) event.time = time
      if (price !== undefined) event.price = price
      if (location !== undefined) event.location = location
      if (privacySetting !== undefined) event.privacySetting = privacySetting

      event.save()

      return res.status(200).json({ error: false, event });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, reason: error.message });
    }
  },

  // Delete an event
  async deleteEvent(req, res) {
    try {
      const { id } = req.params
      const {isAdmin} = req.auth

      if (!isAdmin) {
        return res
          .status(400)
          .json({ error: true, reason: "You are not admin" });
      }

      const event = await Event.findOne({_id:id});
      if (!event) {
        return res
          .status(400)
          .json({ error: true, reason: "Event not found." });
      }
      await Event.deleteOne({_id:id})

      return res
        .status(200)
        .json({ error: false, message: "Event deleted successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, reason: error.message });
    }
  },
};

export default eventRoutes;
