import connect from '@/dbConfig/dbConfig';
import Presentation from '@/models/presentationsModel';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from "../../api/auth/[...nextauth]/route";

async function handler(req: NextRequest, res: NextResponse) {
  await connect();

  const session = await getServerSession(authOptions);
  const { user } = session || {};

  if (!session || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email } = user;

// API route to fetch a specific presentation by its ID
if (req.method === 'GET') {
  try {
    const id = req.nextUrl.searchParams.get('_id');
    let presentations;

    if (id) {
      presentations = await Presentation.findOne({ _id: id, userEmail: email });
      if (!presentations) {
        return NextResponse.json({ error: 'Presentation not found' }, { status: 404 });
      }
    } else {
      presentations = await Presentation.find({ userEmail: email });
    }

    return NextResponse.json({ presentations }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching presentations:', error.message || error.stack);
    return NextResponse.json({ error: 'Error fetching presentations' }, { status: 500 });
  }
}

if (req.method === 'POST') {
  try {
    const body = await req.json();
    const newPresentation = new Presentation({
      userEmail: email,
      name: body.name,
      text:body.text,
      boards: body.boards,
      currentBoard: body.currentBoard,
      layoutType: body.layoutType,
    });
    await newPresentation.save();
    return NextResponse.json({ presentation: newPresentation }, { status: 201 });
  } catch (error: any) {
    console.error('Error adding presentation:', error.message || error.stack);
    return NextResponse.json({ error: 'Error adding presentation' }, { status: 500 });
  }
}

if (req.method === 'PUT') {
  try {
    const id = req.nextUrl.searchParams.get('_id');
    if (!id) {
      return NextResponse.json({ error: 'Invalid presentation ID' }, { status: 400 });
    }
    const body = await req.json();
    const updatedPresentation = await Presentation.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ presentation: updatedPresentation }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating presentation:', error.message || error.stack);
    return NextResponse.json({ error: 'Error updating presentation' }, { status: 500 });
  }
}

  if (req.method === 'DELETE') {
    try {
      const id = req.nextUrl.searchParams.get('_id');
      console.log("id", id);
      // if (!id || !isValidObjectId(id)) {
      //   return NextResponse.json({ error: 'Invalid presentation ID' }, { status: 400 });
      // }
      await Presentation.findByIdAndDelete(id);
      return NextResponse.json({ message: 'Presentation deleted successfully' }, { status: 200 });
    } catch (error: any) {
      console.error('Error deleting presentation:', error.message || error.stack);
      return NextResponse.json({ error: 'Error deleting presentation' }, { status: 500 });
    }
  }

  return NextResponse.json(`Method ${req.method} Not Allowed`, { status: 405 });
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
