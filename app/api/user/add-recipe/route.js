import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '../../../../utils/db';
import Recipe from '@/lib/models/recipe';
import User from '@/lib/models/user';
connectDB();

export async function POST(req) {
  const { name, description, ingredients, steps, picture, userId, userName } =
    await req.json();

  const recipe = new Recipe({
    name: name,
    ingredients: ingredients,
    steps: steps,
    description: description,
    picture: picture,
    uploadedBy: userName,
  });
  try {
    const newRecipe = await recipe.save();
    if (newRecipe) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { uploadedRecipes: newRecipe } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error('User not found');
      }
      return NextResponse.json(newRecipe);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'An error occurred while saving recipe' },
      { status: 500 }
    );
  }
}
