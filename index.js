// ==================Recommended Order=================
// 1. Required by common js (express, cors, etc.)
// 2 .Instance Initialization (const app = express())
// 3. Middleware Setup (cors, json, logging)
// 4. Database Configuration & Connection (MongoDB client setup and runMongoDB() function)
// 5. Routes
// 6. Server Startup (app.listen)
// ==========================================================
// bF1UIbrraXyZLLen

// 1
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// 2
const app = express();
const PORT = process.env.PORT || 5000;

// 3
app.use(cors());
app.use(express.json());

// 4

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.89rnkti.mongodb.net/?appName=Cluster0`;
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Define Database and Collection AFTER connecting
    const database = client.db("gadgetsDb");
    const gadgetsCollection = database.collection("gadgetsColl");

    // === get/read all products method ===
    app.get("/products/:email", async (req, res) => {
      const query = { email: req.params.email };
      const result = await gadgetsCollection.find(query).toArray();
      res.send(result);
    });

    // === get/read single product method ===
    app.get("/product/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await gadgetsCollection.findOne(query);
      res.send(result);
    });

    // === post/create method ===
    app.post("/createProduct", async (req, res) => {
      const doc = req.body;
      const result = await gadgetsCollection.insertOne(doc);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (error) {
    console.log(error);
  }
}
run();

// 5
app.get("/", (req, res) => {
  res.send("hello server is working");
});

// 6
app.listen(PORT, () => {
  console.log("the server is running");
});
