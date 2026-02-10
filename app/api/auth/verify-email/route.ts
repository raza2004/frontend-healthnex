import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    if (!token) return NextResponse.json({ error: "Token required" }, { status: 400 });

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    await dbConnect();

    const user = await User.findOne({
      verifyEmailTokenHash: tokenHash,
      verifyEmailTokenExpiry: { $gt: new Date() },
    });

    if (!user) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });

    user.isVerified = true;
    user.verifyEmailTokenHash = undefined;
    user.verifyEmailTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Verify failed" }, { status: 500 });
  }
}
