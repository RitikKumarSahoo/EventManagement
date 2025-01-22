import mongoose from "mongoose";

const TicketRegistrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
    ticketType: {
      type: String,
      required: true,
      enum: ["Standard", "VIP", "Group"], // Ticket options
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["credit-card", "paypal", "net-banking"], // Payment methods
    },
    cardNumber: {
      type: String,
      required: function () {
        return this.paymentMethod === "credit-card"; // Only required if credit card payment
      },
    },
    expiryDate: {
      type: String,
      required: function () {
        return this.paymentMethod === "credit-card"; // Only required if credit card payment
      },
    },
    cvv: {
      type: String,
      required: function () {
        return this.paymentMethod === "credit-card"; // Only required if credit card payment
      },
    },
  },
  { timestamps: true }
);

const TicketRegistration = mongoose.model(
  "TicketRegistration",
  TicketRegistrationSchema
);

export default TicketRegistration;
