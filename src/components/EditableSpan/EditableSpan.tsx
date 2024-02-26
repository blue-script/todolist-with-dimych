import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (title: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan is called')
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const activeEditMode = () => {
        if (!props.disabled) {
            setEditMode(true)
            setTitle(props.title)
        }
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.changeTaskTitle(title)
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return editMode
        ?
        <TextField variant='standard' value={title} onChange={onChangeTitleHandler} onBlur={activeViewMode} autoFocus/>
        : <span onDoubleClick={activeEditMode}>{props.title}</span>
})