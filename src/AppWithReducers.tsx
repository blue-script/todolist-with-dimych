import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'
import {v1} from 'uuid'
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';

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
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(el => el.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasks({...tasksObj})
  }
  function addTask(title: string, todolistId: string) {
    let task = {id: v1(), title: title, isDone: false}
    let tasks = tasksObj[todolistId]
    let newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({...tasksObj})
  }
  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({...tasksObj})
    }
  }
  function changeTaskTitle(taskId: string, title: string, todolistId: string) {
    const editTasks = tasksObj[todolistId].map(t => t.id === taskId ? {...t, title} : t)
    setTasks({...tasksObj, [todolistId]: editTasks})
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }
  function addTodolist(title: string) {
    let newTodolist: TodolistType = {id: v1(), title, filter: 'all'}
    setTodolists([newTodolist, ...todolists])
    setTasks({[newTodolist.id]: [], ...tasksObj})
  }
  function changeTodolistTitle(todolistId: string, title: string) {
    return setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
  }
  function removeTodolist (todolistId: string) {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists([...filteredTodolist])
    delete tasksObj[todolistId]
    setTasks({...tasksObj})
  }

  const todolistId1 = v1()
  const todolistId2 = v1()
  let [todolists, setTodolists] = useState<TodolistType[]>([
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ])
  let [tasksObj, setTasks] = useState<TasksStateType>({
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
