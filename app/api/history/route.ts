import dbConnect from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findById(decoded.id).select("history").lean() as { history?: any[] } | null;

  return NextResponse.json({ ok: true, history: user?.history || [] });
}

export async function POST(req: Request) {
  const token = (await cookies()).get("token")?.value;
  const { disease, city, symptoms } = await req.json();

  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  await dbConnect();
  await User.findByIdAndUpdate(decoded.id, {
    $push: { 
      history: { 
        disease, 
        city, 
        symptoms, // Add this
        at: new Date() 
      } 
    },
  });

  return NextResponse.json({ ok: true });
}
