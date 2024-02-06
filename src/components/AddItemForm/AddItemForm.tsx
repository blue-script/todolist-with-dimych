import {Button, IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Add} from '@mui/icons-material';

type AddItemFormPropsType = {
  addItem: (newTaskTitle: string) => void
}

export const AddItemForm = React.memo ((props: AddItemFormPropsType) => {
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
    <TextField
      variant="outlined"
      label="Enter value"
      value={newTaskTitle}
      onChange={onNewTitleChangeHandler}
      onKeyPress={onKeyPressHandler}
      error={!!error}
      helperText={error}
    />
    <IconButton onClick={addItem} color="primary">
      <Add />
    </IconButton>
  </div>
})