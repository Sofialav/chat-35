const express = require("express");
const db = require("../db");
const stream = require("../stream");
const { Router } = express;
const router = Router();

router.post("/message", (req, res) => {
  const { text } = req.body;
  db.messages.push(text);
  res.send(text);

  const action = {
    type: "NEW_MESSAGE",
    payload: text
  };
  stream.send(action);
});

module.exports = router;
