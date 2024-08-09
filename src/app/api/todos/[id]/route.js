import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoDB';
import Todo from '../../../../models/Todo';

export async function PUT(request, { params }) {
  const { id } = params;
  const { text, completed } = await request.json();
  await dbConnect();
  const updatedTodo = await Todo.findByIdAndUpdate(id, { text, completed }, { new: true });
  return NextResponse.json(updatedTodo);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await dbConnect();
  await Todo.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Todo deleted successfully' });
}