import React from 'react'
import {Provider} from "react-redux"
import {AppRootStateType} from "../app/store"
import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer"
import {v1} from "uuid"
import {TaskPriorities, TaskStatuses} from "../api/todolists-api"
import {appReducer} from "../app/app-reducer";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'loading', addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", todoListId: "todolistId1",
                status: TaskStatuses.New, entityStatus: 'idle',
                addedDate: '', startDate: '', deadline: '',
                priority: TaskPriorities.Low,
                order: 0, completed: true, description: ''
            },
            {
                id: v1(), title: "JS", todoListId: "todolistId1",
                status: TaskStatuses.New, entityStatus: 'idle',
                addedDate: '', startDate: '', deadline: '',
                priority: TaskPriorities.Low,
                order: 0, completed: true, description: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", todoListId: "todolistId2",
                status: TaskStatuses.New, entityStatus: 'idle',
                addedDate: '', startDate: '', deadline: '',
                priority: TaskPriorities.Low,
                order: 0, completed: true, description: ''
            },
            {
                id: v1(), title: "React Book", todoListId: "todolistId2",
                status: TaskStatuses.New, entityStatus: 'idle',
                addedDate: '', startDate: '', deadline: '',
                priority: TaskPriorities.Low,
                order: 0, completed: true, description: ''
            }
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false,
    }
}

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
