const express = require("express");
const cors = require("cors");
const events = require("events");
const PORT = 5000;

const app = express();
const emitter = new events.EventEmitter();

app.listen(PORT, () => console.log("go", PORT));

app.use(cors());

app.get("get-messages", (req, res) => {
  emmiter.once("newMessage", (message) => {
    res.json(message);
  });
});

app.post("new-messages", (req, res) => {
  const message = req.body;
  res.status(200);
  emitter.emit("newMessage", message);
  console.log(message);
});
