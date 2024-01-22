import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import React from "react";

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
        task={{id: '1', isDone: true, title: 'css'}}
        todolistId={'todolistId1'}
        removeTask={removeTaskCallback}
        changeTaskTitle={changeTaskTitleCallback}
        changeTaskStatus={changeTaskStatusCallback}
    />
    <Task
        key={'2'}
        task={{id: '2', isDone: false, title: 'JS'}}
        todolistId={'todolistId2'}
        removeTask={removeTaskCallback}
        changeTaskTitle={changeTaskTitleCallback}
        changeTaskStatus={changeTaskStatusCallback}
    />
  </>

}