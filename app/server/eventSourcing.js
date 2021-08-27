const express = require("express");
const cors = require("cors");
const events = require("events");
const PORT = 5000;

const app = express();
const emitter = new events.EventEmitter();

app.listen(PORT, () => console.log("go", PORT));

app.use(cors());
app.use(express.json());
app.get("/connect", (req, res) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  emitter.on("newMessage", (message) => {
    res.write(`data: ${JSON.stringify(message)} \n\n`);
    // res.write(message);
  });
});

app.post("/new-messages", (req, res) => {
  const message = req.body;
  res.status(200);
  emitter.emit("newMessage", message);
  console.log(message);
});
