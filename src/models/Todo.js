import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please provide a text for this todo.'],
    maxlength: [200, 'Text cannot be more than 200 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);