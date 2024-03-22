import { Dispatch } from "redux"
import { setAppStatusAC } from "../../app/app-reducer"
import { authAPI, FieldErrorType, LoginParamsType } from "../../api/todolists-api"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

export const loginTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, {
  rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] }
}>("auth/login", async (param: LoginParamsType, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const res = await authAPI.login(param)

    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }))
      return { isLoggedIn: true }
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
    }
  } catch (err) {
    const error: AxiosError = err
    handleServerNetworkError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
  }
})

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  },
  extraReducers: builder => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoggedIn = action.payload.isLoggedIn
      }
    })
  }
})

export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions

// thunks
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ isLoggedIn: false }))
        dispatch(setAppStatusAC({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
