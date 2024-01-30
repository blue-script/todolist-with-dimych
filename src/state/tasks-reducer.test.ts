import {
  addTaskAC,
  addTodolistAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer
} from './tasks-reducer'
import {TasksStateType} from '../App'
import {v1} from 'uuid'
import {TaskPriorities, TaskStatuses} from "../api/todolists-api"

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
  const action = addTaskAC('juce', 'todolistId2')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
  const action = changeTaskTitleAC('2', 'Yo', 'todolistId2')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].title).toBe('JS')
  expect(endState['todolistId2'][1].title).toBe('Yo')
})

test('new array should be added when new todolist is added', () => {
  const action = addTodolistAC('new todolist', v1())
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

