import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">React Hooks Guide</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;