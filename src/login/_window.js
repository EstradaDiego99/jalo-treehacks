import queryString from "query-string";
import "./_style.css";
import jaloBlack from "../jalo-black.svg";
import loginFacebook from "../login-facebook.png";

import { redirectUriBase } from "../utils/globals";

const stringifiedParams = queryString.stringify({
  client_id: 3839028159468589,
  redirect_uri: `${redirectUriBase}/auth/facebook`,
  scope: ["email", "user_friends", "user_gender", "user_location"].join(","),
  response_type: "code",
  auth_type: "rerequest",
});

const facebookLoginUrl = `https://www.facebook.com/v9.0/dialog/oauth?${stringifiedParams}`;

export default function Login() {
  return (
    <main id="login" className="d-flex flex-column align-items-center">
      <img src={jaloBlack} alt="main-logo" className="main-logo m-5" />
      <p style={{ fontSize: "2em" }}>Welcome to Jalo!!</p>
      <p className="m-3">
        The platform that helps you gather more easily with your friends!!
      </p>
      <p className="m-3">
        The platform that helps you gather more easily with your friends!!
      </p>

      <div className="flex-grow-1"></div>
      <a href={facebookLoginUrl} className="login-btn m-3">
        <img src={loginFacebook} alt="login-with-facebook" />
      </a>
    </main>
  );
}
