import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    console.log("Incoming:", body);

    if (!email || !password || !name) {
      return new Response("Missing fields", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    console.log("Created user:", user);

    return Response.json(user);

  } catch (error: any) {
    console.error("REGISTER ERROR:", error);
    return new Response(error.message || "Internal Error", {
      status: 500,
    });
  }
}
