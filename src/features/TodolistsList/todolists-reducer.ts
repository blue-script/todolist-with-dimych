import {todolistsApi, TodolistType} from "../../api/todolists-api"
import {Dispatch} from "redux"

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [{...action.todolist, filter: 'all'}, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case 'SET-TODOLISTS':
      return action.todolists.map(tl => ({...tl, filter: 'all'}))
    default:
      return state
  }
}

// actions
export const removeTodolistAC = (id: string) =>
  ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
  ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) =>
  ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({type: 'SET-TODOLISTS', todolists} as const)

// thunks
export const fetchTodolistsTC = () =>
  (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistsApi.getTodolists()
      .then(res => dispatch(setTodolistsAC(res.data)))
  }
export const removeTodolistTC = (todolistId: string) =>
  (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistsApi.deleteTodolist(todolistId)
      .then(res => res.data.resultCode === 0 && dispatch(removeTodolistAC(todolistId)))
  }
export const addTodolistTC = (title: string) =>
  (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistsApi.createTodolists(title)
      .then(res => dispatch(addTodolistAC(res.data.data.item)))
  }
export const changeTodolistTitleTC = (todolistId: string, title: string) =>
  (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistsApi.updateTodolist(todolistId, title)
      .then(res => dispatch(changeTodolistTitleAC(todolistId, title)))
  }

// types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type TodolistsActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistsActionType
export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}