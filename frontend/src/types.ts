export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';
}

export interface User {
  name: string;
  email: string;
  phone: string;
}