import React from 'react';

const MediaUploadSection: React.FC = () => (
  <div className="space-y-2 p-4 border rounded border-gray-200 bg-gray-50 shadow-sm">
    <p className="font-medium text-gray-700 mb-2">Media</p>
    <div className="flex space-x-2">
      <button className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded text-sm hover:bg-gray-100 disabled:opacity-50" disabled>
        Photo Upload
      </button>
      <button className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded text-sm hover:bg-gray-100 disabled:opacity-50" disabled>
        Logo Upload
      </button>
    </div>
    <p className="text-sm text-gray-400 italic mt-1">Upload functionality coming soon.</p>
  </div>
);

export default MediaUploadSection; 