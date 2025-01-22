// Import Express - Express is a popular Node.js framework for building web applications.
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/index.js';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the app - Creates an instance of an Express application.
const app = express();
const PORT = 3001; // Define the port on which the server will run.

// Middleware setup
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Calls the next middleware or route handler.
});

// Use routes
app.use('/', userRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Global error handling middleware
// Catches unhandled errors and responds with a 500 Internal Server Error.
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace.
  res.status(500).json({ error: 'Internal Server Error' }); // Respond with a generic error message.
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
