import {addTaskAC, addTodolistAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC} from './tasks-reducer'
import {TasksStateType} from '../../trash/App'
import {v1} from 'uuid'
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api"
import {setTodolistsAC} from "./todolists-reducer"

let startState: TasksStateType
beforeEach(() => {
  startState = {
    'todolistId1': [
      {
        id: '1', title: 'CSS', status: TaskStatuses.New,
        todoListId: "todolistId1",
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      },
      {
        id: '2', title: 'JS', status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      },
      {
        id: '3', title: 'React', status: TaskStatuses.New,
        todoListId: "todolistId1",
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      }
    ],
    'todolistId2': [
      {
        id: '1', title: 'bread', status: TaskStatuses.New,
        todoListId: "todolistId2",
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      },
      {
        id: '2', title: 'milk', status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      },
      {
        id: '3', title: 'tea', status: TaskStatuses.New,
        todoListId: "todolistId2",
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      }
    ]
  }
})

test('correct task should be deleted from correct array', () => {
  const action = removeTaskAC('2', 'todolistId2')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'].every(el => el.id != '2')).toBeTruthy()
  expect(endState).toEqual({
    'todolistId1': [
      {
        id: '1', title: 'CSS', status: TaskStatuses.New,
        todoListId: "todolistId1",
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      },
      {
        id: '2', title: 'JS', status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      },
      {
        id: '3', title: 'React', status: TaskStatuses.New,
        todoListId: "todolistId1",
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      }
    ],
    'todolistId2': [
      {
        id: '1', title: 'bread', status: TaskStatuses.New,
        todoListId: "todolistId2",
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      },
      {
        id: '3', title: 'tea', status: TaskStatuses.New,
        todoListId: "todolistId2",
        addedDate: '', startDate: '', deadline: '',
        priority: TaskPriorities.Low,
        order: 0, completed: true, description: ''
      }
    ]
  })
})

test('correct task should be added to correct array', () => {
  const action = addTaskAC({
    todoListId: 'todolistId2',
    id: v1(),
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    title: 'juce',
    description: '',
    addedDate: '',
    startDate: '',
    deadline: '',
    order: 0,
    completed: true
  })
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const action = updateTaskAC('2', {status: TaskStatuses.New}, 'todolistId2')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
  const action = updateTaskAC('2', {title: 'Yo'}, 'todolistId2')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].title).toBe('JS')
  expect(endState['todolistId2'][1].title).toBe('Yo')
})

test('new array should be added when new todolist is added', () => {
  const action = addTodolistAC({
    id: 'new td',
    title: 'New Todolist',
    order: 0,
    addedDate: ''
  })
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('empty arrays should be added then we set todolists', () => {
  const action = setTodolistsAC([
    {id: '1', title: 'title 1', order: 0, addedDate: ''},
    {id: '2', title: 'title 2', order: 0, addedDate: ''},
  ])

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toStrictEqual([])
  expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todolist', () => {
  const action = setTasksAC('todolistId1', startState['todolistId1'])

  const endState = tasksReducer({
    'todolistId2': [],
    'todolistId1': [],
  }, action)

  expect(endState['todolistId2'].length).toBe(0)
  expect(endState['todolistId1'].length).toBe(3)
})

