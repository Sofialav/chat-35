const express = require("express");
const Sse = require("json-sse");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;
const db = {};
db.messages = [];

const corsMW = cors();
app.use(corsMW);
const parser = express.json();
app.use(parser);
const stream = new Sse();

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
