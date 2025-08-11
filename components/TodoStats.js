/* EXPORTS: TodoStats */

import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, Target } from 'lucide-react';

const TodoStats = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const stats = [
    {
      id: 'total',
      label: 'Total Tasks',
      value: totalTodos,
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      id: 'completed',
      label: 'Completed',
      value: completedTodos,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      id: 'pending',
      label: 'Pending',
      value: pendingTodos,
      icon: Circle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      id: 'rate',
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: Clock,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.320, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        
        return (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative p-4 rounded-xl border backdrop-blur-md
              bg-white/5 ${stat.borderColor}
              hover:bg-white/10 transition-colors duration-300
              group cursor-default
            `}
          >
            {/* Background gradient overlay */}
            <div className={`
              absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
              transition-opacity duration-300 ${stat.bgColor}
            `} />
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-between mb-2">
              <IconComponent className={`w-5 h-5 ${stat.color}`} />
              <motion.div
                key={stat.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`text-2xl font-bold ${stat.color}`}
              >
                {stat.value}
              </motion.div>
            </div>
            
            <p className="text-sm text-gray-300 font-medium">
              {stat.label}
            </p>
            
            {/* Progress bar for completion rate */}
            {stat.id === 'rate' && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export { TodoStats };