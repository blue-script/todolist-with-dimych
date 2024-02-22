import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsApi,
    TodolistType,
    UpdateTaskModelType
} from "../../api/todolists-api"
import {Dispatch} from "redux"
import {AppRootStateType} from "../../app/store"
import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from "../../app/app-reducer";

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(tl => tl.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS':
            return action.todolists.reduce((acc, tl) => {
                acc[tl.id] = []
                return acc
            }, {...state})
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: "SET-TASKS", todolistId, tasks} as const)

// thunks
export const fetchTasksTC = (todolistId: string) =>
    (dispatch: Dispatch<TasksActionsType | SetStatusActionType>) => {
        dispatch(setStatusAC('loading'))
        todolistsApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(todolistId, res.data.items))
                dispatch(setStatusAC("succeeded"))
            })
    }
export const removeTaskTC = (todolistId: string, taskId: string) =>
    (dispatch: Dispatch<TasksActionsType>) => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then(res => dispatch(removeTaskAC(taskId, todolistId)))
    }
export const addTaskTC = (todolistsId: string, title: string) =>
    (dispatch: Dispatch<TasksActionsType | SetErrorActionType | SetStatusActionType>) => {
        dispatch(setStatusAC('loading'))
        todolistsApi.createTask(todolistsId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setStatusAC("succeeded"))
                } else {
                    if (res.data.messages) {
                        dispatch(setErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setErrorAC('some error occurred'))
                    }
                    dispatch(setStatusAC("failed"))
                }
            })
    }
export const changeTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<TasksActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if (!task) {
            // throw new Error('task not found in the state')
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            description: task.description,
            completed: task.completed,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsApi.updateTask(todolistId, taskId, apiModel)
            .then(res => dispatch(updateTaskAC(taskId, domainModel, todolistId)))
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
export type TasksStateType = {
    [key: string]: TaskType[]
}