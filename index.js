const express = require("express");
const Sse = require("json-sse");

const app = express();
const port = 4000;
const db = {};
db.messages = [];

const parser = express.json();
app.use(parser);

const stream = new Sse();

app.get("/stream", (req, res) => {
  stream.updateInit(db.messages);
  stream.init(req, res);
});

app.post("/message", (req, res) => {
  const { text } = req.body;
  db.messages.push(text);
  res.send(text);
  stream.send(text);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
