import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const hooks = [
  // Basic Hooks
  { id: 'usestate', name: 'useState', description: 'State management in functional components' },
  { id: 'useeffect', name: 'useEffect', description: 'Side effects in components' },
  { id: 'usecontext', name: 'useContext', description: 'Context consumption made easy' },
  { id: 'usereducer', name: 'useReducer', description: 'Complex state management' },
  { id: 'useref', name: 'useRef', description: 'Mutable references' },
  { id: 'usememo', name: 'useMemo', description: 'Memoized values' },
  { id: 'usecallback', name: 'useCallback', description: 'Memoized callbacks' },
  { id: 'uselayouteffect', name: 'useLayoutEffect', description: 'Synchronous effects' },
  { id: 'useimperativehandle', name: 'useImperativeHandle', description: 'Customized ref handling' },
  { id: 'usedebugvalue', name: 'useDebugValue', description: 'Custom hooks debugging' },
  
  // Advanced Hooks
  { id: 'usedeferredvalue', name: 'useDeferredValue', description: 'Defer updating less important parts' },
  { id: 'usetransition', name: 'useTransition', description: 'Mark state updates as transitions' },
  { id: 'useid', name: 'useId', description: 'Generate unique IDs' },
  { id: 'usesynexternalstore', name: 'useSyncExternalStore', description: 'Subscribe to external stores' },
  { id: 'useinsertioneffect', name: 'useInsertionEffect', description: 'CSS-in-JS style injection' }
];

function Home() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredHooks = useMemo(() => {
    return hooks.filter(hook => 
      hook.name.toLowerCase().includes(search.toLowerCase()) ||
      hook.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">React Hooks Explorer</h1>
        <p className="text-lg text-gray-600">
          Discover and learn about React's powerful hooks system
        </p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white 
                   placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 
                   focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search hooks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredHooks.map((hook) => (
          <div
            key={hook.id}
            onClick={() => navigate(`/${hook.id}`)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer 
                     transform transition duration-200 hover:scale-105 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">{hook.name}</h3>
            <p className="text-gray-600">{hook.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;