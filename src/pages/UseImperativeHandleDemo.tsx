import React, { useImperativeHandle, useRef, forwardRef, useState } from 'react';

// Define the handle type
type CustomInputHandle = {
  focus: () => void;
  clear: () => void;
  setValue: (value: string) => void;
};

// Custom input component with imperative handle
const CustomInput = forwardRef<CustomInputHandle, {
  label: string;
  placeholder?: string;
}>((props, ref) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    clear: () => {
      setValue('');
    },
    setValue: (newValue: string) => {
      setValue(newValue);
    }
  }));

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={props.placeholder}
      />
    </div>
  );
});

function UseImperativeHandleDemo() {
  const inputRef = useRef<CustomInputHandle>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    inputRef.current?.clear();
  };

  const handleSetValue = () => {
    inputRef.current?.setValue('Hello from parent!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useImperativeHandle Demo</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Custom Input with Imperative Handle</h2>

        <div className="space-y-6">
          <CustomInput
            ref={inputRef}
            label="Custom Input"
            placeholder="Type something..."
          />

          <div className="flex space-x-4">
            <button
              onClick={handleFocus}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Focus Input
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Input
            </button>
            <button
              onClick={handleSetValue}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Set Value
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-medium mb-2">How it works:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>The CustomInput component exposes a custom imperative handle</li>
              <li>Parent can control the input through focus(), clear(), and setValue() methods</li>
              <li>Internal implementation details are hidden from the parent</li>
              <li>Only specified methods are accessible through the ref</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UseImperativeHandleDemo;