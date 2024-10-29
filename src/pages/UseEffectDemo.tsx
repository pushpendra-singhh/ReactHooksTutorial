import React, { useState, useEffect } from 'react';

function UseEffectDemo() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Effect for window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect for document title
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // Effect for fetching data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useEffect Demo</h1>

      <div className="space-y-8">
        {/* Window Width */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Window Width Tracker</h2>
          <p className="text-lg">Current window width: <span className="font-bold">{windowWidth}px</span></p>
          <p className="text-gray-600 text-sm mt-2">Try resizing your browser window!</p>
        </div>

        {/* Counter with Title Effect */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Document Title Updater</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCount(c => c + 1)}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Increment Count
            </button>
            <span className="text-lg">Count: {count}</span>
          </div>
          <p className="text-gray-600 text-sm mt-2">Check your browser tab title!</p>
        </div>

        {/* Data Fetching */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Data Fetching Example</h2>
          {loading ? (
            <div className="text-center py-4">Loading posts...</div>
          ) : (
            <ul className="space-y-4">
              {posts.map(post => (
                <li key={post.id} className="bg-gray-50 p-4 rounded">
                  <span className="font-medium">#{post.id}</span>
                  <p className="mt-1">{post.title}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default UseEffectDemo;