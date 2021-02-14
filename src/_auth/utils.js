import axios from "axios";
import Cookies from "js-cookie";

async function getFacebookUserData(access_token) {
  const { data } = await axios.get("https://graph.facebook.com/me", {
    params: {
      fields: [
        "id",
        "email",
        "name",
        "friends",
        "gender",
        "location",
        "age_range",
        "picture",
      ].join(","),
      access_token,
    },
  });
  return data;
}

async function login() {
  const access_token = Cookies.get("jalo_token");
  const userData = await getFacebookUserData(access_token);
  return userData;
}

async function saveToken(access_token) {
  Cookies.set("jalo_token", access_token, { expires: 365 });
}

function removeSession() {
  Cookies.remove("jalo_token");
}

export { login, saveToken, removeSession };
