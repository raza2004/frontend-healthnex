// import connect from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { SignJWT } from "jose";
// import { getJwtSecretKey } from "@/libs/auth";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";
// connect();
// export async function POST(req) {
//   try {
//     // await 
//     const reqBody = await req.json();
//     const { email, password } = reqBody;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return response.status(400).json({ error: "User does not exist" });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return response.status(400).json({ error: "Invalid password" });
//     }

//     // Create a signed JWT for logout
//     const tokenData = {
//       id: user._id,
//       email: user.email,
//       name: user.userFullName,
//     };

//     const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
//       expiresIn: "1d",
//     });
//     // set token to the client browser cookie
//     const response = NextResponse.json(
//       { success: true, message: "Login successful" },
//       { status: 200 }
//     );
//     response.cookies.set("token", token, { httpOnly: true });
//     return response;
//   } catch (error) {
//     if (error.status === 400) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: error.message,
//         },
//         { status: error.status }
//       );
//     } else {
//       console.log(error);
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Internal server error",
//         },
//         { status: 500 }
//       );
//     }
//   }
// }
