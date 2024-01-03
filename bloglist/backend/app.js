const express = require("express");
const path = require("path");
require("express-async-errors");
const app = express();
const cors = require("cors");

const blogRouter = require("./controllers/blogService");
const userRouter = require("./controllers/userServices");
const loginRouter = require("./controllers/loginService");
const commentRouter = require("./controllers/commentService");
const mongoose = require("mongoose");

const logger = require("./utils/logger");
const config = require("./utils/config.js");
const middleware = require("./utils/middleware");
const { send } = require("process");
app.use(cors());

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testingService");
  app.use("/api/testing", testingRouter);
}

logger.info("connecting to", config.MONGODB_URI);

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("conncted to MongoDB");
  })
  .catch((error) => {
    console.log("not conected ", error.message);
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(express.json());

app.use(middleware.requestLogger);

app.use(express.static("build"));

app.get("/health", (req, res) => {
  res.send("ok");
});
app.get("/version", (req, res) => {
  res.send("1"); // change this string to ensure a new version deployed
});

const indexPath = path.join(__dirname, "build", "index.html");

app.get("/users", (req, res) => res.sendFile(indexPath));
app.get("/users/:id", (req, res) => res.sendFile(indexPath));
app.get("/blogs/:id", (req, res) => res.sendFile(indexPath));
app.get("/login", (req, res) => res.sendFile(indexPath));

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);

app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/blogs", commentRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
