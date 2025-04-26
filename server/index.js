import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoutes.js";  // Correct file name
import cors from "cors";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// MongoDB connection
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB Connected Successfully.");
    // Start server after DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port :${PORT}`);
    });
  })
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Define routes
app.use("/api", route);  // All routes are prefixed with /api
