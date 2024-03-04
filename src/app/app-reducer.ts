import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => (
    {type: 'APP/SET-ERROR', error} as const
)
export const setAppStatusAC = (status: RequestStatusType) => (
    {type: 'APP/SET-STATUS', status} as const
)
export const setAppInitializedAC = (value: boolean) => (
    {type: 'APP/SET-IS-INITIALIZED', value} as const
)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            console.log(res)
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                console.log(0)
            } else {
                handleServerAppError(res.data, dispatch)
                console.log(1)
            }
            dispatch(setAppInitializedAC(true))
            console.log(2)
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error, dispatch)
        })
}

// type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили ит.д.)
    isInitialized: boolean
}
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>;
export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppInitializedActionType
type ErrorType = {
    message: string
}