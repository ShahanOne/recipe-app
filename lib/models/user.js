import mongoose from 'mongoose';
import { recipeSchema } from './recipe';
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: true,
  },
  uploadedRecipes: [recipeSchema],
});

let User;
try {
  // Check if the model already exists
  User = mongoose.model('User');
} catch (error) {
  // If not, define the model
  User = mongoose.model('User', userSchema);
}

export default User;
