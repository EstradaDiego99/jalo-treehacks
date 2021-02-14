import { useEffect, useState } from "react";
import "./_style.css";
import { login } from "../_auth/utils";

import Header from "../_header/_component";

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function getUser() {
      const loggedUser = await login().catch(
        () => (window.location = "/login")
      );
      setUser(loggedUser);
    }
    getUser();
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <>
      <Header userImg={user.picture.data.url} />
      <main>
        <p style={{ overflow: "auto" }}>{JSON.stringify(user)}</p>
        <a href="/hangout/new" className="btn new-hangout">
          <span className="flex-grow-1">Propose Hangout</span>
          <i className="material-icons">create</i>
        </a>
      </main>
    </>
  );
}
