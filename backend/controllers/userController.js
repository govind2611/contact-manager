const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send({
      status: 400,
      message: "Enter the valid credentials.",
    });
  }
  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    return res.status(400).send({
      status: 400,
      message: "User already Registered",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    return res.status(400).send({
      status: 400,
      message: "User data is not valid",
    });
  }

  res.json({
    message: "User registration Successful",
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      status: 400,
      message: "All fields are mandatory!!",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({
      status: 400,
      message: "Email or password is not valid",
    });
  }
  
  const isPassSame = await bcrypt.compare(password, user.password);

  if (!isPassSame) {
    return res.status(400).send({
      status: 400,
      message: "Password Incorrect",
    });
  }else{
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30m" }
    );
    return res.status(200).send({
      status: 200,
      token: accessToken,
      message: "Logged in successfully...",
    });
  }
 
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
