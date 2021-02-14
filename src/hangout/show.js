import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { login } from "../_auth/utils";
import moment from "moment";
import { backendURL } from "../utils/globals";
import "./_style.css";

import Header from "../_header/_component";

export default function HangoutShow() {
  const [hangout, setHangout] = useState(undefined);
  const [loggedUser, setLoggedUser] = useState(undefined);
  const [hangoutUser, setHangoutUser] = useState(undefined);

  const { hangoutID } = useParams();
  useEffect(() => {
    async function getHangout() {
      const { data } = await axios.get(`${backendURL}/hangouts/${hangoutID}`);
      setHangout(data);
      setHangoutUser(data.user);
    }
    async function getLoggedUser() {
      const loggedUser = await login().catch(
        () => (window.location = "/login")
      );
      setLoggedUser(loggedUser);
    }
    getHangout();
    getLoggedUser();
  }, [hangoutID]);

  if (!hangout || !hangoutUser) {
    return <></>;
  }

  async function markAssistance() {
    await axios.post(
      `${backendURL}/hangouts/${hangoutID}/willAssist/${loggedUser.id}`
    );
    window.location.reload();
  }

  async function unmarkAssistance() {
    await axios.post(
      `${backendURL}/hangouts/${hangoutID}/wontAssist/${loggedUser.id}`
    );
    window.location.reload();
  }

  const {
    title,
    place,
    date,
    description,
    assistants,
    assistantsArr,
  } = hangout;
  const loggedUserAssisting = assistants.indexOf(loggedUser.id) !== -1;
  const ownHangout = loggedUser && loggedUser.id === hangoutUser.id;

  return (
    <>
      <Header backButton={true} />
      <main className="pt-4 d-flex flex-column">
        <section className="hangout-info">
          <div className="title mb-3">
            <p>{title}</p>
          </div>
          <div className="d-flex align-items-center mb-3 organizer">
            <img src={hangoutUser.picture.data.url} alt="organizer-icon" />
            <div className="ml-2">
              <strong>Organizer:</strong>
              <p>{hangoutUser.name}</p>
            </div>
          </div>
          <div className="d-flex">
            <div className="flex-grow-1">
              <div className="d-flex align-items-center mb-2 ml-2">
                <i className="material-icons text-secondary pr-1">room</i>
                <p>{place}</p>
              </div>
              <div className="d-flex align-items-center ml-2">
                <i className="material-icons text-secondary pr-1">
                  calendar_today
                </i>
                <p>{moment(date).format("LLL")}</p>
              </div>
            </div>
            {ownHangout && (
              <a
                href={`/hangouts/${hangoutID}/edit`}
                className="edit-hangout material-icons"
              >
                create
              </a>
            )}
            {!ownHangout && (
              <>
                {loggedUserAssisting ? (
                  <button className="jalo activated" onClick={unmarkAssistance}>
                    Jalo!!
                  </button>
                ) : (
                  <button className="jalo" onClick={markAssistance}>
                    Jalo!!
                  </button>
                )}
              </>
            )}
          </div>
          {description && (
            <div className="description mt-4">
              <label className="font-weight-bold">Descripción</label>
              <p className="pl-3">{description}</p>
            </div>
          )}
        </section>

        <div className="flex-grow-1"></div>

        {assistantsArr.length && (
          <section className="assistants-container">
            <label className="m-0">Assistants:</label>
            {assistantsArr.map((a) => (
              <div
                className="assistant d-flex p-1 align-items-center"
                key={a.id}
              >
                <img src={a.picture.data.url} alt="organizer-icon" />
                <span className="ml-2">{a.name}</span>
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
