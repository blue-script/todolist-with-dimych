import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC, FilterValuesType,
  removeTodolistAC, setTodolistsAC, TodolistDomainType,
  todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid'
import {TodolistType} from "../../api/todolists-api"

let startState: Array<TodolistDomainType>
beforeEach(()=>{
  let todolistId1 = v1()
  let todolistId2 = v1()

  startState = [
    {id: todolistId1, title: 'What to learn', filter: 'all',entityStatus: 'idle', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all',entityStatus: 'idle', addedDate: '', order: 0}
  ]
})

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC(startState[0].id))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(startState[1].id)
})

test('correct todolist should be added', () => {
  let newTodolist: TodolistType = {
    id: 'new td',
    title: 'New Todolist',
    order: 0,
    addedDate: ''
  }

  const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolist.title)
  expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'
  const action = changeTodolistTitleAC(startState[1].id, newTodolistTitle)
  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed'

  const action = changeTodolistFilterAC(newFilter, startState[1].id)
  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set to state', () => {
  const action = setTodolistsAC(startState)
  const endState = todolistsReducer([], action)

  expect(endState.length).toBe(2)
})

