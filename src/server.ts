// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import Snippet from "./models/snippets.model"
import mongoose from "mongoose";

import snippetRoutes from "./routes/snippet.routes"

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// EJS
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"))

app.get("/", async (req, res) => {
  try {
    const { language, tags } = req.query;
    let query: any = {};

    if (language) query.language = new RegExp(`^${language}$`, "i");
    if (tags) query.tags = { $all: (tags as string).split(",") };

    const snippets = await Snippet.find(query);

    res.render("index", {
      title: "Admin View",
      snippets,
      language,
      tags
    });
  } catch (error) {
    console.error("Fout bij ophalen van snippets:", error);
    res.status(500).send("Serverfout bij ophalen van snippets");
  }
})

// -----------------------------------------
// Routes
app.use("/api", snippetRoutes)
app.all("*", notFound);



// Database connection
try {
  await mongoose.connect(process.env.MONGO_URI_LIVE!);
  console.log("Database connection OK");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
