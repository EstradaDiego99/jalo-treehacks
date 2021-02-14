const router = require("express").Router();

const Chat = require("./_model");
const User = require("../user/_model");
const Hangout = require("../hangout/_model");

router.get("/", async (req, res) => {
  const chats = await Chat.find({});
  res.json(chats);
});

router.get("/:chatID", async (req, res) => {
  const chat = await Chat.findById(req.params.chatID);
  res.json(chat);
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
