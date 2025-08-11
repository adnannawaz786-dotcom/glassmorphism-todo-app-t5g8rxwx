/* EXPORTS: saveTodos, loadTodos, generateId, clearTodos, getStorageStats, isStorageAvailable */

/**
 * Local storage utility functions for todo persistence
 * Handles saving, loading, and managing todo data in browser storage
 */

const STORAGE_KEY = 'glassmorphism-todos';

/**
 * Save todos array to localStorage
 * @param {Array} todos - Array of todo objects to save
 * @returns {boolean} - Success status
 */
const saveTodos = (todos) => {
  try {
    if (typeof window === 'undefined') {
      return false; // Server-side rendering check
    }
    
    const todosData = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, todosData);
    return true;
  } catch (error) {
    console.error('Failed to save todos to localStorage:', error);
    return false;
  }
};

/**
 * Load todos array from localStorage
 * @returns {Array} - Array of todo objects or empty array if none found
 */
const loadTodos = () => {
  try {
    if (typeof window === 'undefined') {
      return []; // Server-side rendering check
    }
    
    const todosData = localStorage.getItem(STORAGE_KEY);
    
    if (!todosData) {
      return [];
    }
    
    const todos = JSON.parse(todosData);
    
    // Validate that the loaded data is an array
    if (!Array.isArray(todos)) {
      console.warn('Invalid todos data in localStorage, resetting to empty array');
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    
    // Validate each todo object has required properties
    const validTodos = todos.filter(todo => 
      todo && 
      typeof todo === 'object' && 
      typeof todo.id === 'string' && 
      typeof todo.text === 'string' && 
      typeof todo.completed === 'boolean'
    );
    
    // If some todos were invalid, save the cleaned array
    if (validTodos.length !== todos.length) {
      saveTodos(validTodos);
    }
    
    return validTodos;
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error);
    // Clear corrupted data
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    return [];
  }
};

/**
 * Generate a unique ID for new todos
 * @returns {string} - Unique identifier string
 */
const generateId = () => {
  return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Clear all todos from localStorage
 * @returns {boolean} - Success status
 */
const clearTodos = () => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear todos from localStorage:', error);
    return false;
  }
};

/**
 * Get storage usage information
 * @returns {Object} - Storage stats including item count and estimated size
 */
const getStorageStats = () => {
  try {
    if (typeof window === 'undefined') {
      return { count: 0, size: 0 };
    }
    
    const todos = loadTodos();
    const todosData = localStorage.getItem(STORAGE_KEY);
    const size = todosData ? todosData.length : 0;
    
    return {
      count: todos.length,
      size: size,
      sizeFormatted: `${(size / 1024).toFixed(2)} KB`
    };
  } catch (error) {
    console.error('Failed to get storage stats:', error);
    return { count: 0, size: 0, sizeFormatted: '0 KB' };
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean} - Whether localStorage is supported and available
 */
const isStorageAvailable = () => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

export { saveTodos, loadTodos, generateId, clearTodos, getStorageStats, isStorageAvailable };