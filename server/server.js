require("dotenv").config();
const dbconnect = require("./src/config/db");
const app = require("./src/app/app");

dbconnect();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server now running on http://localhost:${PORT}`);
});
