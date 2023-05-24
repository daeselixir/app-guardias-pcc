require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

//Routes Import
const authRouter = require("./routes/authRoutes");
const companyRouter = require("./routes/companyRoutes");
const userRoutes = require("./routes/userRoutes");

//Middleware
const notFoundMiddlware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//Port
const PORT = process.env.PORT || 4000;

app.get("/api/v1", (req, res) => {
  res.json({ msg: "Welcome to root API server" });
});

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/user", userRoutes);

app.use(notFoundMiddlware)
app.use(errorHandlerMiddleware);

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
