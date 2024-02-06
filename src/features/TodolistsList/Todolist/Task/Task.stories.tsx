import {action} from "@storybook/addon-actions"
import {Task} from "./Task"
import React from "react"
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api"

export default {
  title: 'Task Component',
  component: Task,
}

const removeTaskCallback = action('Task removed')
const changeTaskTitleCallback = action('Title changed')
const changeTaskStatusCallback = action('Status changed')

export const TaskBaseExample = () => {
  return <>
    <Task
      key={'1'}
      task={{
        id: '1', title: 'css', todoListId: "todolistId1",
        status: TaskStatuses.Completed,
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      }}
      todolistId={'todolistId1'}
      removeTask={removeTaskCallback}
      changeTaskTitle={changeTaskTitleCallback}
      changeTaskStatus={changeTaskStatusCallback}
    />
    <Task
      key={'2'}
      task={{
        id: '2', title: 'JS', todoListId: "todolistId1",
        status: TaskStatuses.New,
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      }}
      todolistId={'todolistId2'}
      removeTask={removeTaskCallback}
      changeTaskTitle={changeTaskTitleCallback}
      changeTaskStatus={changeTaskStatusCallback}
    />
  </>

}