// import connect from '@/dbConfig/dbConfig';
// import User from '@/models/userModel';
// import Profile from '@/models/profileModel';
// import { getServerSession  } from 'next-auth';
// import { NextRequest, NextResponse } from 'next/server';
// import NextRequestApi, { NextApiRequest, NextApiResponse } from 'next';
// import { authOptions } from "../../api/auth/[...nextauth]/route";



// async function handler(req: NextRequest, res: NextResponse) {
//   await connect();

//   const session = await getServerSession(authOptions);

//   console.log("sessionaaaaaa", session);

//   const { user } = session || {};

//   if (!session || !user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   if (req.method === "GET") {
//     try {
//       const { email } = user;
//       const users = await User.findOne({ email });
//       const userProfile = await Profile.findOne({ user_email: email });
      

//       if (!users) {
//         return NextResponse.json(
//           { error: "User profile not found" },
//           { status: 404 }
//         );
//       }

//       const responseData = {
//         users,
//         userProfile,  
//       };

//       return NextResponse.json(responseData, { status: 200 });
//     } catch (error) {
//       return NextResponse.json(
//         { error: "Error fetching user profile data" },
//         { status: 500 }
//       );
//     }
//   }
  
//   else if (req.method === "POST") {
//     try {
//       const { email } = user;
//       const userProfiles = await User.findOne({ email });

//       if (!userProfiles) {
//         return NextResponse.json({ error: "User not found" }, { status: 404 });
//       }

//       const body = await req.json();
//       const imageBase64 = body?.image;

//       const profileData = {
//         image: imageBase64,
//         user_email: email
//       };

//       const userProfile = await Profile.findOneAndUpdate(
//         { user_email: email },
//         profileData,
//         {
//           new: true,
//           upsert: true,
//         }
//       );

//       return NextResponse.json(userProfile, { status: 200 });
//     } catch (error) {
//       return NextResponse.json(
//         { error: "Error updating user profile data" },
//         { status: 500 }
//       );
//     }
//   } else {
//     return NextResponse.json(`Method ${req.method} Not Allowed`, {
//       status: 405,
//     });
//   }
// }

// export { handler as GET, handler as POST };