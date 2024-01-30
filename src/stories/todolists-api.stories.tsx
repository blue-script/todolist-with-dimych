import React, {ChangeEvent, useEffect, useState} from 'react'
import {Button} from "./Button"
import axios from "axios"
import {todolistsApi, UpdateTaskModelType} from "../api/todolists-api"

export default {
  title: 'API',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)

  const getTodolists = () => todolistsApi.getTodolists()
    .then(res => setState(res.data))

  return <div>{JSON.stringify(state)}
    <div>
      <button onClick={getTodolists}>get todolists</button>
    </div>
  </div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState('')

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onCreateTodolist = () => todolistsApi.createTodolists(title).then(res => setState(res.data))

  return <div>{JSON.stringify(state)}
    <div>
      <input type="text" value={title} onChange={onChangeTitle}/>
      <button onClick={onCreateTodolist}>create todolist</button>
    </div>
  </div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')

  const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
  const onDeleteTodolist = () => todolistsApi.deleteTodolist(todolistId)
    .then(res => setState(res.data))

  return <div>{JSON.stringify(state)}
    <div>
      <input type="text" placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistId}/>
      <button onClick={onDeleteTodolist}>delete</button>
    </div>
  </div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')
  const [title, setTitle] = useState('')

  const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  const onUpdateTodolist = () => todolistsApi.updateTodolist(todolistId, title)
    .then(res => setState(res.data))

  return <div>{JSON.stringify(state)}
    <div>
      <input type="text" placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistId}/>
      <input type="text" placeholder={'title'} value={title} onChange={onChangeTitle}/>
      <button onClick={onUpdateTodolist}>update todolist</button>
    </div>
  </div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')

  const changeTodolistId = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
  const onGetTasks = () => {
    todolistsApi.getTasks(todolistId)
      .then(res => setState(res.data))
  }

  return <div>{JSON.stringify(state)}
    <div>
      <input type="text" placeholder="todolistId" value={todolistId} onChange={changeTodolistId}/>
      <button onClick={onGetTasks}>get tasks</button>
    </div>
  </div>
}
export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')

  const deleteTask = () => {
    todolistsApi.deleteTask(todolistId, taskId)
      .then(res => setState(res.data))
  }
  const changeTodolistId = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
  const changeTaskId = (e: ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)

  return <div>{JSON.stringify(state)}
    <div>
      <input type="text" placeholder="todolistId" value={todolistId} onChange={changeTodolistId}/>
      <input type="text" placeholder="taskId" value={taskId} onChange={changeTaskId}/>
      <button onClick={deleteTask}>delete</button>
    </div>
  </div>
}
export const CreateTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskTitle, setTaskTitle] = useState('')
  const changeTodolistId = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
  const onCreateTasks = () => todolistsApi.createTask(todolistId, taskTitle)
    .then(res => setState(res.data))

  return <div>{JSON.stringify(state)}
    <div>
      <input type="text" placeholder="todolistId" value={todolistId} onChange={changeTodolistId}/>
      <input type="text" placeholder="taskTitle" value={taskTitle} onChange={onChangeTitle}/>
      <button onClick={onCreateTasks}>update task</button>
    </div>
  </div>
}
export const UpdateTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const [taskTitle, setTitle] = useState<string>('')
  const [taskDescription, setDescription] = useState<string>('')
  const [taskStatus, setStatus] = useState<number>(0)
  const [taskPriority, setPriority] = useState<number>(0)
  const [taskStartDate, setStartDate] = useState<string>('')
  const [taskDeadline, setDeadline] = useState<string>('')

  const changeTodolistId = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
  const changeTaskId = (e: ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)
  const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const changeTaskDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.currentTarget.value)
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => setStatus(+e.currentTarget.value)
  const changeTaskPriority = (e: ChangeEvent<HTMLInputElement>) => setPriority(+e.currentTarget.value)
  const changeTaskStartDate = (e: ChangeEvent<HTMLInputElement>) => setStartDate(e.currentTarget.value)
  const changeTaskDeadline = (e: ChangeEvent<HTMLInputElement>) => setDeadline(e.currentTarget.value)
  const onUpdateTasks = () => {
    const model: UpdateTaskModelType = {
      title: taskTitle,
      description: taskDescription,
      completed: true,
      status: taskStatus,
      priority: taskPriority,
      startDate: taskStartDate,
      deadline: taskDeadline,
    }

    todolistsApi.updateTask(todolistId, taskId, model)
      .then(res => setState(res.data))
  }

  return <div>{JSON.stringify(state)}
    <div>
      <input type="text" placeholder="todolistId" value={todolistId} onChange={changeTodolistId}/>
      <input type="text" placeholder="taskId" value={taskId} onChange={changeTaskId}/>
      <input type="text" placeholder="taskTitle" value={taskTitle} onChange={changeTaskTitle}/>
      <input type="text" placeholder="taskDescription" value={taskDescription} onChange={changeTaskDescription}/>
      <input type="number" placeholder="taskStatus" value={taskStatus} onChange={changeTaskStatus}/>
      <input type="number" placeholder="taskPriority" value={taskPriority} onChange={changeTaskPriority}/>
      <input type="text" placeholder="taskStartDate" value={taskStartDate} onChange={changeTaskStartDate}/>
      <input type="text" placeholder="taskDeadline" value={taskDeadline} onChange={changeTaskDeadline}/>
      <button onClick={onUpdateTasks}>update task</button>
    </div>
  </div>
}
