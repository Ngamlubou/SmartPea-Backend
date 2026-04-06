const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/test", (req, res) => {
  res.json({ message: "Test works ✅" });
});

app.listen(PORT, () => {
  console.log("Server started");
});
