# Todo List App with Next.js and MongoDB

This project is a simple todo list application built with Next.js and MongoDB. It demonstrates how to implement CRUD (Create, Read, Update, Delete) operations using Next.js API routes and MongoDB Atlas.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Setup](#setup)
3. [MongoDB Integration](#mongodb-integration)
4. [API Routes and CRUD Operations](#api-routes-and-crud-operations)
5. [Learning Outcomes](#learning-outcomes)

## Technologies Used

- Next.js (with App Router)
- React
- MongoDB Atlas
- Mongoose
- shadcn/ui for UI components

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## MongoDB Integration

### Connecting to MongoDB

We use Mongoose to connect to MongoDB. The connection is established in `lib/mongodb.js`:

```javascript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
}

export default dbConnect;
```

This function ensures that we maintain a single connection to the database throughout the lifecycle of the application.

### Defining the Todo Model

The Todo model is defined in `models/Todo.js`:

```javascript
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
```

This schema defines the structure of our todo items in the database.

## API Routes and CRUD Operations

We implement CRUD operations using Next.js API routes. Here's a breakdown of each operation:

### Create (POST)

```javascript
// app/api/todos/route.js
export async function POST(request) {
  const { text, completed } = await request.json();
  await dbConnect();
  const newTodo = await Todo.create({ text, completed });
  return NextResponse.json(newTodo, { status: 201 });
}
```

This route creates a new todo item in the database.

### Read (GET)

```javascript
// app/api/todos/route.js
export async function GET() {
  await dbConnect();
  const todos = await Todo.find({});
  return NextResponse.json(todos);
}
```

This route retrieves all todo items from the database.

### Update (PUT)

```javascript
// app/api/todos/[id]/route.js
export async function PUT(request, { params }) {
  const { id } = params;
  const { text, completed } = await request.json();
  await dbConnect();
  const updatedTodo = await Todo.findByIdAndUpdate(id, { text, completed }, { new: true });
  return NextResponse.json(updatedTodo);
}
```

This route updates an existing todo item in the database.

### Delete (DELETE)

```javascript
// app/api/todos/[id]/route.js
export async function DELETE(request, { params }) {
  const { id } = params;
  await dbConnect();
  await Todo.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Todo deleted successfully' });
}
```

This route deletes a todo item from the database.

## Learning Outcomes

Through this project, you've learned:

1. **MongoDB Integration**: How to connect a Next.js application to MongoDB Atlas using Mongoose.
2. **Schema Definition**: How to define a Mongoose schema for structuring your data.
3. **CRUD Operations**: How to implement Create, Read, Update, and Delete operations using MongoDB and Mongoose.
4. **API Routes in Next.js**: How to create and use API routes in Next.js for handling HTTP requests.
5. **State Management**: How to manage state in a React application and sync it with a database.
6. **Error Handling**: Basic error handling in API routes and database operations.
7. **Environment Variables**: How to use environment variables to securely store database credentials.
8. **Asynchronous JavaScript**: Working with async/await for handling asynchronous operations.

This project serves as a foundation for building more complex applications with Next.js and MongoDB. As you continue to develop, consider adding features like user authentication, data validation, and more advanced querying techniques.