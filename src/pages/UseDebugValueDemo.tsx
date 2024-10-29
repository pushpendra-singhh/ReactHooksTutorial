import React, { useState, useDebugValue } from 'react';

// Custom hook for managing online status
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  
  // Add debug value for React DevTools
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return [isOnline, setIsOnline] as const;
}

// Custom hook for input with validation
function useInput(initialValue: string, validator?: (value: string) => boolean) {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (validator) {
      setIsValid(validator(newValue));
    }
  };

  // Add debug value with formatted object
  useDebugValue({ value, isValid }, (state) => 
    `Value: ${state.value} (${state.isValid ? 'Valid' : 'Invalid'})`
  );

  return { value, isValid, onChange };
}

function UseDebugValueDemo() {
  const [isOnline, setIsOnline] = useOnlineStatus();
  
  const emailValidator = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const emailInput = useInput('', emailValidator);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useDebugValue Demo</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Online Status Example</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span>Status: {isOnline ? 'Online' : 'Offline'}</span>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Toggle Status
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Email Validation Example</h2>
        <div className="space-y-4">
          <div>
            <input
              type="email"
              value={emailInput.value}
              onChange={emailInput.onChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                emailInput.isValid
                  ? 'border-gray-300 focus:ring-indigo-500'
                  : 'border-red-300 focus:ring-red-500'
              }`}
              placeholder="Enter your email..."
            />
            {!emailInput.isValid && (
              <p className="mt-1 text-sm text-red-500">
                Please enter a valid email address
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">Debug Information:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Open React DevTools to see debug values</li>
            <li>Custom hooks use useDebugValue for better debugging</li>
            <li>Check Components tab in DevTools</li>
            <li>Look for custom hook debug labels</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseDebugValueDemo;