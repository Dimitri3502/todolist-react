import Client from './client';
import { TaskDTO } from './dto/task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

export class TaskAPI {
  public static async getAll(): Promise<TaskDTO[]> {
    const response = await Client.get('/tasks');

    return response.data;
  }

  public static async createOne(createTaskDto: CreateTaskDTO) {
    const response = await Client.post('/tasks', JSON.stringify(createTaskDto), {
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data;
  }

  public static async deleteOne(taskId: number) {
    const response = await Client.delete('/tasks/' + taskId);

    return response.data;
  }

  public static async editOne(taskId: number, updateTaskDto: UpdateTaskDTO) {
    const response = await Client.put('/tasks/' + taskId, JSON.stringify(updateTaskDto), {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data;
  }
}