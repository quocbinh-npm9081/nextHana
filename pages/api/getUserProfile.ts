import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import User from "@/models/User";
import data from "@/utils/data";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.mongoDB.connect();
  //await User.findOne({});

  await db.mongoDB.disconnect();
  res.send({ message: "seeded successfully" });
};

export default handler;
