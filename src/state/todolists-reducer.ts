import {v1} from 'uuid'
import {TodolistType} from "../api/todolists-api"

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
}
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValuesType
}
type ActionsType = RemoveTodolistActionType |
  AddTodolistActionType |
  ChangeTodolistTitleActionType |
  ChangeTodolistFilterActionType

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [
        {id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0},
        ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(tl => tl.id === action.id
        ? {...tl, title: action.title}
        : tl)
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(tl => tl.id === action.id
        ? {...tl, filter: action.filter}
        : tl)
    }
    default:
      return state
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolisTitletAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolisFiltertAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}