import { useEffect, useState } from "react";
import "../index.css";
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
    <main>
      <Header userImg={user.picture.data.url} />
      <p>{JSON.stringify(user)}</p>
    </main>
  );
}
