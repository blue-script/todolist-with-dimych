import React, {useCallback} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
  addTodolistAC,
  changeTodolisFiltertAC,
  changeTodolisTitletAC,
  removeTodolistAC
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: TaskType[]
}

function AppWithRedux() {
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

  const removeTask = useCallback((id: string, todolistId: string) => {
    dispatch(removeTaskAC(id, todolistId))
  }, [dispatch])
  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId))
  }, [dispatch])
  const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
  }, [dispatch])
  const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(taskId, title, todolistId))
  }, [dispatch])
  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolisFiltertAC(value, todolistId))
  }, [dispatch])
  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  }, [dispatch])
  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolisTitletAC(todolistId, title))
  }, [dispatch])
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistAC(title))
  }, [dispatch])

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{mr: 2}}
          >
            <Menu/>
          </IconButton>
          <Typography variant='h6' component='div' sx={{flexGrow: 1}}
          >
            News
          </Typography>
          <Button color='inherit'>Login</Button>
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
