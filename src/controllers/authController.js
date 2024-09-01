import "dotenv/config";
import {
  registerUser,
  loginUser,
  passwordResetService,
  requestPasswordResetService,
} from "../services/authService.js";

export const signUp = async (req, res) => {
  const { name, contactNumber, email, password, status, role } = req.body;
  try {
    const token = await registerUser(
      name,
      contactNumber,
      email,
      password,
      status,
      role
    );
    res.status(201).send({ message: "User Created", token: token });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.status(200).json({ message: "Login successful", token: token });
  } catch (err) {
    res.status(400).send({ message: "Can't login user!", error: err.message });
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    await requestPasswordResetService(email);
    res.status(200).json({ message: "Password reset link sent to mail" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to send password reset link",
      error: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    await passwordResetService(token, newPassword);
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to reset password", error: err.message });
  }
};
