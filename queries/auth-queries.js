import connectDB from "@/lib/db";
import UserModel from "@/models/user-model";

async function createNewUser(userData) {
  try {
    await connectDB();
    const user = await UserModel.create(userData);
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

async function findUserByEmail(email) {
  try {
    await connectDB();
    const user = await UserModel.findOne({ email: email });
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

export { createNewUser, findUserByEmail };
