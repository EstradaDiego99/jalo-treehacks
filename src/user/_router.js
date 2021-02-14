const router = require("express").Router();
const User = require("../user/_model");

const { getFacebookUserData } = require("../_auth/_utils");

router.get("/id-query/:userID", async (req, res) => {
  const userDoc = await User.findOne({ id: req.params.userID });
  const facebookData = await getFacebookUserData(userDoc.access_token, [
    "id",
    "email",
    "name",
    "first_name",
    "friends",
    "gender",
    "location",
    "age_range",
    "picture",
  ]);
  const user = { ...userDoc.toObject(), ...facebookData };
  res.json(user);
});

module.exports = router;
