const express = require('express');
const path = require("path");

const app = express();

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("html", "login.html"));
});
// app.get("/registration", (req, res) => {
//   res.sendFile(path.resolve("html", "registration.html"));
// });

/* Ensure any requests prefixed with /static will serve our "frontend/static" directory */
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.listen(8081, ()=>{
  console.log("trygnahme")
})