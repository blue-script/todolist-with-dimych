import { authAPI } from "../api/todolists-api"
import { setIsLoggedInAC } from "../features/Login/auth-reducer"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

// thunk
export const initializeAppTC = createAsyncThunk("app/initializeApp", async (param, { dispatch }) => {
  const res = await authAPI.me()
  if (res.data.resultCode === 0) {
    dispatch(setIsLoggedInAC({ isLoggedIn: true }))
  } else {
  }

  return
})

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false
  },
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    }
  },
  extraReducers: builder => {
    builder.addCase(initializeAppTC.fulfilled, (state, action) => {
      state.isInitialized = true
    })
  }
})

export const appReducer = slice.reducer
export const { setAppErrorAC, setAppStatusAC } = slice.actions

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type appInitialState = ReturnType<typeof slice.getInitialState>
