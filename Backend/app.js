const express = require("express");
const morgan = require("morgan");
const appRouter = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter); //domain/api/v1/

module.exports = app;
