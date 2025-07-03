const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

export async function getTasks() {
  const r = await fetch(`${API_BASE}/tasks`);
  if (!r.ok) throw new Error('Failed to fetch tasks');
  return r.json();
}

export async function createTask(data: {title: string; description: string; train: string; val: string}) {
  const r = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error('Failed to create task');
  return r.json();
}

export async function getTask(taskId: string) {
  const r = await fetch(`${API_BASE}/tasks/${taskId}`);
  if (!r.ok) throw new Error('Task not found');
  return r.json();
}

export async function submitModel(taskId: string, file: File, notes: string) {
  const formData = new FormData();
  formData.append('model', file);
  formData.append('notes', notes);
  const r = await fetch(`${API_BASE}/tasks/${taskId}/submit`, {
    method: 'POST',
    body: formData
  });
  if (!r.ok) throw new Error('Failed to submit model');
  return r.json();
}
