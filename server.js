const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database connected successfully"))
  .catch((err) => console.log(err));

const signUpRouter = require("./src/signup/_router");
app.use("/api/signup", signUpRouter);

const homeRouter = require("./src/home/_router");
app.use("/api/home", homeRouter);

const hangoutsRouter = require("./src/hangout/_router");
app.use("/api/hangouts", hangoutsRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server is running on port: ${port}`));
