export const authorizeAdmin = (req, res, next) => {
  console.log("authorizeAdmin");
  if (req.user.role === "Admin") {
    next();
  } else {
    res.status(400).send({ message: "Unauthorized" });
  }
};
