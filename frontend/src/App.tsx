import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TodoList } from './pages/TodoList';

function App() {
  // TODO: Add authentication check
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <TodoList />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;