import { todolistsAPI, TodolistType } from "../../api/todolists-api"
import { RequestStatusType, setAppStatusAC } from "../../app/app-reducer"
import { handleServerNetworkError } from "../../utils/error-utils"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export const fetchTodolistsTC = createAsyncThunk("todolists/fetchTodolists", async (param, {
  dispatch,
  rejectWithValue
}) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const res = await todolistsAPI.getTodolists()
    dispatch(setAppStatusAC({ status: "succeeded" }))
    return { todolists: res.data }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})
export const removeTodolistTC = createAsyncThunk("todolists/removeTodolist", async (param: { todolistId: string }, {
  dispatch
}) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  dispatch(changeTodolistEntityStatusAC({ id: param.todolistId, status: "loading" }))

  const res = await todolistsAPI.deleteTodolist(param.todolistId)
  dispatch(setAppStatusAC({ status: "succeeded" }))
  return { id: param.todolistId }
})
export const addTodolistTC = createAsyncThunk("todolists/addTodolist", async (title: string, {
  dispatch
}) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  const res = await todolistsAPI.createTodolist(title)
  dispatch(setAppStatusAC({ status: "succeeded" }))
  return { todolist: res.data.data.item }
})
export const changeTodolistTitleTC = createAsyncThunk("todolists/changeTodolistTitle", async (param: {
  id: string,
  title: string
}, { dispatch }) => {
  await todolistsAPI.updateTodolist(param.id, param.title)
  return { id: param.id, title: param.title }
})

const slice = createSlice({
  name: "todolists",
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
    changeTodolistFilterAC(state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string; status: RequestStatusType }>) {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].entityStatus = action.payload.status
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state.push({ ...tl, filter: "all", entityStatus: "idle" })
        })
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index > -1) {
          state.splice(index, 1)
        }
      })
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
  }
})

export const todolistsReducer = slice.reducer
export const { changeTodolistFilterAC, changeTodolistEntityStatusAC } = slice.actions

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
