const express = require("express");
const cors = require("cors");
const db = require("./db");
const stream = require("./stream");
const messageRouter = require("./message/router");
const channelRouter = require("./channel/router");
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

  const channelAction = {
    type: "ALL_CHANNELS",
    payload: db.channels
  };
  stream.send(channelAction);
});

app.use(messageRouter);
app.use(channelRouter);
app.listen(port, () => console.log(`Listening on port ${port}`));
