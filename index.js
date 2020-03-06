const express = require("express");

const app = express();
const port = 4000;
const db = {};
db.messages = [];

const parser = express.json();

app.use(parser);
app.post("/message", (req, res) => {
  const { text } = req.body;
  db.messages.push(text);
  res.send(text);
  console.log(db);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
