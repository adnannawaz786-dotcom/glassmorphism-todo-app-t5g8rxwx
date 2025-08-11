/* EXPORTS: TodoList as default */

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Trash2, Edit3, Check, X, Calendar, Clock } from 'lucide-react';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEditStart = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = () => {
    if (editText.trim()) {
      onEdit(editingId, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-400/30 bg-red-500/10';
      case 'medium':
        return 'border-yellow-400/30 bg-yellow-500/10';
      case 'low':
        return 'border-green-400/30 bg-green-500/10';
      default:
        return 'border-white/20 bg-white/5';
    }
  };

  const getPriorityDot = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-400';
      case 'medium':
        return 'bg-yellow-400';
      case 'low':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  };

  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <Calendar className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white/80 mb-2">No tasks yet</h3>
          <p className="text-white/60">Add your first task to get started!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.05,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            layout
            className={`
              backdrop-blur-xl border rounded-2xl p-4 shadow-2xl
              transition-all duration-300 hover:scale-[1.02]
              ${todo.completed 
                ? 'bg-white/5 border-white/10' 
                : `${getPriorityColor(todo.priority)}`
              }
            `}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggle(todo.id)}
                className={`
                  flex-shrink-0 w-6 h-6 rounded-full border-2 
                  flex items-center justify-center mt-1
                  transition-all duration-200
                  ${todo.completed
                    ? 'bg-emerald-500 border-emerald-400'
                    : 'border-white/30 hover:border-white/50'
                  }
                `}
              >
                <AnimatePresence>
                  {todo.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {editingId === todo.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleEditSave()}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 
                               text-white placeholder-white/50 focus:outline-none focus:ring-2 
                               focus:ring-blue-400/50 focus:border-blue-400/50"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleEditSave}
                        className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 
                                 border border-emerald-400/30 rounded-lg text-emerald-300 
                                 hover:bg-emerald-500/30 transition-colors text-sm"
                      >
                        <Check className="w-4 h-4" />
                        Save
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleEditCancel}
                        className="flex items-center gap-1 px-3 py-1 bg-red-500/20 
                                 border border-red-400/30 rounded-lg text-red-300 
                                 hover:bg-red-500/30 transition-colors text-sm"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`
                        text-lg leading-relaxed break-words
                        ${todo.completed 
                          ? 'text-white/50 line-through' 
                          : 'text-white/90'
                        }
                      `}>
                        {todo.text}
                      </p>
                      
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!todo.completed && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEditStart(todo)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <Edit3 className="w-4 h-4 text-white/60 hover:text-white/80" />
                            </motion.button>
                          </>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onDelete(todo.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Meta information */}
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityDot(todo.priority)}`} />
                        <span className="capitalize">{todo.priority || 'normal'}</span>
                      </div>
                      
                      {todo.createdAt && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(todo.createdAt)}</span>
                        </div>
                      )}
                      
                      {todo.category && (
                        <div className="px-2 py-1 bg-white/10 rounded-md">
                          {todo.category}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export { TodoList as default };