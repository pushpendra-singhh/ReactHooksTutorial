import React, { createContext, useContext, useState } from 'react';

// Create theme context
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

// Create user context
const UserContext = createContext<{
  user: string | null;
  setUser: (user: string | null) => void;
}>({
  user: null,
  setUser: () => {},
});

// Theme provider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// User provider component
function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Header component using context
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  return (
    <div className={`p-4 rounded-lg mb-4 ${
      theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    }`}>
      <div className="flex justify-between items-center">
        <div>
          {user ? (
            <div className="flex items-center space-x-2">
              <span>Welcome, {user}!</span>
              <button
                onClick={() => setUser(null)}
                className="text-sm px-2 py-1 rounded bg-red-500 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <span>Please log in</span>
          )}
        </div>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded ${
            theme === 'dark' 
              ? 'bg-yellow-400 text-gray-900' 
              : 'bg-gray-800 text-white'
          }`}
        >
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </div>
  );
}

// Content component using context
function Content() {
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  return (
    <div className={`p-6 rounded-lg ${
      theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Content Area</h2>
      {!user && (
        <div className="space-y-4">
          <p>Login to see more content</p>
          <button
            onClick={() => setUser('John Doe')}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Login as John Doe
          </button>
        </div>
      )}
      {user && (
        <div className="space-y-4">
          <p>This is protected content visible only to logged-in users.</p>
          <p>Current theme: {theme}</p>
        </div>
      )}
    </div>
  );
}

// Main component
function UseContextDemo() {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">useContext Demo</h1>
          <div className="space-y-4">
            <Header />
            <Content />
          </div>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default UseContextDemo;