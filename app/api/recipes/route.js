import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '../../../utils/db';
import Recipe from '@/lib/models/recipe';
connectDB();

export async function GET() {
  try {
    const foundRecipes = await Recipe.find({});
    return NextResponse.json(foundRecipes);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while fetching recipes' },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  const { recipeId } = await req.json();

  try {
    const foundRecipe = await Recipe.findOne({ _id: recipeId });
    return NextResponse.json(foundRecipe);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while fetching recipe' },
      { status: 500 }
    );
  }
}
