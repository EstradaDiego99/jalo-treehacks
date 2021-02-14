import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { login } from "../_auth/utils";
import { backendURL } from "../utils/globals";
import "./_style.css";

import Header from "../_header/_component";

export default function ChatShow() {
  const [chat, setChat] = useState(undefined);

  const { chatID } = useParams();
  useEffect(() => {
    async function getChat() {
      await login().catch(() => (window.location = "/login"));
      const { data } = await axios.get(`${backendURL}/chats/${chatID}`);
      setChat(data);
    }
    getChat();
  }, [chatID]);

  if (!chat) {
    return <></>;
  }

  const { assistantsArr } = chat;

  return (
    <>
      <Header
        backButton={true}
        middleSign={chat.title}
        peopleAmmount={chat.assistants.length}
      />
      <main className="d-flex flex-column chat-display">
        <div className="assistants-container">
          <p>Participants:</p>
          {assistantsArr.map((a) => (
            <p className="participant" key={a.id}>
              {a.name}
            </p>
          ))}
        </div>
        <div className="chat-container"></div>
        <footer className="text-box">
          <input placeholder="Type something to arrange plans!!" />
          <button className="material-icons">send</button>
        </footer>
      </main>
    </>
  );
}
