import React, {ChangeEvent} from 'react'
import {FilterValuesType} from './App'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import Delete from '@mui/icons-material/Delete';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string,) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter('all', props.id)
  const onActiveClickHandler = () => props.changeFilter('active', props.id)
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  const changeTodolistTitle = (title: string)=> {
    props.changeTodolistTitle(props.id, title)
  }
  return (
    <div>
      <h3><EditableSpan title={props.title} changeTaskTitle={changeTodolistTitle}/>
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <Delete fontSize="inherit" />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      <ul>
        {props.tasks.map(t => {
          const onRemoveHandler = () => props.removeTask(t.id, props.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
          }

          const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id,title, props.id)
          }
          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeHandler}
              />
              <EditableSpan title={t.title} changeTaskTitle={changeTaskTitle}/>
              <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <Delete />
              </IconButton>
            </li>
          )
        })}
      </ul>
      <div>
        <Button
          color={'info'}
          variant={props.filter === 'all' ? 'contained' : 'text'}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color='primary'
          variant={props.filter === 'active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color='secondary'
          variant={props.filter === 'completed' ? 'contained' : 'text'}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}


