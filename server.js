require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan('tiny'))

const authRouter = require("./routes/authRoutes");
const companyRouter = require("./routes/companyRoutes");

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Root API");
});

app.get("/api/v1", (req, res) => {
  res.json({ msg: "Welcome to root API server" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/company", companyRouter);

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
