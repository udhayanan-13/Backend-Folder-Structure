import { getAllUser } from "../models/userModel.js";
import { updateStatus } from "../models/userModel.js";
export const getAllUsers = async (req, res) => {
  try {
    const result = await getAllUser();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send({ message: "Error in getting all users", error: err });
  }
};

export const updateUserStatus = async (req, res) => {
  const { email, status } = req.body;
  try {
    await updateStatus(email, status);
    res.status(201).send({ message: "User status updated." });
  } catch (err) {
    res
      .status(400)
      .send({ message: "Status update failed", error: err.message });
  }
};
