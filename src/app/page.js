'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodo, completed: false }),
      });
      if (response.ok) {
        setNewTodo('');
        fetchTodos();
      }
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t._id === id);
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    });
    if (response.ok) {
      fetchTodos();
    }
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    if (response.ok) {
      fetchTodos();
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = async () => {
    if (editingText.trim() !== '') {
      const response = await fetch(`/api/todos/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editingText }),
      });
      if (response.ok) {
        setEditingId(null);
        fetchTodos();
      }
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="mr-2"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id)}
              className="mr-2"
            />
            {editingId === todo._id ? (
              <Input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="mr-2 flex-grow"
              />
            ) : (
              <span
                className={`flex-grow ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.text}
              </span>
            )}
            {editingId === todo._id ? (
              <Button onClick={saveEdit} className="mr-2">Save</Button>
            ) : (
              <Button onClick={() => startEditing(todo._id, todo.text)} className="mr-2">Edit</Button>
            )}
            <Button variant="destructive" onClick={() => deleteTodo(todo._id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </main>
  );
}