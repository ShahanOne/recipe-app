import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import Recipe from '@/lib/models/recipe';
import User from '@/lib/models/user';

connectDB();

export async function POST(req) {
  try {
    const {
      recipeId,
      newName,
      newDescription,
      newSteps,
      newIngredients,
      newPicture,
      userId,
    } = await req.json();

    const recipe = await Recipe.findOne({ _id: recipeId });

    if (recipe) {
      recipe.name = newName;
      recipe.description = newDescription;
      recipe.steps = newSteps;
      recipe.ingredients = newIngredients;
      recipe.picture = newPicture;

      const updatedRecipe = await recipe.save();

      const user = await User.findById(userId);
      const recipeIndex = user.uploadedRecipes.findIndex(
        (recipe) => recipe._id.toString() === recipeId
      );

      user.uploadedRecipes[recipeIndex] = updatedRecipe;
      await user.save();

      return NextResponse.json(updatedRecipe);
    } else {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }
  } catch (err) {
    console.error('Error updating recipe:', err);
    return NextResponse.json(
      { error: 'An error occurred while updating recipe' },
      { status: 500 }
    );
  }
}
