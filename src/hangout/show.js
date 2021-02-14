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

  const { userID, title, place, date, description } = hangout;
  const ownHangout =
    loggedUser && hangoutUser && String(userID) === hangoutUser.id;

  return (
    <>
      <Header backButton={true} />
      <main className="pt-4">
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
              <a href={`/hangouts/${hangoutID}/edit`} className="edit-hangout">
                Editar!!
              </a>
            )}
            {!ownHangout && <button>Jalo!!</button>}
          </div>
          {description && (
            <div className="description mt-4">
              <label className="font-weight-bold">Descripción</label>
              <p className="pl-3">{description}</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
