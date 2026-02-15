import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return new Response("Missing fields", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.hashedPassword) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const isCorrect = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isCorrect) {
      return new Response("Invalid credentials", { status: 401 });
    }

    return Response.json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    console.log(error);
    return new Response("Internal Error", { status: 500 });
  }
}
