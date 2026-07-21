const express = require("express");
const app = express();
const mongoose = require("mongoose");
const todoHandler = require("./handler/todoHanlder");

app.use(express.json());

mongoose
  .connect("mongodb://localhost/podos")
  .then(() => {
    console.log("Connection success with mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/todo", todoHandler);

function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }

  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log("Server running on 3000");
});
