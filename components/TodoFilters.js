/* EXPORTS: TodoFilters */

import { motion } from 'framer-motion';

const TodoFilters = ({ currentFilter, onFilterChange, todoCounts }) => {
  const filters = [
    { key: 'all', label: 'All', count: todoCounts.total },
    { key: 'active', label: 'Active', count: todoCounts.active },
    { key: 'completed', label: 'Completed', count: todoCounts.completed }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="relative"
    >
      {/* Glassmorphism container */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
        {/* Filter buttons container */}
        <div className="flex items-center justify-center space-x-2">
          {filters.map((filter, index) => (
            <motion.button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                currentFilter === filter.key
                  ? 'text-white bg-gradient-to-r from-purple-500/80 to-pink-500/80 shadow-lg shadow-purple-500/25'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>{filter.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  currentFilter === filter.key
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-gray-400'
                }`}>
                  {filter.count}
                </span>
              </span>
              
              {/* Active filter background glow */}
              {currentFilter === filter.key && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm"
                  layoutId="filterGlow"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Filter summary text */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm">
            {currentFilter === 'all' && `Showing all ${todoCounts.total} tasks`}
            {currentFilter === 'active' && `${todoCounts.active} tasks remaining`}
            {currentFilter === 'completed' && `${todoCounts.completed} tasks completed`}
          </p>
        </motion.div>

        {/* Progress indicator for completed tasks */}
        {todoCounts.total > 0 && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${todoCounts.total > 0 ? (todoCounts.completed / todoCounts.total) * 100 : 0}%` 
                }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Progress</span>
              <span>
                {todoCounts.total > 0 
                  ? Math.round((todoCounts.completed / todoCounts.total) * 100)
                  : 0
                }%
              </span>
            </div>
          </motion.div>
        )}

        {/* Decorative elements */}
        <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-xl" />
        <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-full blur-xl" />
      </div>
    </motion.div>
  );
};

export { TodoFilters };