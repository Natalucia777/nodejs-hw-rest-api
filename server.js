const mongoose = require("mongoose");
const app = require('./app');

const { DB_HOST, PORT } = process.env;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}.`)
// });
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
