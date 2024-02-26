import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@mui/material'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import Delete from '@mui/icons-material/Delete'
import {TaskStatuses, TaskType} from "../../../../api/todolists-api"
import {RequestStatusType} from "../../../../app/app-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    entityStatus: RequestStatusType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const onRemoveHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id,
            e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId])
    const onTitleChangeHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }, [props.task.id, props.todolistId])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                color="secondary"
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}
                disabled={props.entityStatus === 'loading'}
            />
            <EditableSpan disabled={props.entityStatus === 'loading'} title={props.task.title} changeTaskTitle={onTitleChangeHandler}/>
            <IconButton disabled={props.entityStatus === 'loading'} aria-label="delete" onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})