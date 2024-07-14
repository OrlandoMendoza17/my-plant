import supabase from "@/supabase";
import createHttpError from "http-errors";
import { CreateTask, TaskId, UpdateTask } from "../schemas/Tasks";

class TasksController {
  getAll = async () => {
    const { data: Tasks, error } = await supabase
      .from('Tasks')
      .select('*')
    return Tasks;
  }

  findOne = async (taskId: TaskId) => {
    const { data, error } = await supabase
      .from('Tasks')
      .select('*')
      .eq("taskId", taskId)

    if (data?.length) {
      return data
    } else {
      console.log('error', error)
      throw createHttpError.NotFound("Plant not found!")
    }
  }

  create = async (taskInfo: CreateTask) => {

    const { data, error } = await supabase.from('Tasks')
      .insert([taskInfo])
      .select()

    if (error) {
      console.log('error', error)
      throw createHttpError.BadRequest(error.message)
    }

    return data;
  }
  
  update = async (taskInfo: UpdateTask) => {
    const { taskId, ...rest } = taskInfo
    if (taskId) {

      const foundTask = await this.findOne(taskId)
      console.log('foundTask', foundTask)

      if (foundTask) {
        const { data, error } = await supabase.from("Tasks")
          .update(rest)
          .eq("taskId", taskId)
          .select()

        console.log('data', data)

        if (error) {
          console.log('error', error)
          throw createHttpError.BadRequest(error.message)
        }

        return data;
      } else {
        throw createHttpError.NotFound("Task Not Found!")
      }
    }

  }

  delete = async (taskId: TaskId) => {
    const { data, error } = await supabase.from("Tasks")
      .delete()
      .eq("taskId", taskId)

    if (error) {
      console.log('error', error)
      throw createHttpError.BadRequest(error.message)
    }

    return data;
  }
}

export default TasksController;