import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../components/EditableSpan/EditableSpan'
import {Button, IconButton} from '@mui/material'
import Delete from '@mui/icons-material/Delete'
import {Task} from './Todolist/Task/Task'
import {TaskStatuses, TaskType} from "../../api/todolists-api"
import {FilterValuesType, TodolistDomainType} from "./todolists-reducer"
import {useDispatch} from "react-redux"
import {fetchTasksTC, TaskDomainType} from "./tasks-reducer"
import {ThunkDispatch} from "redux-thunk"
import {ActionType, AppRootStateType} from "../../app/store"


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskDomainType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string,) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {
    const dispatch: ThunkDispatch<AppRootStateType, any, ActionType> = useDispatch()

    useEffect(() => {
        if (demo) return
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    console.log('Todolist is called')
    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.changeFilter, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id, props.changeTodolistTitle])

    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} changeTaskTitle={changeTodolistTitle} disabled={props.todolist.entityStatus === 'loading'}/>
                <IconButton aria-label="delete" onClick={removeTodolist}
                            disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete fontSize="inherit"/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                {tasksForTodolist.map(t => <Task
                    key={t.id}
                    entityStatus={t.entityStatus}
                    task={t}
                    todolistId={props.todolist.id}
                    removeTask={props.removeTask}
                    changeTaskTitle={props.changeTaskTitle}
                    changeTaskStatus={props.changeTaskStatus}
                />)}
            </div>
            <div>
                <Button
                    color={'info'}
                    variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    color="primary"
                    variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    color="secondary"
                    variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
})

