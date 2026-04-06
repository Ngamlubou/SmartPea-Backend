const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
app.use(cors({
  origin: "https://ngamlubou.github.io"
}));
app.use(express.json());

function generateCode(prefix) {
  const num = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return prefix + num;
}

app.post("/submit", (req, res) => {
  const { classValue } = req.body;
  const code = generateCode(classValue);  
res.json({
    success: true, 
    code: code
  });
});
app.listen(PORT);
