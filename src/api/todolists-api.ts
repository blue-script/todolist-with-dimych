import axios from "axios"

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "3c970724-72fc-43be-a259-df8ecc93f081"
  }
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings
})

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: D
}

export type TaskType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type GetTasksResponse = {
  items: TaskType[]
  totalCount: number
  error: string | null
}

type TasksResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
}

export type UpdateTaskModelType = {
  title: string
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
}

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists')
  },

  createTodolists(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
  },

  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },

  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
  },


  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<TasksResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<TasksResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },

  createTask(todolistId: string, title: string) {
    return instance.post<TasksResponseType>(`todo-lists/${todolistId}/tasks`, {title: title})
  }
}