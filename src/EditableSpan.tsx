import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
  title: string
  changeTaskTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState('')
  const activeEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activeViewMode = () => {
    setEditMode(false)
      props.changeTaskTitle(title)
  }
  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  return editMode
    ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activeViewMode} autoFocus />
    : <span onDoubleClick={activeEditMode}>{props.title}</span>
}