import api from '../../api/api';
import { Task } from '../../types';

interface TaskExtraResponse {
  data: {
    data: {
      task: Task;
    }
  };
  status: boolean;
  message?: string;
}

// Create a detailed task
export const createDetailedTaskService = async (taskData: any): Promise<TaskExtraResponse> => {
  const response = await api.post<any, TaskExtraResponse>('/create-tasks', taskData);
  return response;
};

// Update a task (mark as complete)
export const updateTaskService = async (taskId: string, taskData: Task): Promise<TaskExtraResponse> => {
  const response = await api.put<any, TaskExtraResponse>(`/update-task/${taskId}`, taskData);
  return response;
};
