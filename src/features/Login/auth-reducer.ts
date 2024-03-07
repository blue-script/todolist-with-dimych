import {Dispatch} from "redux"
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";

const initialState: InitialStateType = {
    isLoggedIn: false,
}
export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) =>
    (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logIn(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError<ErrorType>) => {
                handleServerNetworkError(error, dispatch)
            })
    }
    export const logoutTC = () =>
    (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logOut()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false))
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
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {
    isLoggedIn: boolean
}
type ThunkDispatch = Dispatch<AuthActionsType | SetAppStatusActionType | SetAppErrorActionType>
type ErrorType = {
    message: string
}