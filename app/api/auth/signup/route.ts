import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await dbConnect();

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    const verifyUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

    // ✅ 1) Send email FIRST
    await sendMail({
      to: email,
      subject: "Verify your HealthNexus account",
      html: `
        <p>Click to verify your email:</p>
        <p><a href="${verifyUrl}">Verify Email</a></p>
        <p>This link expires in 1 hour.</p>
      `,
    });

    // ✅ 2) Save user ONLY if email sent successfully
    await User.create({
      name,
      email,
      password: hashed,
      isVerified: false,
      verifyEmailTokenHash: tokenHash,
      verifyEmailTokenExpiry: expiry,
    });

    return NextResponse.json({ ok: true, message: "Verification email sent" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Signup failed" }, { status: 500 });
  }
}
