import { useEffect, useState } from "react";
import axios from "axios";
import { login } from "../_auth/utils";
import { backendURL } from "../utils/globals";
import "./_style.css";

import Header from "../_header/_component";
import HangoutForm from "./_form";

export default function NewHangout() {
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

  function saveHangout(functionMap) {
    const { title, place, date, description } = functionMap;
    const { errorFunctions } = functionMap;
    axios
      .post(`${backendURL}/hangouts`, {
        userID: user.id,
        title,
        place,
        date,
        description,
      })
      .then(({ data }) => {
        const { newHangout } = data;
        window.location = `/hangouts/${newHangout._id}`;
      })
      .catch(({ response: { data: { errors = {} } = {} } = {} }) => {
        for (const err in errors) errorFunctions[err](errors[err]);
      });
  }

  return (
    <>
      <Header backButton={true} />
      <main className="pt-4">
        <HangoutForm formFunction={saveHangout} />
      </main>
    </>
  );
}
