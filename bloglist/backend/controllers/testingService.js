const testingService = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

testingService.post("/reset", async (request, response) => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});

    response.status(204).end();
  } catch (error) {
    console.log("mongoDb: ", error.message);
  }
});

module.exports = testingService;
