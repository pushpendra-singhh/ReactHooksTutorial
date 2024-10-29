import React, { useReducer } from 'react';

// Define the state type
type State = {
  count: number;
  todos: { id: number; text: string; completed: boolean }[];
  loading: boolean;
  error: string | null;
};

// Define the action types
type Action =
  | { type: 'INCREMENT'; payload: number }
  | { type: 'DECREMENT'; payload: number }
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

// Initial state
const initialState: State = {
  count: 0,
  todos: [],
  loading: false,
  error: null,
};

// Reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + action.payload };
    case 'DECREMENT':
      return { ...state, count: state.count - action.payload };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

function UseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTodo = (text: string) => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useReducer Demo</h1>

      {/* Counter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Counter with Step</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch({ type: 'DECREMENT', payload: 1 })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Decrease
          </button>
          <span className="text-2xl font-bold">{state.count}</span>
          <button
            onClick={() => dispatch({ type: 'INCREMENT', payload: 1 })}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Increase
          </button>
        </div>
      </div>

      {/* Todo List Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Todo List</h2>
        
        {/* Add Todo Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem('todo') as HTMLInputElement;
            addTodo(input.value);
            input.value = '';
          }}
          className="mb-4"
        >
          <div className="flex space-x-2">
            <input
              type="text"
              name="todo"
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Add a new todo..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Add Todo
            </button>
          </div>
        </form>

        {/* Todo List */}
        <ul className="space-y-2">
          {state.todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {state.todos.length === 0 && (
          <p className="text-gray-500 text-center py-4">No todos yet. Add some!</p>
        )}
      </div>
    </div>
  );
}

export default UseReducerDemo;