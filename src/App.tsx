import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValuesType = "all" | "complete" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Redux", isDone: false}
  ]);
  let [filter, setFilter] = useState<FilterValuesType>("all")

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(el => el.id !== id)
    setTasks(filteredTasks)
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false}
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  function changeStatus(taskId: string, isDone: boolean) {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  let tasksForTodolist = tasks
  if (filter === "complete") {
    tasksForTodolist = tasks.filter(t => t.isDone)
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => !t.isDone)
  }


  return (
      <div className="App">
        <Todolist title={"What to learn"}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  filter={filter}
        />
      </div>
  );
}

export default App;