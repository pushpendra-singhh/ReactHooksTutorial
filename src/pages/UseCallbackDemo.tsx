import React, { useState, useCallback } from 'react';

// Child component that receives callbacks
const TodoItem = React.memo(({ 
  text, 
  onDelete 
}: { 
  text: string; 
  onDelete: () => void 
}) => {
  console.log(`TodoItem rendered: ${text}`);
  return (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
      <span>{text}</span>
      <button
        onClick={onDelete}
        className="px-3 py-1 text-red-500 hover:text-red-600"
      >
        Delete
      </button>
    </div>
  );
});

function UseCallbackDemo() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [count, setCount] = useState(0);

  // Memoized callback for deleting todos
  const handleDelete = useCallback((index: number) => {
    setTodos(prevTodos => prevTodos.filter((_, i) => i !== index));
  }, []);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos(prev => [...prev, newTodo]);
      setNewTodo('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useCallback Demo</h1>

      {/* Counter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Counter (Unrelated State)</h2>
        <div className="flex items-center space-x-4">
          <span className="text-lg">Count: {count}</span>
          <button
            onClick={() => setCount(c => c + 1)}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Increment
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          This counter's state changes won't cause TodoItem components to re-render
        </p>
      </div>

      {/* Todo List Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Todo List with Memoization</h2>
        
        <form onSubmit={addTodo} className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Add a new todo..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Todo
            </button>
          </div>
        </form>

        <div className="space-y-2">
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              text={todo}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No todos yet. Add some!
          </p>
        )}

        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">How it works:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>TodoItem components are memoized using React.memo</li>
            <li>Delete handlers are memoized using useCallback</li>
            <li>Counter updates won't trigger TodoItem re-renders</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseCallbackDemo;