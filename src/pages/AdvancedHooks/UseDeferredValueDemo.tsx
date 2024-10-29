import React, { useState, useDeferredValue, useMemo } from 'react';

// Simulated expensive list component
const ProductList = React.memo(({ searchText }: { searchText: string }) => {
  // Simulate expensive computation
  const products = useMemo(() => {
    console.log('Generating product list...');
    return Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Product ${i}`,
      description: `Description for product ${i}`
    })).filter(product => 
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  return (
    <div className="space-y-2">
      {products.map(product => (
        <div key={product.id} className="p-4 bg-white rounded shadow">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
      ))}
    </div>
  );
});

function UseDeferredValueDemo() {
  const [searchText, setSearchText] = useState('');
  const deferredSearchText = useDeferredValue(searchText);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useDeferredValue Demo</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Product Search</h2>
        
        <div className="mb-6">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search products..."
          />
          {searchText !== deferredSearchText && (
            <p className="mt-2 text-sm text-gray-600">Loading results...</p>
          )}
        </div>

        <div className="overflow-auto max-h-[600px]">
          <ProductList searchText={deferredSearchText} />
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">How it works:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Input updates immediately for responsive UI</li>
            <li>Product list updates are deferred during typing</li>
            <li>Prevents UI freezing during expensive filtering</li>
            <li>Shows loading indicator when value is deferred</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseDeferredValueDemo;