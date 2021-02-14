import queryString from "query-string";
import "../index.css";

const stringifiedParams = queryString.stringify({
  client_id: 3839028159468589,
  redirect_uri: "http://localhost:3000/auth/facebook",
  scope: ["email", "user_friends", "user_gender", "user_location"].join(","),
  response_type: "code",
  auth_type: "rerequest",
});

const facebookLoginUrl = `https://www.facebook.com/v9.0/dialog/oauth?${stringifiedParams}`;

export default function Login() {
  return (
    <main>
      <a href={facebookLoginUrl}>Login with facebook</a>
    </main>
  );
}
