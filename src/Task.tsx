import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import Delete from '@mui/icons-material/Delete';
import {TaskType} from './Todolist';

type TaskPropsType = {
  task: TaskType
  todolistId: string
  removeTask: (taskId: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  const onRemoveHandler = () => props.removeTask(props.task.id, props.todolistId)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
  }

  const changeTaskTitle = (title: string) => {
    props.changeTaskTitle(props.task.id, title, props.todolistId)
  }
  return (
    <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
      <Checkbox
        color='secondary'
        checked={props.task.isDone}
        onChange={onChangeHandler}
      />
      <EditableSpan title={props.task.title} changeTaskTitle={changeTaskTitle}/>
      <IconButton aria-label='delete' onClick={onRemoveHandler}>
        <Delete/>
      </IconButton>
    </div>
  )
})