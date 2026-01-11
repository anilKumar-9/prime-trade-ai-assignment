import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function AdminTasks() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔐 Admin protection
  if (!user) return <Navigate to='/login' />;
  if (user.role !== 'ADMIN') return <Navigate to='/user/tasks' />;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks'); // ADMIN → all tasks
        setTasks(res.data.data || []);
      } catch (err) {
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className='min-h-screen bg-bg p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>📋 Admin Tasks</h1>

          <Link
            to='/admin/create-task'
            className='bg-accent text-black px-4 py-2 rounded font-semibold'
          >
            + Create Task
          </Link>
        </div>

        {loading && <p>Loading tasks...</p>}
        {error && <p className='error-box'>{error}</p>}
        {!loading && tasks.length === 0 && <p>No tasks found</p>}

        <div className='grid gap-4'>
          {tasks.map((task) => (
            <div key={task._id} className='card'>
              <div className='flex justify-between items-center mb-2'>
                <h3 className='text-lg font-semibold'>{task.title}</h3>

                <span className='text-xs px-3 py-1 rounded bg-slate-700 text-slate-200'>
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className='text-muted mb-3'>
                {task.description || 'No description'}
              </p>

              <div className='text-sm'>
                <p>
                  Assigned to:{' '}
                  <span className='font-semibold'>
                    {task.userId?.name || 'Unknown User'}
                  </span>
                </p>
                <p className='text-xs text-muted'>{task.userId?.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
