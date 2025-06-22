const handleError = require("../helpers/handleError");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      next(handleError(409, "User already register!"));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({
      success: true,
      message: "Registration successfully !",
      user,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      next(handleError(404, "Invalid login credential!"));
    }

    const hashedPassword = checkUser.password;
    const comparePassword = bcrypt.compare(password, hashedPassword);

    if (!comparePassword) {
      next(handleError(404, "Invalid login credential!"));
    }

    const token = jwt.sign(
      {
        _id: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
        avatar: checkUser.avatar,
      },
      process.env.JWT_SECRET
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      checkUser,
      message: "Login Successfully!",
    });
  } catch (error) {}
};

const GoogleLogin = async (req, res, next) => {
  try {
    const { email, name, avatar } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) {
     user = new User({
        name: name,
        email: email,
        password: Math.random().toString(),
        avatar: avatar
      });

      await user.save();
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: avatar,
      },
      process.env.JWT_SECRET
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      user,
      message: "User Login Successfully !",
    });
  } catch (err) {
    next(handleError(500, err.message))
  }
};

module.exports = { Register, Login, GoogleLogin };
