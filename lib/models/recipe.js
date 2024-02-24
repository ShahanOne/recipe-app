import mongoose from 'mongoose';
export const recipeSchema = new mongoose.Schema({
  name: String,
  picture: String, //url
  description: String,
});

let Recipe;
try {
  // Check if the model already exists
  Recipe = mongoose.model('Recipe');
} catch (error) {
  // If not, define the model
  Recipe = mongoose.model('Recipe', recipeSchema);
}

export default Recipe;
