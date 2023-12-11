import { Button } from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
  addItem: (newTaskTitle: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      addItem()
    }
  }
  const addItem = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim())
      setNewTaskTitle('')
    } else {
      setError('This field is required')
    }
  }

  return <div>
    <input
      value={newTaskTitle}
      onChange={onNewTitleChangeHandler}
      onKeyPress={onKeyPressHandler}
      className={error ? 'error' : ''}
    />
    <Button onClick={addItem} variant='contained' color='primary'>+</Button>
    {error && <div className={'error-message'}>{error}</div>}
  </div>
}