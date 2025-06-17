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

module.exports = { Register, Login };
