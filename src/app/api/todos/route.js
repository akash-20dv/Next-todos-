import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoDB';
import Todo from '../../../models/Todo';

export async function GET() {
  await dbConnect();
  const todos = await Todo.find({});
  return NextResponse.json(todos);
}

export async function POST(request) {
  const { text, completed } = await request.json();
  await dbConnect();
  const newTodo = await Todo.create({ text, completed });
  return NextResponse.json(newTodo, { status: 201 });
}

