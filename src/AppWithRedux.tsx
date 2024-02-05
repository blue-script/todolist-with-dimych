import React, {useCallback, useEffect} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
import {Menu} from '@mui/icons-material'
import {
  addTodolistAC, addTodolistTC,
  changeTodolisFiltertAC,
  changeTodolisTitletAC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistAC, removeTodolistTC,
  TodolistDomainType
} from './state/todolists-reducer'
import {addTaskAC, addTaskTC, changeTaskStatusAC, changeTaskTitleAC, removeTaskTC} from './state/tasks-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {ActionType, AppRootStateType} from './state/store'
import {TaskStatuses, TaskType} from "./api/todolists-api"
import {ThunkDispatch} from "redux-thunk"

export type TasksStateType = {
  [key: string]: TaskType[]
}

function AppWithRedux() {
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
    dispatch(changeTaskStatusAC(taskId, status, todolistId))
  }, [dispatch])

  const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(taskId, title, todolistId))
  }, [dispatch])

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolisFiltertAC(value, todolistId))
  }, [dispatch])

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  }, [dispatch])

  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolisTitletAC(todolistId, title))
  }, [dispatch])

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch])

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <Menu/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}
          >
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
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
      </Container>
    </div>
  )
}

export default AppWithRedux
