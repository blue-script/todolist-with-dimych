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

export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: D
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export type TaskType = {
  description: string
  title: string
  completed: boolean
  status: TaskStatuses
  priority: TaskPriorities
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

export type TasksResponseType<D = {}> = {
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

  createTask(todolistId: string, title: string) {
    return instance.post<TasksResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title})
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<TasksResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}