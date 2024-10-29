import React, { useState, useLayoutEffect, useRef } from 'react';

function UseLayoutEffectDemo() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Measure and update dimensions synchronously
  useLayoutEffect(() => {
    if (elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setWidth(Math.round(width));
      setHeight(Math.round(height));
    }
  }, []);

  // Position tooltip synchronously to prevent flicker
  useLayoutEffect(() => {
    if (elementRef.current && tooltipRef.current) {
      const elementRect = elementRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      tooltipRef.current.style.left = `${elementRect.left + elementRect.width / 2 - tooltipRect.width / 2}px`;
      tooltipRef.current.style.top = `${elementRect.top - tooltipRect.height - 10}px`;
    }
  }, [width, height]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useLayoutEffect Demo</h1>

      {/* Element Measurement Example */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Element Measurement</h2>
        <div
          ref={elementRef}
          className="bg-indigo-100 p-8 rounded relative"
        >
          <p className="text-center">This element's dimensions are measured using useLayoutEffect</p>
          <div
            ref={tooltipRef}
            className="absolute bg-gray-800 text-white px-3 py-1 rounded text-sm"
            style={{ position: 'fixed' }}
          >
            Width: {width}px, Height: {height}px
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          The tooltip position is calculated synchronously to prevent visual flicker
        </p>
      </div>

      {/* Animation Example */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Animation Example</h2>
        <div className="relative h-40 bg-gray-100 rounded overflow-hidden">
          <div
            className="absolute bg-indigo-500 w-20 h-20 rounded"
            style={{
              animation: 'slide 2s infinite',
            }}
          />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          useLayoutEffect ensures smooth animations by performing measurements before paint
        </p>
        <style jsx>{`
          @keyframes slide {
            0% { left: 0; top: 0; }
            25% { left: calc(100% - 5rem); top: 0; }
            50% { left: calc(100% - 5rem); top: calc(100% - 5rem); }
            75% { left: 0; top: calc(100% - 5rem); }
            100% { left: 0; top: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default UseLayoutEffectDemo;