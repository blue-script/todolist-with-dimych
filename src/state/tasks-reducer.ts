import {TasksStateType} from '../App'
import {v1} from 'uuid'
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  setTodolistsAC,
  SetTodolistsActionType
} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi} from "../api/todolists-api"
import {Dispatch} from "redux"

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  taskId: string
  todolistId: string
}
export type AddTaskActionType = {
  type: 'ADD-TASK'
  todolistId: string
  title: string
}
export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskId: string
  status: TaskStatuses
  todolistId: string
}
export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskId: string
  title: string
  todolistId: string
}
export type SetTasksActionType = {
  type: 'SET-TASKS'
  tasks: TaskType[]
  todolistId: string
}

export type TasksActionsType = RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {...state, [action.todolistId]: state[action.todolistId].filter(tl => tl.id !== action.taskId)}
    }
    case 'ADD-TASK': {
      return {
        ...state,
        [action.todolistId]:
          [
            {
              id: v1(), title: action.title,
              status: TaskStatuses.New,
              todoListId: action.todolistId,
              addedDate: '', startDate: '', deadline: '',
              priority: TaskPriorities.Low,
              order: 0, completed: true, description: ''
            },
            ...state[action.todolistId]
          ]
      }
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
          ? {...t, status: action.status}
          : t)
      }
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
          ? {...t, title: action.title}
          : t)
      }
    }
    case 'ADD-TODOLIST': {
      return {...state, [action.todolistId]: []}
    }
    case 'REMOVE-TODOLIST': {
      let {[action.id]: _, ...newState} = state
      return newState
    }
    case 'SET-TODOLISTS': {
      let copyState = {...state}
      action.todolists.forEach(tl => copyState[tl.id] = [])
      return copyState
    }
    case 'SET-TASKS':
      return {...state, [action.todolistId]: action.tasks}
    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', todolistId, title}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
export const addTodolistAC = (title: string, todolistId: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', title, todolistId}
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]): SetTasksActionType => {
  return {type: "SET-TASKS", todolistId, tasks}
}

export const fetchTasksTC = (todolistId: string)=>{
  return (dispatch: Dispatch) => {
    todolistsApi.getTasks(todolistId)
      .then(res=> dispatch(setTasksAC(todolistId, res.data.items)))
  }
}