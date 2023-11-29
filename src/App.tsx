import React, { useState } from 'react'
import './App.css'
import { TaskType, Todolist } from './Todolist'
import { v1 } from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

function App() {
	function removeTask(id: string, todolistId: string) {
		let tasks = tasksObj[todolistId]
		let filteredTasks = tasks.filter(el => el.id !== id)
		tasksObj[todolistId] = filteredTasks
		setTasks({ ...tasksObj })
	}

	function addTask(title: string, todolistId: string) {
		let task = { id: v1(), title: title, isDone: false }
		let tasks = tasksObj[todolistId]
		let newTasks = [task, ...tasks]
		tasksObj[todolistId] = newTasks
		setTasks({ ...tasksObj })
	}

	function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
		let tasks = tasksObj[todolistId]
		const task = tasks.find(t => t.id === taskId)
		if (task) {
			task.isDone = isDone
			setTasks({ ...tasksObj })
		}
	}

	function changeFilter(value: FilterValuesType, todolistId: string) {
		let todolist = todolists.find(tl => tl.id === todolistId)
		if (todolist) {
			todolist.filter = value
			setTodolists([...todolists])
		}
	}

	const todolistId1 = v1()
	const todolistId2 = v1()

	let [todolists, setTodolists] = useState<Array<TodolistType>>([
		{ id: todolistId1, title: 'What to learn', filter: 'active' },
		{ id: todolistId2, title: 'What to buy', filter: 'completed' },
	])

	let removeTodolist = (todolistId: string) => {
		let filteredTodolist = todolists.filter(tl => tl.id !== todolistId) 
		setTodolists([...filteredTodolist])
		delete tasksObj[todolistId]
		setTasks({...tasksObj})
	}

	let [tasksObj, setTasks] = useState({
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Redux', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Book', isDone: false },
			{ id: v1(), title: 'Milk', isDone: true },
		],
	})

	return (
		<div className='App'>
			{todolists.map(tl => {
				let tasksForTodolist = tasksObj[tl.id]
				if (tl.filter === 'completed') {
					tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
				}
				if (tl.filter === 'active') {
					tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
				}
				return (
					<Todolist
						key={tl.id}
						id={tl.id}
						title={tl.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeStatus}
						filter={tl.filter}
						removeTodolist={removeTodolist}
					/>
				)
			})}
		</div>
	)
}

export default App
