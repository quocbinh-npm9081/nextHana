import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth";
export default async function handler(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  res.status(200).json({ message: "ok" });
}
