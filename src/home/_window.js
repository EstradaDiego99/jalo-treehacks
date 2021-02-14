import { useEffect, useState } from "react";
import "../index.css";
import { login } from "../_auth/utils";

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
      <p>{JSON.stringify(user)}</p>
    </main>
  );
}
