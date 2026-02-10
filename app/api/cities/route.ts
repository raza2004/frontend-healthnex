import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import SymptomLog from "@/models/SymptomLog";

export async function GET() {
  await connectDB();
  const logs = await SymptomLog.find().sort({ createdAt: -1 });
  return NextResponse.json({ logs });
}

export async function POST(req: Request) {
  await connectDB();
  const { symptoms, results } = await req.json();
  const log = await SymptomLog.create({ symptoms, results });
  return NextResponse.json({ log });
}
