import React from 'react';
import { Task } from '../types/api';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (task: Task, newStatus: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const priorityColors = {
    LOW: 'bg-blue-100 text-blue-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    PENDING: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-purple-100 text-purple-800',
    COMPLETED: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200 flex flex-col justify-between hover:shadow-lg transition-shadow">
      <div>
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{task.title}</h3>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        
        {task.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
          <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
          <span className={`font-medium px-2 py-0.5 rounded ${statusColors[task.status]}`}>
            {task.status.replace('_', ' ')}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task, e.target.value as Task['status'])}
            className="text-xs bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};