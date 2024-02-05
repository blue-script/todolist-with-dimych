import {
  addTodolistAC,
  changeTodolisFiltertAC,
  changeTodolisTitletAC, FilterValuesType,
  removeTodolistAC, setTodolistsAC, TodolistDomainType,
  todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid'

let startState: Array<TodolistDomainType>
beforeEach(()=>{
  let todolistId1 = v1()
  let todolistId2 = v1()

  startState = [
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
  ]
})

test('correct todolist should be removed', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: Array<TodolistDomainType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
  ]

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodolistDomainType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
  ]

  const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
  expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodolistDomainType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
  ]

  const action = changeTodolisTitletAC(todolistId2, newTodolistTitle)

  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed'

  const action = changeTodolisFiltertAC(newFilter, startState[1].id)

  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set to state', () => {
  const action = setTodolistsAC(startState)
  const endState = todolistsReducer([], action)

  expect(endState.length).toBe(2)
})
