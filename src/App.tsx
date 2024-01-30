import React, {useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid'
import {AddItemForm} from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
import {Menu} from '@mui/icons-material'
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api"
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer"


export type TasksStateType = {
  [key: string]: TaskType[]
}

function App() {
  const todolistId1 = v1()
  const todolistId2 = v1()
  let [todolists, setTodolists] = useState<TodolistDomainType[]>([
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
  ])
  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        todoListId: todolistId1,
        addedDate: '',
        startDate: '',
        deadline: '',
        priority: TaskPriorities.Low,
        order: 0,
        completed: true,
        description: ''
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: todolistId1,
        addedDate: '',
        startDate: '',
        deadline: '',
        priority: TaskPriorities.Low,
        order: 0,
        completed: true,
        description: ''
      },

    ],
    [todolistId2]: [
      {
        id: v1(),
        title: 'Book',
        status: TaskStatuses.New,
        todoListId: todolistId2,
        addedDate: '',
        startDate: '',
        deadline: '',
        priority: TaskPriorities.Low,
        order: 0,
        completed: true,
        description: ''
      },
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatuses.Completed,
        todoListId: todolistId2,
        addedDate: '',
        startDate: '',
        deadline: '',
        priority: TaskPriorities.Low,
        order: 0,
        completed: true,
        description: ''
      },
    ],
  })

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(el => el.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasks({...tasksObj})
  }

  function addTask(title: string, todolistId: string) {
    let task = {
      id: v1(),
      title: title,
      status: TaskStatuses.New,
      todoListId: todolistId2,
      addedDate: '',
      startDate: '',
      deadline: '',
      priority: TaskPriorities.Low,
      order: 0,
      completed: true,
      description: ''
    }
    let tasks = tasksObj[todolistId]
    tasksObj[todolistId] = [task, ...tasks]
    setTasks({...tasksObj})
  }

  function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
    let tasks = tasksObj[todolistId]
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      task.status = status
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
    let newTodolist: TodolistDomainType = {id: v1(), title, filter: 'all', addedDate: '', order: 0}
    setTodolists([newTodolist, ...todolists])
    setTasks({[newTodolist.id]: [], ...tasksObj})
  }

  function changeTodolistTitle(todolistId: string, title: string) {
    return setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
  }

  function removeTodolist(todolistId: string) {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists([...filteredTodolist])
    delete tasksObj[todolistId]
    setTasks({...tasksObj})
  }

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
                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
              }
              if (tl.filter === 'active') {
                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
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

export default App
