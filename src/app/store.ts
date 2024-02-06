import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {TasksActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {thunk} from "redux-thunk"

export type ActionType = TasksActionsType | TodolistsActionsType

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

// @ts-ignore
window.store = store