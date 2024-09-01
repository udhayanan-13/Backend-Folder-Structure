import "dotenv/config";
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  console.log("authenticate token");
  const authHeader = req.headers.authorization;
  try {
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } else {
      res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }
  } catch (err) {
    res.status(500).json({ message: "Invalid Token", error: err });
  }
};
