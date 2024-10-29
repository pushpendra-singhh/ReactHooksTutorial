import React, { useRef, useState, useEffect } from 'react';

function UseRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Example of tracking renders without causing re-renders
  useEffect(() => {
    countRef.current += 1;
  });

  // Example of storing previous value
  const prevInputValueRef = useRef('');
  useEffect(() => {
    prevInputValueRef.current = inputValue;
  }, [inputValue]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const forceRender = () => {
    setRenderCount(prev => prev + 1);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useRef Demo</h1>

      {/* DOM Reference Example */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">DOM Reference Example</h2>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type something..."
            />
            <button
              onClick={focusInput}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Focus Input
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Click the button to focus the input field using useRef
          </p>
        </div>
      </div>

      {/* Render Count Example */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Render Count Example</h2>
        <div className="space-y-4">
          <p>Component has rendered: <span className="font-bold">{countRef.current}</span> times</p>
          <button
            onClick={forceRender}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Force Re-render
          </button>
          <p className="text-sm text-gray-600">
            The count persists between renders without causing re-renders itself
          </p>
        </div>
      </div>

      {/* Previous Value Example */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Previous Value Example</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type to see previous value..."
          />
          <div className="space-y-2">
            <p>Current value: <span className="font-bold">{inputValue}</span></p>
            <p>Previous value: <span className="font-bold">{prevInputValueRef.current}</span></p>
          </div>
          <p className="text-sm text-gray-600">
            useRef helps us remember the previous value between renders
          </p>
        </div>
      </div>
    </div>
  );
}

export default UseRefDemo;