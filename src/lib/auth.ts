import jwt from "jsonwebtoken";

export function getUserIdFromToken(req: Request): number | null {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    return decoded.id;
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return null;
  }
}
