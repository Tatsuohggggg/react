//フロントエンド
import React, { useEffect, useState, useRef } from "react";
import { getAPICall, postAPICall } from "./apicall";

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState("anonymous");

  useEffect(() => {
    getAPICall("/api/chat/log", (res) => {
      setMessages(res);
    });
  }, []);

  const hundleClick = () => {
    if (message === "") {
      return;
    } else if (name === "") {
      postAPICall("/api/chat/add", { name: anonymous, message }, (res) => {
        setMessages(res);
        setMessage("");
      });
    } else {
      postAPICall("/api/chat/add", { name: name, message: message }, (res) => {
        setMessages(res);
        setName("");
        setMessage("");
      });
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => {
          return (
            <div key={index}>
              {message.name} {message.message}
            </div>
          );
        })}
      </div>
      <input
        id="input_1"
        size="3"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        id="input_2"
        size="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="message"
      />
      <button id="soushin" type="button" onClick={hundleClick}>
        送信
      </button>
    </div>
  );
}

export default Chat;
