import {Button, IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Add} from '@mui/icons-material';

type AddItemFormPropsType = {
  addItem: (newTaskTitle: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo (({addItem, disabled = false}: AddItemFormPropsType) => {
  console.log('AddItemForm is called')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.charCode === 13) {
      addItemHandler()
    }
  }
  const addItemHandler = () => {
    if (newTaskTitle.trim() !== '') {
      addItem(newTaskTitle.trim())
      setNewTaskTitle('')
    } else {
      setError('This field is required')
    }
  }

  return <div>
    <TextField
      variant="outlined"
      label="Enter value"
      value={newTaskTitle}
      onChange={onNewTitleChangeHandler}
      onKeyPress={onKeyPressHandler}
      error={!!error}
      helperText={error}
      disabled={disabled}
    />
    <IconButton onClick={addItemHandler} color="primary" disabled={disabled}>
      <Add />
    </IconButton>
  </div>
})