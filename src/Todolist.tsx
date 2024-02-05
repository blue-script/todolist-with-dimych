import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Button, IconButton} from '@mui/material'
import Delete from '@mui/icons-material/Delete'
import {Task} from './Task'
import {TaskStatuses, TaskType} from "./api/todolists-api"
import {FilterValuesType} from "./state/todolists-reducer"
import {useDispatch} from "react-redux"
import {fetchTasksTC} from "./state/tasks-reducer"
import {ThunkDispatch} from "redux-thunk"
import {ActionType, AppRootStateType} from "./state/store"


type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string,) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
  const dispatch: ThunkDispatch<AppRootStateType, any, ActionType> = useDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(props.id))
  }, [])

  console.log('Todolist is called')
  const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
  const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
  const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const addTask = useCallback((title: string) => {
    props.addTask(title, props.id)
  }, [props.addTask, props.id])

  const changeTodolistTitle = useCallback((title: string) => {
    props.changeTodolistTitle(props.id, title)
  }, [props.id, props.changeTodolistTitle])

  let tasksForTodolist = props.tasks
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
  }
  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
  }
  return (
    <div>
      <h3><EditableSpan title={props.title} changeTaskTitle={changeTodolistTitle}/>
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <Delete fontSize="inherit"/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      <div>
        {tasksForTodolist.map(t => <Task
          key={t.id}
          task={t}
          todolistId={props.id}
          removeTask={props.removeTask}
          changeTaskTitle={props.changeTaskTitle}
          changeTaskStatus={props.changeTaskStatus}
        />)}
      </div>
      <div>
        <Button
          color={'info'}
          variant={props.filter === 'all' ? 'contained' : 'text'}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === 'active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={props.filter === 'completed' ? 'contained' : 'text'}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})

