import { getUserByEmail, updatePassword } from "../models/userModel.js";
import { validatePassword, hashPassword } from "./authService.js";

export const changePasswordService = async (
  email,
  oldPassword,
  newPassword
) => {
  const user = await getUserByEmail(email);
  try {
    if (!user) {
      console.log("User not found");
      throw new Error("The user is not found");
    } else if (await validatePassword(oldPassword, user.Password)) {
      const newHashedPassword = await hashPassword(newPassword);
      await updatePassword(email, newHashedPassword);
    } else {
      throw new Error("Old password did not match with the database");
    }
  } catch (err) {
    throw err;
  }
};
