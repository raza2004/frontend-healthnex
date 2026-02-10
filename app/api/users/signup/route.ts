import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/sendgrid";
import { NextRequest, NextResponse } from 'next/server';

 async function handler(req: NextRequest, res: NextResponse) {

  try {
    await connect();
    const reqBody = await req.json()
    const { userFullName, email, phoneNumber, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({email})
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const existingPhoneUser = await User.findOne({ phoneNumber });
    if (existingPhoneUser) {
      return NextResponse.json({ error: "Phone number already exists" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      userFullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    
   
    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser
    },{status:200});
  } catch (error:any) {
    return NextResponse.json({ error: error.message },{status:500});
  }
}

// export const config = {
//   runtime: "edge",
// };
export {handler as POST };