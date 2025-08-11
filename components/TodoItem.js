/* EXPORTS: TodoItem */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit3, Check, X, Circle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

const TodoItem = ({ todo, onUpdate, onDelete, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-4 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(todo.id)}
          className="flex-shrink-0 text-blue-400 hover:text-blue-300 transition-colors"
        >
          {todo.completed ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </motion.button>

        {/* Todo Text / Edit Input */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              placeholder="Enter todo text..."
              autoFocus
            />
          ) : (
            <motion.p
              layout
              className={`text-white/90 transition-all duration-200 ${
                todo.completed 
                  ? 'line-through opacity-60' 
                  : 'opacity-100'
              }`}
              onClick={() => !todo.completed && setIsEditing(true)}
            >
              {todo.text}
            </motion.p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSave}
                className="h-8 w-8 p-0 text-green-400 hover:text-green-300 hover:bg-green-400/20"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  disabled={todo.completed}
                  className="h-8 w-8 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-400/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(todo.id)}
                  className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Priority Indicator */}
      {todo.priority && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
            todo.priority === 'high' 
              ? 'bg-red-400' 
              : todo.priority === 'medium' 
              ? 'bg-yellow-400' 
              : 'bg-green-400'
          }`}
        />
      )}

      {/* Glassmorphism shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </motion.div>
  );
};

export { TodoItem };