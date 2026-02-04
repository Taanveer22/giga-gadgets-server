// ==================Recommended Order=================
// 1. Required by common js (express, cors, etc.)
// 2 .Instance Initialization (const app = express())
// 3. Middleware Setup (cors, json, logging)
// 4. Database Configuration & Connection (MongoDB client setup and runMongoDB() function)
// 5. Routes
// 6. Server Startup (app.listen)
// ==========================================================

// 1
const express = require("express");
const cors = require("cors");

// 2
const app = express();
const PORT = process.env.PORT || 5000;

// 3
app.use(cors());
app.use(express.json());

// 4

// 5
app.get("/", (req, res) => {
  res.send("hello server is working");
});

// 6
app.listen(PORT, () => {
  console.log("the server is running");
});
