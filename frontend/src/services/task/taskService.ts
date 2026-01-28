import api from '../../api/api';
import { Task } from '../../types';


interface TaskResponse {
  data: {
    data: {
      tasks: Task[];
      task?: Task;
    };
    status: boolean;
    message?: string;
  };
  status: boolean;
  message?: string;
}

// Get all tasks
export const getTasksService = async (): Promise<TaskResponse> => {
  const response = await api.get<any, TaskResponse>('/get-tasks');
  console.log('get task serviceeeee', response);

  return response;
};

// Create a new task
export const addTaskService = async (taskData: { title: string; status: string }): Promise<TaskResponse> => {
  const response = await api.post<any, TaskResponse>('/add-task', taskData);
  return response;
};

// Delete a task by id
export const deleteTaskService = async (taskId: string): Promise<TaskResponse> => {
  const response = await api.delete<any, TaskResponse>(`/delete-task/${taskId}`);
  return response;
};
