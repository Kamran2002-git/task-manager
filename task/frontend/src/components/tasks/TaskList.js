import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      fetchTasks();
    } catch (err) {
      setError('Failed to update task status');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-manager">
      <TaskForm onTaskAdded={fetchTasks} />
      
      <div className="task-columns">
        <div className="task-column">
          <h3>To Do</h3>
          {tasks
            .filter(task => task.status === 'todo')
            .map(task => (
              <div key={task._id} className={`task-card priority-${task.priority}`}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button onClick={() => handleDelete(task._id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="task-column">
          <h3>In Progress</h3>
          {tasks
            .filter(task => task.status === 'in-progress')
            .map(task => (
              <div key={task._id} className={`task-card priority-${task.priority}`}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button onClick={() => handleDelete(task._id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="task-column">
          <h3>Completed</h3>
          {tasks
            .filter(task => task.status === 'completed')
            .map(task => (
              <div key={task._id} className={`task-card priority-${task.priority}`}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button onClick={() => handleDelete(task._id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
