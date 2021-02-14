const router = require("express").Router();

const Hangout = require("./_model");
const User = require("../user/_model");
const Chat = require("../chat/_model");
const { getFacebookUserData } = require("../_auth/_utils");

router.get("/:hangoutID", async (req, res) => {
  const hangoutDoc = await Hangout.findById(req.params.hangoutID);
  const hangout = hangoutDoc.toObject();
  const { access_token } = await User.findOne({ id: hangout.userID });
  const userData = await getFacebookUserData(access_token, ["name", "picture"]);
  hangout.user = userData;
  const { assistants } = hangout;
  const assistantsArr = [];
  for (const assistant of assistants) {
    const { access_token } = await User.findOne({ id: assistant });
    assistantsArr.push(
      await getFacebookUserData(access_token, ["name", "picture"])
    );
  }
  hangout.assistantsArr = assistantsArr;
  res.json(hangout);
});

router.post("/", async (req, res) => {
  const { title, place, date, description, userID } = req.body;
  const errors = {};
  if (!userID) errors.userID = "The user id is required!!";
  if (!title) errors.title = "The title is required";
  if (!place) errors.place = "The place is required";
  const specifiedDate = new Date(date);
  const minDate = new Date(new Date().getTime() + 10 * 60000); // Plus 10 mins
  if (specifiedDate < minDate)
    errors.date =
      "This date is not valid, it must be at least 10 minutes from now";

  if (Object.keys(errors).length !== 0) {
    res.status(400).json({ errors });
    return;
  }
  const newHangout = new Hangout({
    userID,
    title,
    place,
    date,
    description,
    assistants: [userID],
  });
  await newHangout.save();
  const chat = new Chat({ hangout: newHangout._id });
  await chat.save();
  res.json({
    newHangout,
    msg: "Hangout and corresponding chat successfully created",
  });
});

router.put("/:hangoutID", async (req, res) => {
  await Hangout.findByIdAndUpdate(req.params.hangoutID, req.body);
  res.json({ msg: "Hangout successfully updated" });
});

router.post("/:hangoutID/willAssist/:userID", async (req, res) => {
  const { assistants = [] } = await Hangout.findById(req.params.hangoutID);
  assistants.push(req.params.userID);
  await Hangout.findByIdAndUpdate(req.params.hangoutID, { assistants });
  res.json("User will assist");
});

router.post("/:hangoutID/wontAssist/:userID", async (req, res) => {
  const { assistants = [] } = await Hangout.findById(req.params.hangoutID);
  const idx = assistants.indexOf(req.params.userID);
  if (idx > -1) assistants.splice(idx, 1);
  await Hangout.findByIdAndUpdate(req.params.hangoutID, { assistants });
  res.json("User won't assist anymore");
});

router.delete("/:hangoutID", async (req, res) => {
  await Hangout.findByIdAndDelete(req.params.hangoutID);
  res.json("Hangout successfully removed");
});

module.exports = router;
