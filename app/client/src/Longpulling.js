import React from "react";
import axios from "axios";

export const Longpulling = () => {
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
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages");
      //   setMessages((prev) => [...prev, data]);
      setMessages((prev) => [data, ...prev]);
      await subcribe();
    } catch (err) {
      //   setMessages("OOPS");
      setTimeout(() => subcribe(), 10000);
    }
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
        Send
      </button>
      <div>
        {messages.map((message, i) => (
          <div key={i}>{message.messages}</div>
        ))}
      </div>
    </div>
  );
};
