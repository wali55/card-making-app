const jwt = require("jsonwebtoken");
const { Admin } = require("../db/db");

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ msg: "unauthorized" });
    }
    const tokenStr = token.split(" ")[1];
    const decoded = jwt.decode(tokenStr);
    const username = decoded.username;

    const admin = await Admin.findOne({ username });

    if (admin.username !== "admin" || admin.password !== "1516") {
      return res.status(200).json({ msg: "admin not found" });
    }
    req.username = admin?.username;
    next();
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = adminMiddleware;
