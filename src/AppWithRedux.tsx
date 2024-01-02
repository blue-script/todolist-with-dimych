import React, {useReducer, useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'
import {v1} from 'uuid'
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
  addTodolistAC,
  changeTodolisFiltertAC,
  changeTodolisTitletAC, removeTodolistAC,
  todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';

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
  const todolists = useSelector<AppRootState, Array<TodolistType>>(state=>state.todolists)
  const tasks = useSelector<AppRootState, TasksStateType>(state=>state.tasks)



  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId))
  }
  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId))
  }
  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
  }
  function changeTaskTitle(taskId: string, title: string, todolistId: string) {
    dispatch(changeTaskTitleAC(taskId,title,todolistId))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(changeTodolisFiltertAC(value, todolistId))
  }
  function removeTodolist(todolistId: string) {
    dispatch( removeTodolistAC(todolistId))
  }
  function changeTodolistTitle(todolistId: string, title: string) {
    dispatch(changeTodolisTitletAC(todolistId,title))
  }
  function addTodolist(title: string) {
    dispatch(addTodolistAC(title))
  }

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
              if (tl.filter === 'completed') {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
              }
              if (tl.filter === 'active') {
                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
              }
              return (
                <Grid item>
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
