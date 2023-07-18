import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import LuckyOrderVoucher from "@/models/LuckyOrderVoucher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.mongoDB.connect();
  const data = await LuckyOrderVoucher.find({});

  await db.mongoDB.disconnect();
  res.send({ mesage: "Lấy user thành công !", data });
};

export default handler;
