import { useEffect, useState } from "react";
import axios from "axios";
import "./_style.css";
import { login } from "../_auth/utils";
import { backendURL } from "../utils/globals";

import Header from "../_header/_component";
import HangoutSummary from "../hangout/summary";

export default function Home() {
  const [user, setUser] = useState(undefined);
  const [ownHangouts, setOwnHangouts] = useState([]);
  const [friendHangouts, setFriendHangouts] = useState([]);

  useEffect(() => {
    async function getUserAndHangouts() {
      const loggedUser = await login().catch(
        () => (window.location = "/login")
      );
      setUser(loggedUser);
      const {
        data: { ownHangouts, friendHangouts },
      } = await axios
        .post(`${backendURL}/home/hangouts-query`, { user: loggedUser })
        .catch(() => (window.location = "/login"));
      setOwnHangouts(ownHangouts);
      setFriendHangouts(friendHangouts);
    }
    getUserAndHangouts();
  }, []);

  if (!user) {
    return <></>;
  }

  console.log(ownHangouts);
  console.log(friendHangouts);

  return (
    <>
      <Header userImg={user.picture.data.url} />
      <main>
        {!!ownHangouts.length && (
          <section className="mt-2">
            <p className="mb-2">My pending hangouts:</p>
            {ownHangouts.map((h) => (
              <HangoutSummary {...{ hangout: h, ownHangout: true }} />
            ))}
          </section>
        )}

        {!!friendHangouts.length && (
          <section className="mt-4">
            <p className="mb-2">My friend hangouts:</p>
            {friendHangouts.map((h) => (
              <HangoutSummary {...{ hangout: h }} />
            ))}
          </section>
        )}

        <a href="/hangout/new" className="btn new-hangout">
          <span className="flex-grow-1">Propose Hangout</span>
          <i className="material-icons">create</i>
        </a>
      </main>
    </>
  );
}
