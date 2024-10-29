import React, { useInsertionEffect, useLayoutEffect, useEffect, useState } from 'react';

// Simulate dynamic style injection
const createStyleSheet = (color: string) => {
  const style = document.createElement('style');
  style.textContent = `
    .dynamic-box {
      background-color: ${color};
      transition: background-color 0.3s ease;
    }
  `;
  return style;
};

function UseInsertionEffectDemo() {
  const [color, setColor] = useState('#3B82F6');
  const [count, setCount] = useState(0);

  // useInsertionEffect for style injection
  useInsertionEffect(() => {
    const style = createStyleSheet(color);
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [color]);

  // useLayoutEffect for DOM measurements
  useLayoutEffect(() => {
    console.log('Layout effect executed');
  }, [color]);

  // useEffect for side effects
  useEffect(() => {
    console.log('Effect executed');
  }, [color]);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setColor(color);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useInsertionEffect Demo</h1>

      <div className="space-y-8">
        {/* Dynamic Styling Demo */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Dynamic Styling</h2>
          <div className="space-y-4">
            <div
              className="dynamic-box w-full h-32 rounded-lg shadow-inner flex items-center justify-center"
            >
              <span className="text-white font-medium">
                Current Color: {color}
              </span>
            </div>
            <button
              onClick={generateRandomColor}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Change Color
            </button>
          </div>
        </div>

        {/* Effect Order Demo */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Effect Order</h2>
          <div className="space-y-4">
            <button
              onClick={() => setCount(c => c + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Trigger Effects ({count})
            </button>
            <p className="text-sm text-gray-600">
              Check the console to see the order of effect execution
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-medium mb-2">How it works:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>useInsertionEffect runs before DOM mutations</li>
            <li>Perfect for injecting dynamic styles</li>
            <li>Prevents layout thrashing</li>
            <li>Executes before other effects</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseInsertionEffectDemo;