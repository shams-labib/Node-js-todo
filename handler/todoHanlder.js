const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../Schema/todoSchema");
const Todo = new mongoose.model("Podo", todoSchema);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Todo.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "There was a server side problem",
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Data find success",
      });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    const data = await todo.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "There was a error in server side",
    });
  }
});

router.post("/all", async (req, res) => {
  try {
    const data = await Todo.insertMany(req.body);
    res.status(200).json({
      message: "Data inserted success",
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a problem in server",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: "Ami change hoyechi",
        },
      },
    );

    res.status(200).json({
      message: "Potko update success",
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});
router.delete("/", async (req, res) => {});

module.exports = router;
