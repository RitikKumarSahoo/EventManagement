import express from "express";
import TicketRegistration from "./models/TicketRegistration.js";

const router = express.Router();

// POST route to handle ticket registration
router.post("/register-ticket", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      event,
      ticketType,
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
    } = req.body;

    // Create a new ticket registration entry
    const newRegistration = new TicketRegistration({
      fullName,
      email,
      phone,
      event,
      ticketType,
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
    });

    // Save to the database
    await newRegistration.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "Registration successful", data: newRegistration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
});

export default router;
