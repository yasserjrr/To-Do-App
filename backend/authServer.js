require("dotenv").config();

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const posts = [
  {
    username: "yasser",
    title: "post 1",
  },
  {
    username: "mohamady",
    title: "post 2",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
});

app.post("/login", (req, res) => {
  //Authenticate user

  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", authHeader);
  if (token == null) return res.sendStatus(401);
  console.log("env", process.env.ACCESS_TOKEN_SECRET);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
