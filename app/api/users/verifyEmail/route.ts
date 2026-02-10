import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
// import handler from '../../hello';

 async function handler(request:NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyEmailToken: token,
      verifyEmailTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Invalid token or token expired:", token);
      return NextResponse.json({ error: "Invalid token" },{status:400});
    }

    console.log("Found user:", user);

    user.isVerifiedemail = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    console.log("User updated:", user);

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error:any) {
    console.error("Error verifying email:", error);
    return NextResponse.json({ error: error.message },{status:500});
  }
}
export { handler as POST };