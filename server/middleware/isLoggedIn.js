const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = isLoggedIn = async (req, res, next) => {
  const header = req.get("Authorization");
  if (!header) {
    return res.status(401).json({ message: "Not Authorized" });
  }
  const token = header.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(decoded.user.id);
    if (user) {
      req.body.authUser = user;
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Could not process authentication status" });
  }
  next();
};
