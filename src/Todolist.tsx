import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: FilterValuesType
}

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      addTasks()
    }
  }
  const addTasks = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim())
      setNewTaskTitle('')
    } else {
      setError('This field is required')
    }
  }
  const onAllClickHandler = () => props.changeFilter('all');
  const onActiveClickHandler = () => props.changeFilter('active');
  const onCompletedClickHandler = () => props.changeFilter('complete');


  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}
        />
        <button onClick={addTasks}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(t => {
            const onRemoveHandler = () => props.removeTask(t.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked)
            }

            return (
              <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeHandler}
                />
                <span>{t.title}</span>
                <button onClick={onRemoveHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
        </button>
        <button className={props.filter === 'complete' ? 'active-filter' : ''}
                onClick={onCompletedClickHandler}>Completed
        </button>
      </div>
    </div>
  )
}