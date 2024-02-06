import React, {useCallback, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {ActionType, AppRootStateType} from "../../app/store"
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType
} from "./todolists-reducer"
import {addTaskTC, changeTaskTC, removeTaskTC, TasksStateType} from "./tasks-reducer"
import {ThunkDispatch} from "redux-thunk"
import {TaskStatuses} from "../../api/todolists-api"
import {Grid, Paper} from "@mui/material"
import {AddItemForm} from "../../components/AddItemForm/AddItemForm"
import {Todolist} from "./Todolist"

export const TodolistsList: React.FC = () => {
  const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const dispatch: ThunkDispatch<AppRootStateType, any, ActionType> = useDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  const removeTask = useCallback((id: string, todolistId: string) => {
    dispatch(removeTaskTC(todolistId, id))
  }, [dispatch])
  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskTC(todolistId, title))
  }, [dispatch])
  const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
    dispatch(changeTaskTC(taskId, {status}, todolistId))
  }, [dispatch])
  const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
    dispatch(changeTaskTC(taskId, {title}, todolistId))
  }, [dispatch])
  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(value, todolistId))
  }, [dispatch])
  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  }, [dispatch])
  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolistTitleTC(todolistId, title))
  }, [dispatch])
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch])

  return <>
    <Grid container style={{padding: '20px'}}>
      <AddItemForm addItem={addTodolist}/>
    </Grid>
    <Grid container spacing={3}>
      {
        todolists.map(tl => {
          let tasksForTodolist = tasks[tl.id]
          return (
            <Grid key={tl.id} item>
              <Paper style={{padding: '10px'}}>
                <Todolist
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
                />
              </Paper>
            </Grid>
          )
        })
      }
    </Grid>
  </>
}