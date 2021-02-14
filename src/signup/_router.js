const router = require("express").Router();
const axios = require("axios");
const { redirectUriBase } = require("../utils/_globals");

require("dotenv").config();

const User = require("../user/_model");

async function getAccessTokenFromCode(code) {
  const { data } = await axios
    .get("https://graph.facebook.com/v9.0/oauth/access_token", {
      params: {
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        redirect_uri: `${redirectUriBase}/auth/facebook`,
        code,
      },
    })
    .catch((err) => {
      const { error } = err.response.data;
      console.log(error);
    });
  return data.access_token;
}

router.route("/").post(async (req, res) => {
  const { code } = req.body;
  if (!code) {
    res.status(400).json({ msg: "Code necessary to SignUp" });
    return;
  }

  const access_token = await getAccessTokenFromCode(code);
  const {
    data: { id },
  } = await axios.get("https://graph.facebook.com/me", {
    params: {
      fields: ["id"].join(","),
      access_token,
    },
  });
  let user = await User.findOne({ id });
  if (user) {
    User.findOneAndUpdate({ id }, { access_token })
      .then(() => res.json({ access_token, msg: "User token updated" }))
      .catch((err) => res.status(400).json({ err, msg: "Unexpected Error" }));
  } else {
    user = new User({ id, access_token });
    user
      .save()
      .then(() => res.json({ access_token, msg: "New User registered!!" }))
      .catch((err) => res.status(400).json({ err, msg: "Unexpected Error" }));
  }
});

module.exports = router;
