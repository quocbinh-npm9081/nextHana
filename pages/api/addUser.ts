import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST request allowed." });
  }
  await db.mongoDB.connect();
  const data = req.body;
  const { password, phoneNumber, userName } = data;

  const user = await User.find({ phoneNumber: phoneNumber });

  if (user.length != 0) {
    await db.mongoDB.disconnect();
    res.send({ status: 200, message: "Số điện thoại này đã được sử dụng !" });
  }

  const userInfo = {
    name: userName,
    phoneNumber: phoneNumber,
    password: bcrypt.hashSync(password),
  };

  const newUser = await new User(userInfo);
  await newUser.save();
  await db.mongoDB.disconnect();
  res.send({ status: 201, message: "Đăng kí thành công !" });
};

export default handler;
