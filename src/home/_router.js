const router = require("express").Router();
require("dotenv").config();

const Hangout = require("../hangout/_model");

// Template route to check if the back-end properly is connected
router.post("/hangouts-query", async (req, res) => {
  const { user } = req.body;
  const ownHangouts = await Hangout.find({ userID: user.id });

  const userFriends = user.friends.data.map((f) => f.id);
  const friendHangouts = [];
  const promises = [];
  for (const friendID of userFriends) {
    promises.push(
      new Promise((resolve, _) => {
        Hangout.find({ userID: friendID }).then((hangouts) => {
          hangouts.forEach((h) => friendHangouts.push(h));
          resolve();
        });
      })
    );
  }

  await Promise.all(promises);
  ownHangouts.sort((a, b) => (a.date > b.date ? 1 : -1));
  friendHangouts.sort((a, b) => (a.date > b.date ? 1 : -1));
  res.json({ ownHangouts, friendHangouts });
});

module.exports = router;
