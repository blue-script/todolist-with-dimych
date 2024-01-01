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

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: TaskType[]
}

function AppWithReducers() {
  const todolistId1 = v1()
  const todolistId2 = v1()
  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ])
  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Redux', isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: 'Book', isDone: false},
      {id: v1(), title: 'Milk', isDone: true},
    ],
  })

  function removeTask(id: string, todolistId: string) {
    dispatchToTasksReducer(removeTaskAC(id, todolistId))
  }
  function addTask(title: string, todolistId: string) {
    dispatchToTasksReducer(addTaskAC(title, todolistId))
  }
  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId))
  }
  function changeTaskTitle(taskId: string, title: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(taskId,title,todolistId))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchToTodolistsReducer(changeTodolisFiltertAC(todolistId,value))
  }
  function addTodolist(title: string) {
    dispatchToTodolistsReducer(addTodolistAC(title))
  }
  function changeTodolistTitle(todolistId: string, title: string) {
    dispatchToTodolistsReducer(changeTodolisTitletAC(todolistId,title))
  }
  function removeTodolist(todolistId: string) {
    dispatchToTodolistsReducer(removeTodolistAC(todolistId))
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
              let tasksForTodolist = tasksObj[tl.id]
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

export default AppWithReducers
