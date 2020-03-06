const express = require("express");
const cors = require("cors");
const db = require("./db");
const stream = require("./stream");

const app = express();
const port = process.env.PORT || 4000;

const corsMW = cors();
app.use(corsMW);
const parser = express.json();
app.use(parser);

app.get("/stream", (req, res) => {
  const action = {
    type: "ALL_MESSAGES",
    payload: db.messages
  };
  stream.updateInit(action);
  stream.init(req, res);
});

app.post("/message", (req, res) => {
  const { text } = req.body;
  db.messages.push(text);
  res.send(text);

  const action = {
    type: "NEW_MESSAGE",
    payload: text
  };
  stream.send(action);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
