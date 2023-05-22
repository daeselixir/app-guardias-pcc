require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/api/v1", (req, res) => {
  res.send("Welcome to root API server");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
