"use client";

export default function Home() {
  return (
    <div className="p-8 flex flex-col items-center justify-center h-full text-center">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <i className="fas fa-columns text-3xl text-gray-400"></i>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Dashboard Content</h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
        The original dashboard content was loaded via an iframe. This is a placeholder for the actual dashboard components.
      </p>
    </div>
  );
}
