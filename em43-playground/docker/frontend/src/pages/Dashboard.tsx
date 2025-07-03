import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask } from '../api';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  ChartBarIcon, 
  DocumentTextIcon,
  ClockIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { data: tasks = [], isLoading } = useQuery({ 
    queryKey: ['tasks'], 
    queryFn: getTasks 
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      setTitle('');
      setDescription('');
      setShowCreateForm(false);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ title, description, train: '[]', val: '[]' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your emergent model experiments and track their performance
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Experiment
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{tasks.length}</p>
              <p className="text-gray-600">Total Experiments</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrophyIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">
                {tasks.length > 0 ? Math.min(...tasks.map(t => t.bestFitness)).toFixed(4) : '—'}
              </p>
              <p className="text-gray-600">Best Fitness</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">
                {tasks.filter(t => t.bestFitness < 1e9).length}
              </p>
              <p className="text-gray-600">Active Experiments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Experiment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Experiment Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter a descriptive title for your experiment"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe the goals and methodology of your experiment"
              />
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                {createMutation.isPending ? 'Creating...' : 'Create Experiment'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Experiments List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Experiments</h2>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading experiments...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="p-8 text-center">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No experiments yet</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Your First Experiment
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {tasks.map((task: any) => (
              <Link
                key={task.taskId}
                to={`/app/tasks/${task.taskId}`}
                className="block p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                      {task.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {task.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <TrophyIcon className="h-4 w-4 mr-1" />
                        Best: {Number(task.bestFitness).toFixed(4)}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.bestFitness < 1e9 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {task.bestFitness < 1e9 ? 'Active' : 'New'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 