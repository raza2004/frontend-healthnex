import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import Client from '@/models/clientModel';
import { sendClientSignupEmail } from '@/helpers/sendClientSignupEmail';
import dbConnect from '@/dbConfig/dbConfig';
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession  } from 'next-auth';

dbConnect();
 async function handler(req: NextRequest, res: NextResponse) {
  if (req.method !== 'POST') {
    return NextResponse.json(`Method ${req.method} Not Allowed`, { status: 405 });
  }

  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
  }

  const token = uuidv4();

  const session = await getServerSession(authOptions);

  console.log("sessionaaaaaa", session);

  const { user } = session || {};

  if (!session || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email: stylistEmail } = user;

  const stylist = await User.findOne({ email:stylistEmail  });
  if (!stylist) {
    return NextResponse.json({ success: false, error: 'Stylist not found' }, { status: 404 });
  }

  try {
    
    const newClient = new Client({
      email,
      stylist:stylist.email,
      verifyEmailToken: token,
      verifyEmailTokenExpiry: Date.now() + 172800000, // 48 hour expiry
    });
console.log(newClient,"das");

    await newClient.save();

    const signupLink = `${process.env.NEXTAUTH_URL2}/signup?token=${token}`;
    console.log(signupLink,"signupLink");
    await sendClientSignupEmail({ email, signupLink });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error:any) {
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
         }
}

export { handler as POST };