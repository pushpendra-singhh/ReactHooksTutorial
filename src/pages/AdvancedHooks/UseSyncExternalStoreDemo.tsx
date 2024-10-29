import React, { useSyncExternalStore } from 'react';

// Simple external store implementation
const createStore = <T,>(initialState: T) => {
  let state = initialState;
  const listeners = new Set<() => void>();

  return {
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => state,
    setState: (newState: T) => {
      state = newState;
      listeners.forEach(listener => listener());
    }
  };
};

// Create theme store
const themeStore = createStore<'light' | 'dark'>('light');

// Create counter store
const counterStore = createStore<number>(0);

function UseSyncExternalStoreDemo() {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot
  );

  const count = useSyncExternalStore(
    counterStore.subscribe,
    counterStore.getSnapshot
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useSyncExternalStore Demo</h1>

      <div className="space-y-8">
        {/* Theme Switcher */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Theme Switcher</h2>
          <div className="space-y-4">
            <div className={`p-4 rounded ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100'
            }`}>
              Current theme: {theme}
            </div>
            <button
              onClick={() => themeStore.setState(theme === 'light' ? 'dark' : 'light')}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Toggle Theme
            </button>
          </div>
        </div>

        {/* Counter */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Counter</h2>
          <div className="space-y-4">
            <div className="text-2xl font-bold">Count: {count}</div>
            <div className="flex space-x-2">
              <button
                onClick={() => counterStore.setState(count - 1)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Decrease
              </button>
              <button
                onClick={() => counterStore.setState(count + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Increase
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-medium mb-2">How it works:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>External stores manage state outside React</li>
            <li>Components subscribe to store changes</li>
            <li>Updates are synchronized with React's rendering</li>
            <li>Prevents tearing in concurrent rendering</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseSyncExternalStoreDemo;