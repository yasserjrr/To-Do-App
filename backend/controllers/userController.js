const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  //Authenticate user

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });

  if (!user) return res.status(404).json();
  if (user.password !== password) return res.status(401).json();

  const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "50s",
  });
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
};

const register = async (req, res) => {
  const email = req.body.email;

  const user = new User(req.body);
  await user.save();
  const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "50s",
  });
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
};

module.exports = { login, register };
