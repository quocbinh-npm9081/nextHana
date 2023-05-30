import { NextApiResponse } from "next";
import db from "@/utils/db";

const handler = async (res: NextApiResponse) => {
  await db.mongoDB.connect();

  await db.mongoDB.disconnect();
  res.send({ message: "seeded successfully" });
};

export default handler;
