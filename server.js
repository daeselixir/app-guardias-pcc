require("dotenv").config();
require("express-async-errors");

const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const connectDB = require("./db/connect");
const morgan = require("morgan");

const app = express();

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this ip , please try again in an hour.",
});

app.use("/api/v1", limiter);

app.use(express.json());
app.use(morgan("tiny"));

//Routes Import
const authRouter = require("./routes/authRoutes");
const companyRouter = require("./routes/companyRoutes");
const userRoutes = require("./routes/userRoutes");
const areaRoutes = require("./routes/areaRoutes");
const eventRoutes = require("./routes/eventRoutes");
const shiftRoutes = require("./routes/shiftRoutes");
const incidentRoutes = require("./routes/incidentRoutes");

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
app.use("/api/v1/area", areaRoutes);
app.use("/api/v1/incident", incidentRoutes);
app.use("/api/v1/shift", shiftRoutes);
app.use("/api/v1/event", eventRoutes);

app.use(notFoundMiddlware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI_DEV);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
