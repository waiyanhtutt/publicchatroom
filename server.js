import express from "express";

// Express Server Setup

const exapp = express();

exapp.use(express.static("dist")); // Server static files from the public folder

// start the Express server

exapp.listen(8000, () => {
  console.log("Server is Running on http://localhost:8000");
});
