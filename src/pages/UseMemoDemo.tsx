import React, { useState, useMemo } from 'react';

function UseMemoDemo() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [text, setText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Expensive calculation
  const expensiveCalculation = (nums: number[]): number => {
    console.log('Calculating...');
    return nums.reduce((acc, curr) => {
      // Artificial delay to simulate expensive operation
      const start = Date.now();
      while (Date.now() - start < 1) {}
      return acc + curr;
    }, 0);
  };

  // Memoized calculation
  const sum = useMemo(() => expensiveCalculation(numbers), [numbers]);

  // Memoized sorted numbers
  const sortedNumbers = useMemo(() => {
    console.log('Sorting numbers...');
    return [...numbers].sort((a, b) => b - a);
  }, [numbers]);

  const addNumber = () => {
    const num = Math.floor(Math.random() * 100);
    setNumbers([...numbers, num]);
  };

  return (
    <div className={`max-w-2xl mx-auto ${darkMode ? 'dark' : ''}`}>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useMemo Demo</h1>

      {/* Theme Toggle */}
      <div className="mb-8">
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Toggle Theme
        </button>
        <p className="mt-2 text-sm text-gray-600">
          Theme changes won't trigger expensive recalculations
        Continuing with the UseMemoDemo.tsx file content exactly where we left off:

        </p>
      </div>

      {/* Number List and Calculations */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Expensive Calculations Demo</h2>
        <div className="space-y-4">
          <button
            onClick={addNumber}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Random Number
          </button>
          
          <div>
            <h3 className="font-medium mb-2">Numbers:</h3>
            <div className="flex flex-wrap gap-2">
              {numbers.map((num, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 rounded">
                  {num}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Sorted Numbers (Memoized):</h3>
            <div className="flex flex-wrap gap-2">
              {sortedNumbers.map((num, index) => (
                <span key={index} className="px-2 py-1 bg-indigo-100 rounded">
                  {num}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium">Sum (Memoized):</h3>
            <p className="text-2xl font-bold">{sum}</p>
          </div>
        </div>
      </div>

      {/* Text Input (Non-memoized) */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Non-memoized Input</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type here (won't trigger recalculations)..."
        />
        <p className="mt-2 text-sm text-gray-600">
          This input's state changes won't trigger expensive recalculations
        </p>
      </div>
    </div>
  );
}

export default UseMemoDemo;