const express = require("express");
const db = require("../db");
const stream = require("../stream");
const { Router } = express;
const router = Router();

router.post("/channel", (req, res) => {
  const { name } = req.body;
  db.channels.push(name);
  res.send(name);

  const action = {
    type: "NEW_CHANNEL",
    payload: name
  };
  stream.send(action);
});

module.exports = router;
