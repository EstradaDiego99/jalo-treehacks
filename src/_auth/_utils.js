const axios = require("axios");

async function getFacebookUserData(access_token, fieldArray) {
  const { data } = await axios.get("https://graph.facebook.com/me", {
    params: {
      fields: fieldArray.join(","),
      access_token,
    },
  });
  return data;
}

module.exports = { getFacebookUserData };
