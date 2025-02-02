import React, { useState } from 'react';
import { Search, ListFilter } from 'lucide-react';
import { Todo } from '../types';
import { TodoItem } from '../components/TodoItem';
import { TodoForm } from '../components/TodoForm';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const handleAddTodo = (newTodo: Omit<Todo, 'id'>) => {
    const todo: Todo = {
      ...newTodo,
      id: Date.now().toString(),
    };
    setTodos([...todos, todo]);
  };

  const handleUpdateTodo = (updatedTodo: Omit<Todo, 'id'>) => {
    setTodos(todos.map(todo => 
      todo.id === editingTodo?.id 
        ? { ...updatedTodo, id: todo.id }
        : todo
    ));
    setEditingTodo(undefined);
  };

  const handleToggleStatus = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, status: todo.status === 'completed' ? 'pending' : 'completed' }
        : todo
    ));
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos
    .filter(todo => 
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(todo => 
      statusFilter === 'all' ? true : todo.status === statusFilter
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Todo App</h1>
        
        {editingTodo ? (
          <TodoForm 
            onSubmit={handleUpdateTodo}
            editingTodo={editingTodo}
            onCancel={() => setEditingTodo(undefined)}
          />
        ) : (
          <TodoForm onSubmit={handleAddTodo} />
        )}

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search todos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div className="relative">
            <ListFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'completed')}
              className="pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No todos found</p>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleStatus={handleToggleStatus}
                onEdit={setEditingTodo}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}