// pages/api/tasks.ts

import connect from '@/dbConfig/dbConfig';
import Task from '@/models/taskModel';
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

  if (req.method === 'GET') {
    try {
      const tasks = await Task.find({ userEmail: email });
      return NextResponse.json({ tasks }, { status: 200 });
    } catch (error:any) {
      console.error('Error fetching tasks:', error.message || error.stack);
      return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const newTask = new Task({
        userEmail: email,
        taskName: body.taskName,
        description: body.description,
        dueDate: body.dueDate,
        client: body.client,
        status: body.status,
      });
      await newTask.save();
      return NextResponse.json({ task: newTask }, { status: 201 });
    } catch (error:any) {
      console.error('Error adding task:', error.message || error.stack);
      return NextResponse.json({ error: 'Error adding task' }, { status: 500 });
    }
  }

  if (req.method === 'PUT') {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get('id');
      console.log("id",id)
      if (!id || !isValidObjectId(id)) {
        return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
      }
      const body = await req.json();
      const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json({ task: updatedTask }, { status: 200 });
    } catch (error:any) {
      console.error('Error updating task:', error.message || error.stack);
      return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get('id');
      console.log("id",id)
      if (!id || !isValidObjectId(id)) {
        return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
      }
      await Task.findByIdAndDelete(id);
      return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
    } catch (error:any) {
      console.error('Error deleting task:', error.message || error.stack);
      return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
    }
  }

  return NextResponse.json(`Method ${req.method} Not Allowed`, { status: 405 });
}

// Function to check if a string is a valid MongoDB ObjectId
function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}


export { handler as GET, handler as POST, handler as PUT, handler as DELETE };