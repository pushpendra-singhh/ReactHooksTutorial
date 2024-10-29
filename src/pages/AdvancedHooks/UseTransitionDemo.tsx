import React, { useState, useTransition, Suspense } from 'react';
import { Loader } from 'lucide-react';

// Simulated tab components with artificial delay
const TabContent = ({ tab }: { tab: string }) => {
  if (tab === 'loading') return null;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-medium mb-2">Content for {tab}</h3>
      <p className="text-gray-600">
        This content was loaded with useTransition to keep the UI responsive.
      </p>
    </div>
  );
};

function UseTransitionDemo() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const tabs = ['home', 'profile', 'settings', 'about'];

  const handleTabChange = (newTab: string) => {
    startTransition(() => {
      setTab(newTab);
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useTransition Demo</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4">
            {tabs.map((tabName) => (
              <button
                key={tabName}
                onClick={() => handleTabChange(tabName)}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  tab === tabName
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {isPending ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-6 h-6 text-indigo-500 animate-spin" />
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <TabContent tab={tab} />
            </Suspense>
          )}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">How it works:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Tab changes are marked as transitions</li>
            <li>UI remains responsive during content loading</li>
            <li>Loading states are handled gracefully</li>
            <li>Prevents unwanted loading indicators</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseTransitionDemo;