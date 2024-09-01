import {
  emailExists,
  getUserByEmail,
  insertUser,
  updatePassword,
} from "../models/userModel.js";
import { sendResetEmail } from "../utils/emailUtils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
export const validatePassword = async (userEnteredPassword, storedPassword) => {
  const result = await bcrypt.compare(userEnteredPassword, storedPassword);
  return result;
};
const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};
const verifyToken = (token) => {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    // Handle errors (e.g., token expired, invalid signature)
    throw new Error("Invalid token");
  }
};

export const registerUser = async (
  name,
  contactNumber,
  email,
  password,
  status,
  role
) => {
  try {
    if (!(await emailExists(email))) {
      const jwt_token = generateToken({ name: name, email: email, role: role });
      const hashedPassword = await hashPassword(password);
      await insertUser(
        name,
        contactNumber,
        email,
        hashedPassword,
        status,
        role
      );
      console.log("User data inserted into database");
      return jwt_token;
    } else {
      throw new Error("Email already exist! Try with new email address");
    }
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    console.log(user);
    if (!user) {
      throw new Error("User not found. Register your credentials!");
    } else if (!(await validatePassword(password, user.Password))) {
      throw new Error("Incorrect Password! Try again with correct password");
    } else {
      const token = generateToken({
        name: user.Name,
        email: user.Email,
        role: user.Role,
      });
      return token;
    }
  } catch (err) {
    throw err;
  }
};

export const requestPasswordResetService = async (email) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const token = generateToken({
    name: user.Name,
    email: user.Email,
    role: user.Role,
  });
  await sendResetEmail(email, token);
};

export const passwordResetService = async (token, newPassword) => {
  const { email } = verifyToken(token);
  const user = getUserByEmail(email);
  if (!user) {
    throw new Error("invalid token or user not found");
  }
  const hashedNewPassword = await hashPassword(newPassword);
  await updatePassword(email, hashedNewPassword);
};
