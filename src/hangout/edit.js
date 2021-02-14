import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { login } from "../_auth/utils";
import { backendURL } from "../utils/globals";
import "./_style.css";

import Header from "../_header/_component";
import HangoutForm from "./_form";

export default function EditHangout() {
  const [hangout, setHangout] = useState(undefined);

  const { hangoutID } = useParams();
  useEffect(() => {
    async function getHangout() {
      const loggedUser = await login().catch(
        () => (window.location = "/login")
      );
      const { data } = await axios.get(`${backendURL}/hangouts/${hangoutID}`);
      if (String(data.userID) !== String(loggedUser.id)) {
        window.location = "/login";
      }
      setHangout(data);
    }
    getHangout();
  }, [hangoutID]);

  if (!hangout) {
    return <></>;
  }

  function updateHangout(functionMap) {
    const { title, place, date, description } = functionMap;
    const { errorFunctions } = functionMap;
    axios
      .put(`${backendURL}/hangouts/${hangoutID}`, {
        title,
        place,
        date,
        description,
      })
      .then((res) => {
        window.location = "/";
      })
      .catch(({ response: { data: { errors = {} } = {} } = {} }) => {
        for (const err in errors) errorFunctions[err](errors[err]);
      });
  }

  function deleteHangout() {
    axios
      .delete(`${backendURL}/hangouts/${hangoutID}`)
      .then((res) => {
        window.location = "/";
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Header backButton={true} />
      <main className="pt-4">
        <HangoutForm
          hangout={hangout}
          formFunction={updateHangout}
          deleteHangout={deleteHangout}
        />
      </main>
    </>
  );
}
