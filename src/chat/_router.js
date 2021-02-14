const router = require("express").Router();

const User = require("../user/_model");
const Hangout = require("../hangout/_model");
const { getFacebookUserData } = require("../_auth/_utils");

router.get("/:hangoutID", async (req, res) => {
  const hangoutModel = await Hangout.findById(req.params.hangoutID);
  const hangout = hangoutModel.toObject();
  const assistantsArr = [];
  for (const assistant of hangout.assistants) {
    const { access_token } = await User.findOne({ id: assistant });
    assistantsArr.push(
      await getFacebookUserData(access_token, ["name", "picture"])
    );
  }
  hangout.assistantsArr = assistantsArr;
  res.json(hangout);
});

router.post("/chat-query", async (req, res) => {
  const { user } = req.body;
  const hangoutIDs = [];
  const ownHangouts = await Hangout.find({ userID: user.id });
  for (const hangout of ownHangouts) hangoutIDs.push(hangout._id);

  const userFriends = user.friends.data.map((f) => f.id);
  const promises = [];
  for (const friendID of userFriends) {
    promises.push(
      new Promise((resolve, _) => {
        Hangout.find({ userID: friendID }).then((hangoutModels) => {
          hangoutModels.forEach(({ _id, assistants }) => {
            if (assistants.indexOf(user.id) !== -1) hangoutIDs.push(_id);
          });
          resolve();
        });
      })
    );
  }
  await Promise.all(promises);

  const chats = [];
  for (const hangout of hangoutIDs) {
    const hangoutModel = await Hangout.findById(hangout);
    chats.push(hangoutModel.toObject());
  }
  chats.sort((a, b) => (a.date < b.date ? 1 : -1));

  res.json(chats);
});

module.exports = router;
