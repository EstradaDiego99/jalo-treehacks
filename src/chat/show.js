import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { login } from "../_auth/utils";
import moment from "moment";
import { backendURL } from "../utils/globals";
import "./_style.css";

import Header from "../_header/_component";

export default function ChatShow() {
  const [chat, setChat] = useState(undefined);

  const { chatID } = useParams();
  useEffect(() => {
    async function getChat() {
      const { data } = await axios.get(`${backendURL}/chats/${chatID}`);
      setChat(data);
    }
    getChat();
  }, [chatID]);

  if (!chat) {
    return <></>;
  }

  console.log(chat);

  return (
    <>
      <Header backButton={true} />
      <main className="pt-4 d-flex flex-column"></main>
    </>
  );
}
