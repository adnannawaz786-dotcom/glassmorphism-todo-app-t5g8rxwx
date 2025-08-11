/* EXPORTS: useTodos */

import { useState, useEffect, useCallback } from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    const loadTodos = () => {
      try {
        const savedTodos = localStorage.getItem('glassmorphism-todos');
        if (savedTodos) {
          const parsedTodos = JSON.parse(savedTodos);
          setTodos(parsedTodos);
        }
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('glassmorphism-todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to localStorage:', error);
      }
    }
  }, [todos, isLoading]);

  // Add a new todo
  const addTodo = useCallback((text) => {
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, []);

  // Toggle todo completion status
  const toggleTodo = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  }, []);

  // Delete a todo
  const deleteTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  // Edit todo text
  const editTodo = useCallback((id, newText) => {
    if (!newText.trim()) return;

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              text: newText.trim(),
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  }, []);

  // Clear all completed todos
  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);

  // Mark all todos as completed or uncompleted
  const toggleAll = useCallback(() => {
    const allCompleted = todos.every(todo => todo.completed);
    const updatedAt = new Date().toISOString();

    setTodos(prevTodos =>
      prevTodos.map(todo => ({
        ...todo,
        completed: !allCompleted,
        updatedAt,
      }))
    );
  }, [todos]);

  // Get filtered todos based on current filter
  const getFilteredTodos = useCallback(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Get todo statistics
  const getStats = useCallback(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;

    return {
      total,
      completed,
      active,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [todos]);

  // Search todos by text
  const searchTodos = useCallback((searchTerm) => {
    if (!searchTerm.trim()) return getFilteredTodos();

    const filtered = getFilteredTodos().filter(todo =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered;
  }, [getFilteredTodos]);

  // Reorder todos (for drag and drop functionality)
  const reorderTodos = useCallback((startIndex, endIndex) => {
    setTodos(prevTodos => {
      const result = Array.from(prevTodos);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      // Update the updatedAt timestamp for reordered items
      const updatedAt = new Date().toISOString();
      return result.map(todo => ({
        ...todo,
        updatedAt,
      }));
    });
  }, []);

  // Duplicate a todo
  const duplicateTodo = useCallback((id) => {
    const todoToDuplicate = todos.find(todo => todo.id === id);
    if (!todoToDuplicate) return;

    const duplicatedTodo = {
      ...todoToDuplicate,
      id: Date.now().toString(),
      text: `${todoToDuplicate.text} (Copy)`,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTodos(prevTodos => [duplicatedTodo, ...prevTodos]);
  }, [todos]);

  return {
    // State
    todos: getFilteredTodos(),
    allTodos: todos,
    filter,
    isLoading,
    
    // Actions
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    setFilter,
    searchTodos,
    reorderTodos,
    duplicateTodo,
    
    // Computed values
    stats: getStats(),
    hasCompletedTodos: todos.some(todo => todo.completed),
    hasTodos: todos.length > 0,
  };
};

export { useTodos };