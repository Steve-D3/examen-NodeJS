// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";

import { helloMiddleware } from "./middleware/exampleMiddleware";
import mongoose from "mongoose";

import snippetRoutes from "./routes/snippet.routes"

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", snippetRoutes)
app.all("*", notFound);


// EJS
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"))


// -----------------------------------------

// Database connection
try {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("Database connection OK");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
