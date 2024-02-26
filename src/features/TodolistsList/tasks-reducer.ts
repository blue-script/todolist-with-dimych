import {
    AddTodolistActionType,
    FilterValuesType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer'
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
import {
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(tl => tl.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]}
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
            return {...state, [action.todolistId]: action.tasks.map(tk => ({...tk, entityStatus: 'idle'}))}
        case 'CHANGE-TASK-ENTITY-STATUS':
            return {...state, [action.todolistId]: state[action.todolistId].map(tk => tk.id === action.taskId ? {...tk, entityStatus: action.status} : tk)}
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
export const changeTaskEntityStatusAC = (taskId: string, status: RequestStatusType, todolistId: string) =>
    ({type: 'CHANGE-TASK-ENTITY-STATUS', taskId, status, todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: "SET-TASKS", todolistId, tasks} as const)

// thunks
export const fetchTasksTC = (todolistId: string) =>
    (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.getTasks(todolistId)
            .then(res => {
                console.log(res.data.error, typeof res.data.error)
                if (!res.data.error) {
                    dispatch(setTasksAC(todolistId, res.data.items))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    dispatch(setAppErrorAC(res.data.error))
                    dispatch(setAppStatusAC("failed"))
                }
            })
            .catch((error: AxiosError<ErrorType>) => {
                handleServerNetworkError(error, dispatch)
            })
    }
export const removeTaskTC = (todolistId: string, taskId: string) =>
    (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC(taskId,'loading', todolistId))
        todolistsApi.deleteTask(todolistId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todolistId))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError<ErrorType>) => {
                handleServerNetworkError(error, dispatch)
            })
    }
export const addTaskTC = (todolistId: string, title: string) =>
    (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError<ErrorType>) => {
                handleServerNetworkError(error, dispatch)
            })
    }
export const changeTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
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
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError<ErrorType>) => {
                handleServerNetworkError(error, dispatch)
            })
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
    | ReturnType<typeof changeTaskEntityStatusAC>
export type TasksStateType = {
    [key: string]: TaskDomainType[]
}
type ThunkDispatch = Dispatch<TasksActionsType
    | SetAppStatusActionType
    | SetAppErrorActionType>
type ErrorType = {
    message: string
}
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}