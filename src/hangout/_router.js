const router = require("express").Router();

const Hangout = require("./_model");

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
  const newHangout = new Hangout({ userID, title, place, date, description });
  await newHangout.save();
  res.json({ newHangout, msg: "Evento creado satisfactoriamente" });
});

module.exports = router;
