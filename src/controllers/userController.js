import { changePasswordService } from "../services/userServices.js";

export const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    await changePasswordService(email, oldPassword, newPassword);
    res.status(201).json({ message: "Password updated" });
  } catch (err) {
    res.status(400).json({
      message: "Error in changing password. Try again later!",
      error: err.message,
    });
  }
};
