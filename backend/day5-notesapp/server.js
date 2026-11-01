require("dotenv").config();
const app = require("./src/app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

//one more way of doing:
// const dotenv = require("dotenv");
// dotenv.config();
// const app = require("./src/app");

// let port = 3000;

// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });