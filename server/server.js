const app = require("./app");
const cron = require("node-cron");
require("dotenv").config();
const port = process.env.PORT || 8001;

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});
module.exports = sequelize;

sequelize.sync();


app.listen(port, () => console.log(`Server is running on port ${port}...`));




// TODO: Add a /ping endpoint and cron job to check if server is still running


// // Add a /ping endpoint
// app.get("/ping", (req, res) => {
//   res.send("Pong!");
// });

// // Schedule a task to run every 5 minutes
// cron.schedule("*/9 * * * *", () => {
//   console.log(`Server is still running on port ${port}...`);
//   // Make a request to the /ping endpoint
//   axios
//     .get(`http://localhost:${port}/ping`)
//     .then((response) => console.log("Ping successful:", response.status))
//     .catch((error) => console.error("Error pinging server:", error.message));
// });
