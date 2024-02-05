import React, {useReducer} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid'
import {AddItemForm} from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
import {Menu} from '@mui/icons-material'
import {
  addTodolistAC,
  changeTodolisFiltertAC,
  changeTodolisTitletAC, FilterValuesType,
  removeTodolistAC,
  todolistsReducer
} from './state/todolists-reducer'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer'
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api"

export type TasksStateType = {
  [key: string]: TaskType[]
}

function AppWithReducers() {
  const todolistId1 = v1()
  const todolistId2 = v1()
  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
  ])
  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,
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
        id: v1(), title: 'JS', status: TaskStatuses.Completed,
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
        id: v1(), title: 'Book', status: TaskStatuses.New,
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
        id: v1(), title: 'Milk', status: TaskStatuses.Completed,
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
    dispatchToTasksReducer(removeTaskAC(id, todolistId))
  }

  function addTask(title: string, todolistId: string) {
    dispatchToTasksReducer(addTaskAC({
      todoListId: todolistId,
      id: v1(),
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      title: title,
      description: '',
      addedDate: '',
      startDate: '',
      deadline: '',
      order: 0,
      completed: true
    }))
  }

  function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
    dispatchToTasksReducer(changeTaskStatusAC(taskId, status, todolistId))
  }

  function changeTaskTitle(taskId: string, title: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(taskId, title, todolistId))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchToTodolistsReducer(changeTodolisFiltertAC(value, todolistId))
  }

  function removeTodolist(todolistId: string) {
    const action = removeTodolistAC(todolistId)
    dispatchToTodolistsReducer(action)
    dispatchToTasksReducer(action)
  }

  function changeTodolistTitle(todolistId: string, title: string) {
    dispatchToTodolistsReducer(changeTodolisTitletAC(todolistId, title))
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title)
    dispatchToTodolistsReducer(action)
    dispatchToTasksReducer(action)
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

export default AppWithReducers
