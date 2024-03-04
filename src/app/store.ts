import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {TasksActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {thunk, ThunkDispatch} from "redux-thunk"
import {AppActionsType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export type ActionType = TasksActionsType | TodolistsActionsType | AppActionsType | AuthActionsType

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, any, ActionType>>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store