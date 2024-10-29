import React, { useId } from 'react';

// Custom form field component
const FormField = ({ 
  label, 
  type = 'text',
  required = false 
}: { 
  label: string;
  type?: string;
  required?: boolean;
}) => {
  const id = useId();
  const descriptionId = useId();

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        aria-describedby={descriptionId}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required={required}
      />
      <p id={descriptionId} className="mt-1 text-sm text-gray-500">
        Enter your {label.toLowerCase()}
      </p>
    </div>
  );
};

function UseIdDemo() {
  const formId = useId();
  const submitButtonId = useId();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">useId Demo</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Registration Form</h2>

        <form id={formId}>
          <FormField label="Username" required />
          <FormField label="Email" type="email" required />
          <FormField label="Password" type="password" required />
          <FormField label="Phone" type="tel" />

          <button
            id={submitButtonId}
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Register
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">How it works:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Each form field has a unique, stable ID</li>
            <li>IDs are consistent across server/client rendering</li>
            <li>Proper accessibility attributes are maintained</li>
            <li>No ID conflicts even with multiple instances</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseIdDemo;