const axios = require("axios");
const router = require("express").Router();
require("dotenv").config();

const Hangout = require("../hangout/_model");
const User = require("../user/_model");

async function getFacebookUserData(access_token) {
  const { data } = await axios.get("https://graph.facebook.com/me", {
    params: {
      fields: ["first_name", "picture"].join(","),
      access_token,
    },
  });
  return data;
}

// Template route to check if the back-end properly is connected
router.post("/hangouts-query", async (req, res) => {
  const { user } = req.body;
  const { access_token } = await User.findOne({ id: user.id });

  const ownHangouts = [];
  const ownHangoutsModel = await Hangout.find({ userID: user.id });
  ownHangoutsModel.forEach(async (h) => {
    const hangout = h.toObject();
    hangout.user = await getFacebookUserData(access_token);
    ownHangouts.push(hangout);
  });

  const userFriends = user.friends.data.map((f) => f.id);
  const friendHangouts = [];
  const promises = [];
  for (const friendID of userFriends) {
    const { access_token } = await User.findOne({ id: friendID });
    const friendData = await getFacebookUserData(access_token);
    promises.push(
      new Promise((resolve, _) => {
        Hangout.find({ userID: friendID }).then((hangoutModels) => {
          hangoutModels.forEach((h) => {
            const hangout = h.toObject();
            hangout.user = friendData;
            friendHangouts.push(hangout);
          });
          resolve();
        });
      })
    );
  }

  await Promise.all(promises);
  ownHangouts.sort((a, b) => (a.date > b.date ? 1 : -1));
  friendHangouts.sort((a, b) => (a.date > b.date ? 1 : -1));
  res.json({
    ownHangouts: ownHangouts.filter((h) => new Date(h.date) > new Date()),
    friendHangouts: friendHangouts.filter((h) => new Date(h.date) > new Date()),
  });
});

module.exports = router;
