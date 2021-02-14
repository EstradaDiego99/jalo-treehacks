import { useState, useEffect } from "react";
import axios from "axios";
import { login } from "../_auth/utils";
import { backendURL } from "../utils/globals";
import "./_style.css";

import Header from "../_header/_component";
import ChatSummary from "./summary";

export default function ChatIndex() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function getChats() {
      const loggedUser = await login();
      const { data } = await axios.post(`${backendURL}/chats/chat-query`, {
        user: loggedUser,
      });
      setChats(data);
    }
    getChats();
  }, []);

  return (
    <>
      <Header backButton={true} middleSign="Chats List" />
      <main className="d-flex flex-column">
        <section className="chat-container h-100">
          {chats.map((c) => (
            <ChatSummary chat={c} key={c._id} />
          ))}

          {chats.length === 0 && (
            <div className="p-5 text-center text-secondary">
              <p style={{ fontSize: "1.5em" }}>
                There appear to be no chats for the moment. Luckily we can
                change that!!
                <br />
                <br />
                Go on and see what plans your friends might have to join them!!
                <br />
                <br />
                You can also create your own plan too!!
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
