import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserIdFromToken(req: Request): Promise<number | null> {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };
    return decoded.id;
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return null;
  }
}
