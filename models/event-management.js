import mongoose from "mongoose";

const EventManagementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    
    default: true,
  },
  ticketSales: {
    sold: {
      type: Number,
      default: 0,
    },
    capacity: {
      type: Number,
      required: true,
    },
  },
}, { timestamps: true });

const EventManagement = mongoose.model("EventManagement", EventManagementSchema);

export default EventManagement;
