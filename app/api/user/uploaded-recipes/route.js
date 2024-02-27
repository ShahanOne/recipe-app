import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '../../../../utils/db';
import User from '@/lib/models/user';
connectDB();

export async function POST(req) {
  const { userId } = await req.json();

  try {
    const user = await User.findOne({ _id: userId });
    if (user) {
      return NextResponse.json(user.uploadedRecipes);
    }
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while fetching recipes' },
      { status: 500 }
    );
  }
}
