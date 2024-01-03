const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const redis = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  let counter = await redis.getAsync("counter");

  if (counter === null || isNaN(counter)) {
    const totoTotal = await Todo.countDocuments({});
    counter = totoTotal;
  }

  const newCounter = parseInt(counter) + 1;
  await redis.setAsync("counter", newCounter);

  res.send(todo);
});

router.get("/statistics", async (_, res) => {
  const counter = await redis.getAsync("counter");
  const statistics = {
    added_todos: counter,
  };
  res.json(statistics);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  const todo = req.todo;
  res.send(todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const body = await req.body;
  req.todo.text = body.text;
  req.todo.done = body.done;

  await req.todo.save();
  res.send(req.todo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
