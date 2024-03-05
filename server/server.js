const app = require("./app");
const mongoose = require("mongoose");
const port = 5000;
require("dotenv").config({ path: "./.env" });
const URL = process.env.MONGODB_URL;
const dailySchedule = require("./controllers/dailyScheduleController");

mongoose
  .connect(URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Error connecting to the database");
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  setInterval(dailySchedule.checkNewDay, 60000);
});
