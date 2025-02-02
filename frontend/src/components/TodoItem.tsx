import React from 'react';
import { Check, Edit2, Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggleStatus: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggleStatus, onEdit, onDelete }: TodoItemProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 ${
      todo.status === 'completed' ? 'border-green-500' : 'border-yellow-500'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${
            todo.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
          }`}>
            {todo.title}
          </h3>
          <p className="text-gray-600 mt-1">{todo.description}</p>
          <p className="text-sm text-gray-500 mt-2">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleStatus(todo.id)}
            className="p-2 text-gray-500 hover:text-green-600 transition-colors"
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => onEdit(todo)}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}