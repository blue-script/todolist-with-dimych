import React from 'react'
import {Provider} from "react-redux"
import {AppRootStateType} from "../app/store"
import {combineReducers, legacy_createStore} from "redux"
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer"
import {v1} from "uuid"
import {TaskPriorities, TaskStatuses} from "../api/todolists-api"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
    {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(), title: "HTML&CSS", todoListId: "todolistId1",
        status: TaskStatuses.New,
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      },
      {
        id: v1(), title: "JS", todoListId: "todolistId1",
        status: TaskStatuses.New,
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      }
    ],
    ["todolistId2"]: [
      {
        id: v1(), title: "Milk", todoListId: "todolistId2",
        status: TaskStatuses.New,
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      },
      {
        id: v1(), title: "React Book", todoListId: "todolistId2",
        status: TaskStatuses.New,
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      }
    ]
  }
}

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
