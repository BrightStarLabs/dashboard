import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTask, submitModel } from '../api';
import { useState } from 'react';
import { 
  ArrowLeftIcon,
  DocumentArrowUpIcon,
  TrophyIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function TaskDetail() {
  const { taskId = '' } = useParams();
  const queryClient = useQueryClient();
  const { data: task, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTask(taskId),
    enabled: !!taskId,
  });

  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  
  const submitMutation = useMutation({
    mutationFn: () => {
      if (!file) throw new Error('No file selected');
      return submitModel(taskId, file, notes);
    },
    onSuccess: () => {
      setFile(null);
      setNotes('');
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/json') {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading experiment...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 mb-4">Experiment not found</p>
        <Link
          to="/app"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/app"
          className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
          <p className="mt-2 text-gray-600">{task.description}</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <TrophyIcon className="h-4 w-4" />
          <span>Best: {Number(task.bestFitness).toFixed(4)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
              Submit Model
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragOver
                    ? 'border-blue-500 bg-blue-50'
                    : file
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {file ? (
                  <div className="text-center">
                    <DocumentArrowUpIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-green-700 font-medium">{file.name}</p>
                    <p className="text-green-600 text-sm">Ready to submit</p>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Drag & drop your JSON model file here, or
                    </p>
                    <label className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors">
                      <span>Browse files</span>
                      <input 
                        type="file" 
                        accept=".json" 
                        onChange={e => setFile(e.target.files?.[0] ?? null)}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">JSON files only</p>
                  </div>
                )}
              </div>

              {/* Notes Field */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Submission Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Add any notes about this submission (optional)"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!file || submitMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
              >
                {submitMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Model'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Leaderboard
              </h2>
            </div>
            
            {task.leaderboard && task.leaderboard.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {task.leaderboard.map((submission: any, index: number) => (
                  <div key={index} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                            index === 0 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : index === 1 
                              ? 'bg-gray-100 text-gray-800'
                              : index === 2
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-blue-50 text-blue-700'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            {submission.fitness.toFixed(6)}
                          </div>
                          {index === 0 && <TrophyIcon className="h-5 w-5 text-yellow-500" />}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {new Date(submission.submittedAt).toLocaleString()}
                        </div>
                        
                        {submission.notes && (
                          <div className="flex items-start text-sm text-gray-600">
                            <ChatBubbleLeftIcon className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                            <span>{submission.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No submissions yet</p>
                <p className="text-gray-500 text-sm">Be the first to submit a model!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
