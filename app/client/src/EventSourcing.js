import React from "react";
import axios from "axios";

export const EventSourcing = () => {
  const [messages, setMessages] = React.useState([]);
  console.log(messages);
  const [value, setValue] = React.useState("");

  const sendMessage = async () => {
    await axios.post("http://localhost:5000/new-messages", {
      messages: value,
      id: Date.now(),
    });
  };

  React.useEffect(() => {
    subcribe();
  }, []);

  const subcribe = async () => {
    const eventSource = new EventSource("http://localhost:5000/connect");
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      console.log(event.data);

      setMessages((prev) => [message, ...prev]);
    };
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter something"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" onClick={sendMessage}>
        Source
      </button>
      <div>
        {messages.map((message, i) => (
          <div key={i}>{message.messages}</div>
        ))}
      </div>
    </div>
  );
};
